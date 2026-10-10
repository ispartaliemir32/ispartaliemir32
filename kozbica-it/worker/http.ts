/**
 * Responses van de Worker. Let op: de `_headers`-regels van Workers Static
 * Assets gelden NIET voor responses die de Worker zelf maakt, dus de
 * beveiligingsheaders worden hier expliciet toegevoegd.
 */
export const API_SECURITY_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex",
};

export type ApiErrorCode =
  | "method_not_allowed"
  | "forbidden_origin"
  | "unsupported_media_type"
  | "payload_too_large"
  | "invalid_json"
  | "rate_limited"
  | "validation_failed"
  | "too_fast"
  | "turnstile_failed"
  | "verification_unavailable"
  | "not_configured"
  | "send_failed"
  | "not_found";

export type ApiResponseBody =
  | { ok: true; message: string }
  | { ok: false; code: ApiErrorCode; message: string; errors?: Record<string, string> };

export function json(body: ApiResponseBody, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...API_SECURITY_HEADERS,
      ...extraHeaders,
    },
  });
}

export function apiError(
  status: number,
  code: ApiErrorCode,
  message: string,
  extra: { errors?: Record<string, string>; headers?: Record<string, string> } = {},
): Response {
  return json({ ok: false, code, message, ...(extra.errors ? { errors: extra.errors } : {}) }, status, extra.headers);
}

/** Gestructureerde logregel zonder persoonsgegevens (zichtbaar in Workers Logs). */
export function log(level: "info" | "warn" | "error", event: string, details: Record<string, unknown> = {}): void {
  const line = JSON.stringify({ level, event, ...details });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
