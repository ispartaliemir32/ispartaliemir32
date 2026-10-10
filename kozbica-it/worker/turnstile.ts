const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileOutcome =
  | { ok: true; hostname?: string }
  | { ok: false; reason: "invalid" | "hostname_mismatch"; errorCodes: string[] }
  | { ok: false; reason: "unavailable"; errorCodes: string[] };

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
  challenge_ts?: string;
};

/**
 * Valideert een Turnstile-token server-side via de Siteverify API.
 * Tokens zijn maximaal 300 seconden geldig en kunnen maar één keer worden gebruikt.
 */
export async function verifyTurnstile(options: {
  token: string;
  secret: string;
  remoteIp?: string | null;
  allowedHostnames?: string[];
  timeoutMs?: number;
}): Promise<TurnstileOutcome> {
  const body = new FormData();
  body.append("secret", options.secret);
  body.append("response", options.token);
  if (options.remoteIp) body.append("remoteip", options.remoteIp);
  body.append("idempotency_key", crypto.randomUUID());

  let result: SiteverifyResponse;
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(options.timeoutMs ?? 8_000),
    });
    if (!response.ok) {
      return { ok: false, reason: "unavailable", errorCodes: [`http_${response.status}`] };
    }
    result = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    return { ok: false, reason: "unavailable", errorCodes: [error instanceof Error ? error.name : "fetch_error"] };
  }

  if (!result.success) {
    const errorCodes = result["error-codes"] ?? [];
    // "internal-error" ligt aan Cloudflare, niet aan de bezoeker.
    if (errorCodes.includes("internal-error")) return { ok: false, reason: "unavailable", errorCodes };
    return { ok: false, reason: "invalid", errorCodes };
  }

  const allowed = options.allowedHostnames ?? [];
  if (allowed.length > 0 && (!result.hostname || !allowed.includes(result.hostname.toLowerCase()))) {
    return { ok: false, reason: "hostname_mismatch", errorCodes: ["hostname-mismatch"] };
  }

  return { ok: true, hostname: result.hostname };
}

export function parseHostnameList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
}
