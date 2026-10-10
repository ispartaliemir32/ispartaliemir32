import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../worker/index";
import type { Env } from "../worker/env";
import { resetGraphTokenCache } from "../worker/email/msgraph";
import { escapeHtml } from "../worker/email/template";

const ORIGIN = "https://www.kozbica-it.example";
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type FetchHandler = (url: string, init?: RequestInit) => Response | Promise<Response>;

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jan de Vries",
    company: "De Vries Advies",
    email: "jan@devriesadvies.nl",
    phone: "",
    employees: "5-10",
    service: "it-beheer",
    message: "Wij willen ons IT-beheer uitbesteden. Kunnen we kennismaken?",
    consent: true,
    turnstileToken: "XXXX.DUMMY.TOKEN.XXXX",
    kz_extra: "",
    startedAt: Date.now() - 60_000,
    ...overrides,
  };
}

function contactRequest(body: unknown, init: { origin?: string | null; contentType?: string; method?: string } = {}) {
  const headers = new Headers({ "CF-Connecting-IP": "203.0.113.7" });
  if (init.origin !== null) headers.set("Origin", init.origin ?? ORIGIN);
  headers.set("Content-Type", init.contentType ?? "application/json");
  return new Request(`${ORIGIN}/api/contact`, {
    method: init.method ?? "POST",
    headers,
    body: init.method === "GET" ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}

function makeEnv(overrides: Partial<Env> = {}) {
  const send = vi.fn(async () => ({ messageId: "test-id" }));
  const limit = vi.fn(async () => ({ success: true }));
  const assetsFetch = vi.fn(async () => new Response("asset"));
  const env: Env = {
    ASSETS: { fetch: assetsFetch } as unknown as Fetcher,
    CONTACT_RATE_LIMITER: { limit } as unknown as RateLimit,
    EMAIL: { send } as unknown as SendEmail,
    EMAIL_PROVIDER: "cloudflare",
    CONTACT_TO_EMAIL: "info@kozbica-it.example",
    CONTACT_FROM_EMAIL: "website@kozbica-it.example",
    CONTACT_FROM_NAME: "Kozbica IT website",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    ...overrides,
  };
  return { env, send, limit, assetsFetch };
}

let fetchMock: ReturnType<typeof vi.fn>;
function mockFetch(handler: FetchHandler) {
  fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    return handler(url, init);
  });
  vi.stubGlobal("fetch", fetchMock);
}

const turnstileOk: FetchHandler = (url) => {
  if (url === SITEVERIFY) return Response.json({ success: true, hostname: "www.kozbica-it.example", "error-codes": [] });
  throw new Error(`Onverwachte fetch: ${url}`);
};

async function call(request: Request, env: Env) {
  const response = await worker.fetch(request as never, env);
  const body = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { response, body };
}

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  resetGraphTokenCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("routing", () => {
  it("geeft 404 JSON voor onbekende API-routes", async () => {
    const { env } = makeEnv();
    const { response, body } = await call(new Request(`${ORIGIN}/api/onbekend`), env);
    expect(response.status).toBe(404);
    expect(body?.code).toBe("not_found");
  });

  it("stuurt niet-API-verzoeken door naar de statische assets", async () => {
    const { env, assetsFetch } = makeEnv();
    const response = await worker.fetch(new Request(`${ORIGIN}/diensten`) as never, env);
    expect(await response.text()).toBe("asset");
    expect(assetsFetch).toHaveBeenCalledOnce();
  });
});

describe("POST /api/contact – voorcontroles", () => {
  it("weigert andere methodes met 405 en Allow-header", async () => {
    const { env } = makeEnv();
    const { response } = await call(contactRequest(null, { method: "GET" }), env);
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });

  it("weigert verzoeken van een andere origin (CSRF)", async () => {
    const { env, send } = makeEnv();
    const { response } = await call(contactRequest(validBody(), { origin: "https://evil.example" }), env);
    expect(response.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("weigert verzoeken zonder Origin-header", async () => {
    const { env } = makeEnv();
    const { response } = await call(contactRequest(validBody(), { origin: null }), env);
    expect(response.status).toBe(403);
  });

  it("vereist JSON", async () => {
    const { env } = makeEnv();
    const { response } = await call(contactRequest("name=x", { contentType: "application/x-www-form-urlencoded" }), env);
    expect(response.status).toBe(415);
  });

  it("weigert te grote verzoeken", async () => {
    const { env } = makeEnv();
    const { response } = await call(contactRequest(validBody({ message: "x".repeat(25_000) })), env);
    expect(response.status).toBe(413);
  });

  it("geeft 429 met Retry-After als de rate limit is bereikt", async () => {
    const { env, limit, send } = makeEnv();
    limit.mockResolvedValueOnce({ success: false });
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(body?.code).toBe("rate_limited");
    expect(limit).toHaveBeenCalledWith({ key: "contact:203.0.113.7" });
    expect(send).not.toHaveBeenCalled();
  });

  it("geeft 400 bij ongeldige JSON", async () => {
    const { env } = makeEnv();
    const { response, body } = await call(contactRequest("{kapot"), env);
    expect(response.status).toBe(400);
    expect(body?.code).toBe("invalid_json");
  });
});

describe("POST /api/contact – spam en validatie", () => {
  it("doet alsof het lukt als de honeypot is ingevuld, maar verstuurt niets", async () => {
    mockFetch(turnstileOk);
    const { env, send } = makeEnv();
    const { response, body } = await call(contactRequest(validBody({ kz_extra: "http://spam.example" })), env);
    expect(response.status).toBe(200);
    expect(body?.ok).toBe(true);
    expect(send).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("weigert formulieren die onrealistisch snel zijn verstuurd", async () => {
    const { env } = makeEnv();
    const { response, body } = await call(contactRequest(validBody({ startedAt: Date.now() - 500 })), env);
    expect(response.status).toBe(400);
    expect(body?.code).toBe("too_fast");
  });

  it("geeft 422 met veldfouten bij ongeldige invoer, zonder Turnstile te gebruiken", async () => {
    mockFetch(turnstileOk);
    const { env } = makeEnv();
    const { response, body } = await call(contactRequest(validBody({ email: "geen-email" })), env);
    expect(response.status).toBe(422);
    expect((body?.errors as Record<string, string>).email).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("vereist een Turnstile-token", async () => {
    const { env } = makeEnv();
    const { response, body } = await call(contactRequest(validBody({ turnstileToken: "" })), env);
    expect(response.status).toBe(400);
    expect(body?.code).toBe("turnstile_failed");
  });
});

describe("POST /api/contact – Turnstile", () => {
  it("weigert een ongeldig token", async () => {
    mockFetch(() => Response.json({ success: false, "error-codes": ["invalid-input-response"] }));
    const { env, send } = makeEnv();
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(400);
    expect(body?.code).toBe("turnstile_failed");
    expect(send).not.toHaveBeenCalled();
  });

  it("geeft 503 als Siteverify niet bereikbaar is", async () => {
    mockFetch(() => {
      throw new TypeError("network down");
    });
    const { env } = makeEnv();
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(503);
    expect(body?.code).toBe("verification_unavailable");
  });

  it("controleert de hostname als TURNSTILE_ALLOWED_HOSTNAMES is ingesteld", async () => {
    mockFetch(() => Response.json({ success: true, hostname: "andere-site.example" }));
    const { env, send } = makeEnv({ TURNSTILE_ALLOWED_HOSTNAMES: "kozbica-it.example, www.kozbica-it.example" });
    const { response } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("stuurt secret, token en IP-adres mee naar Siteverify", async () => {
    mockFetch(turnstileOk);
    const { env } = makeEnv();
    await call(contactRequest(validBody()), env);
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const form = init.body as FormData;
    expect(form.get("secret")).toBe(env.TURNSTILE_SECRET_KEY);
    expect(form.get("response")).toBe("XXXX.DUMMY.TOKEN.XXXX");
    expect(form.get("remoteip")).toBe("203.0.113.7");
    expect(form.get("idempotency_key")).toMatch(/^[0-9a-f-]{36}$/);
  });
});

describe("POST /api/contact – e-mail versturen", () => {
  it("verstuurt via Cloudflare Email Service met reply-to naar de afzender", async () => {
    mockFetch(turnstileOk);
    const { env, send } = makeEnv();
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(200);
    expect(body?.ok).toBe(true);
    expect(send).toHaveBeenCalledOnce();
    const message = (send.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(message.to).toBe("info@kozbica-it.example");
    expect(message.from).toEqual({ email: "website@kozbica-it.example", name: "Kozbica IT website" });
    expect(message.replyTo).toEqual({ email: "jan@devriesadvies.nl", name: "Jan de Vries" });
    expect(message.subject).toContain("De Vries Advies");
    expect(String(message.text)).toContain("Wij willen ons IT-beheer uitbesteden");
  });

  it("zet beveiligingsheaders op API-responses", async () => {
    mockFetch(turnstileOk);
    const { env } = makeEnv();
    const { response } = await call(contactRequest(validBody()), env);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("Content-Security-Policy")).toContain("default-src 'none'");
  });

  it("escapet HTML in de e-mail (geen HTML-injectie)", async () => {
    mockFetch(turnstileOk);
    const { env, send } = makeEnv();
    await call(contactRequest(validBody({ message: '<img src=x onerror="alert(1)"> graag contact' })), env);
    const message = (send.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(String(message.html)).not.toContain("<img src=x");
    expect(String(message.html)).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("geeft 503 als de e-mailconfiguratie ontbreekt", async () => {
    mockFetch(turnstileOk);
    const { env } = makeEnv({ CONTACT_TO_EMAIL: "" });
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(503);
    expect(body?.code).toBe("not_configured");
  });

  it("geeft 502 als de provider faalt", async () => {
    mockFetch(turnstileOk);
    const { env, send } = makeEnv();
    send.mockRejectedValueOnce(Object.assign(new Error("boom"), { code: "E_SENDER_NOT_VERIFIED" }));
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(502);
    expect(body?.code).toBe("send_failed");
  });

  it("geeft 503 bij een onbekende EMAIL_PROVIDER", async () => {
    mockFetch(turnstileOk);
    const { env } = makeEnv({ EMAIL_PROVIDER: "postduif" });
    const { response, body } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(503);
    expect(body?.code).toBe("not_configured");
  });

  it("verstuurt via Resend met de API-sleutel uit de geheimen", async () => {
    const calls: { url: string; init?: RequestInit }[] = [];
    mockFetch((url, init) => {
      calls.push({ url, init });
      if (url === SITEVERIFY) return turnstileOk(url, init);
      if (url === "https://api.resend.com/emails") return Response.json({ id: "re_1" });
      throw new Error(url);
    });
    const { env, send } = makeEnv({ EMAIL_PROVIDER: "resend", RESEND_API_KEY: "re_test_123" });
    const { response } = await call(contactRequest(validBody()), env);
    expect(response.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
    const resend = calls.find((c) => c.url.includes("resend"));
    expect(new Headers(resend?.init?.headers).get("Authorization")).toBe("Bearer re_test_123");
    const payload = JSON.parse(String(resend?.init?.body));
    expect(payload).toMatchObject({
      from: "Kozbica IT website <website@kozbica-it.example>",
      to: ["info@kozbica-it.example"],
      reply_to: "jan@devriesadvies.nl",
    });
  });

  it("verstuurt via Microsoft Graph met client credentials en hergebruikt het token", async () => {
    const urls: string[] = [];
    mockFetch((url, init) => {
      urls.push(url);
      if (url === SITEVERIFY) return turnstileOk(url, init);
      if (url.startsWith("https://login.microsoftonline.com/")) {
        expect(String(init?.body)).toContain("grant_type=client_credentials");
        return Response.json({ access_token: "graph-token", expires_in: 3600 });
      }
      if (url.startsWith("https://graph.microsoft.com/")) {
        expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer graph-token");
        return new Response(null, { status: 202 });
      }
      throw new Error(url);
    });
    const { env } = makeEnv({
      EMAIL_PROVIDER: "msgraph",
      MSGRAPH_TENANT_ID: "tenant-id",
      MSGRAPH_CLIENT_ID: "client-id",
      MSGRAPH_CLIENT_SECRET: "secret",
    });
    expect((await call(contactRequest(validBody()), env)).response.status).toBe(200);
    expect((await call(contactRequest(validBody()), env)).response.status).toBe(200);
    expect(urls.filter((u) => u.includes("login.microsoftonline.com"))).toHaveLength(1);
    expect(urls).toContain("https://graph.microsoft.com/v1.0/users/website%40kozbica-it.example/sendMail");
  });
});

describe("escapeHtml", () => {
  it("escapet alle speciale tekens", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});
