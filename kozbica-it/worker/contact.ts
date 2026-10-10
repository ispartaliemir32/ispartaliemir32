import { CONTACT_LIMITS, validateContact } from "../src/lib/contact";
import { serviceLabel } from "../src/content/service-options";
import { EmailConfigError, sendEmail } from "./email";
import { buildContactEmail } from "./email/template";
import { headerSafe } from "./email/types";
import type { Env } from "./env";
import { apiError, json, log } from "./http";
import { parseHostnameList, verifyTurnstile } from "./turnstile";

const GENERIC_SEND_ERROR =
  "Uw bericht kon op dit moment niet worden verzonden. Probeer het later opnieuw of neem rechtstreeks contact met ons op.";

/**
 * POST /api/contact
 *
 * Volgorde van controles (goedkoop → duur):
 *  1. methode, herkomst (Origin) en Content-Type
 *  2. rate limiting per IP-adres
 *  3. grootte en geldigheid van de JSON
 *  4. honeypot en minimale invultijd (spam)
 *  5. veldvalidatie (zelfde regels als in de browser)
 *  6. Cloudflare Turnstile (server-side)
 *  7. e-mail versturen
 * Er worden geen formuliergegevens opgeslagen; alleen e-mail naar Kozbica IT.
 */
export async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return apiError(405, "method_not_allowed", "Alleen POST is toegestaan.", { headers: { Allow: "POST" } });
  }

  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (!origin || origin !== url.origin) {
    log("warn", "contact_rejected_origin");
    return apiError(403, "forbidden_origin", "Dit verzoek is niet toegestaan.");
  }

  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return apiError(415, "unsupported_media_type", "Verstuur het formulier als JSON.");
  }

  const declaredLength = Number(request.headers.get("Content-Length") ?? "0");
  if (declaredLength > CONTACT_LIMITS.maxBodyBytes) {
    return apiError(413, "payload_too_large", "Uw bericht is te groot.");
  }

  const ip = request.headers.get("CF-Connecting-IP");
  if (env.CONTACT_RATE_LIMITER) {
    const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: `contact:${ip ?? "onbekend"}` });
    if (!success) {
      log("warn", "contact_rate_limited");
      return apiError(429, "rate_limited", "U heeft te veel berichten kort na elkaar verstuurd. Probeer het over een minuut opnieuw.", {
        headers: { "Retry-After": "60" },
      });
    }
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > CONTACT_LIMITS.maxBodyBytes) {
    return apiError(413, "payload_too_large", "Uw bericht is te groot.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("geen object");
    body = parsed as Record<string, unknown>;
  } catch {
    return apiError(400, "invalid_json", "Het formulier kon niet worden gelezen. Vernieuw de pagina en probeer het opnieuw.");
  }

  // Honeypot: onzichtbaar veld dat mensen niet invullen. Bots krijgen een
  // "geslaagd"-antwoord zodat ze niet leren dat ze zijn tegengehouden.
  if (typeof body.kz_extra === "string" && body.kz_extra.trim() !== "") {
    log("info", "contact_honeypot_triggered");
    return json({ ok: true, message: "Bedankt voor uw bericht." });
  }

  const startedAt = typeof body.startedAt === "number" ? body.startedAt : NaN;
  if (Number.isFinite(startedAt) && Date.now() - startedAt < CONTACT_LIMITS.minFillTimeMs) {
    return apiError(400, "too_fast", "Het formulier werd erg snel verstuurd. Controleer uw gegevens en probeer het opnieuw.");
  }

  const validation = validateContact(body);
  if (!validation.ok) {
    return apiError(422, "validation_failed", "Controleer de gemarkeerde velden.", { errors: validation.errors });
  }

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token || token.length > CONTACT_LIMITS.turnstileToken.max) {
    return apiError(400, "turnstile_failed", "De beveiligingscontrole is niet voltooid. Wacht tot de controle klaar is en probeer het opnieuw.");
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    log("error", "contact_not_configured", {
      missing: [
        !env.TURNSTILE_SECRET_KEY && "TURNSTILE_SECRET_KEY",
        !env.CONTACT_TO_EMAIL && "CONTACT_TO_EMAIL",
        !env.CONTACT_FROM_EMAIL && "CONTACT_FROM_EMAIL",
      ].filter(Boolean),
    });
    return apiError(503, "not_configured", GENERIC_SEND_ERROR);
  }

  const verification = await verifyTurnstile({
    token,
    secret: env.TURNSTILE_SECRET_KEY,
    remoteIp: ip,
    allowedHostnames: parseHostnameList(env.TURNSTILE_ALLOWED_HOSTNAMES),
  });
  if (!verification.ok) {
    log(verification.reason === "unavailable" ? "error" : "warn", "contact_turnstile_failed", {
      reason: verification.reason,
      errorCodes: verification.errorCodes,
    });
    if (verification.reason === "unavailable") {
      return apiError(503, "verification_unavailable", "De beveiligingscontrole is tijdelijk niet beschikbaar. Probeer het over enkele minuten opnieuw.");
    }
    return apiError(400, "turnstile_failed", "De beveiligingscontrole is mislukt of verlopen. Voer de controle opnieuw uit en verstuur het formulier nogmaals.");
  }

  const { data } = validation;
  const content = buildContactEmail(data, { receivedAt: new Date(), siteHost: url.host });

  try {
    const provider = await sendEmail(env, {
      to: env.CONTACT_TO_EMAIL,
      from: env.CONTACT_FROM_EMAIL,
      fromName: env.CONTACT_FROM_NAME || "Kozbica IT website",
      replyTo: { email: data.email, name: headerSafe(data.name, 100) },
      ...content,
    });
    log("info", "contact_sent", { provider, service: serviceLabel(data.service) });
  } catch (error) {
    const isConfig = error instanceof EmailConfigError;
    log("error", isConfig ? "contact_email_config_error" : "contact_email_send_failed", {
      error: error instanceof Error ? `${error.name}: ${error.message}` : "onbekend",
    });
    return apiError(isConfig ? 503 : 502, isConfig ? "not_configured" : "send_failed", GENERIC_SEND_ERROR);
  }

  return json({ ok: true, message: "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op." });
}
