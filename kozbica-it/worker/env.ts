/**
 * Bindings, variabelen en geheimen van de Worker.
 * Variabelen staan in wrangler.jsonc ("vars"); geheimen zet u met
 * `npx wrangler secret put <NAAM>` (lokaal: `.dev.vars`).
 */
export interface Env {
  /** Statische website (./out). */
  ASSETS: Fetcher;
  /** Rate limiter voor /api/contact (wrangler.jsonc > ratelimits). */
  CONTACT_RATE_LIMITER?: RateLimit;
  /** Cloudflare Email Service (wrangler.jsonc > send_email). */
  EMAIL?: SendEmail;

  // --- Variabelen ---
  EMAIL_PROVIDER?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_FROM_NAME?: string;
  TURNSTILE_ALLOWED_HOSTNAMES?: string;
  MSGRAPH_TENANT_ID?: string;
  MSGRAPH_CLIENT_ID?: string;

  // --- Geheimen ---
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  MSGRAPH_CLIENT_SECRET?: string;
}
