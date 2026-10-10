import type { Env } from "../env";
import { EmailConfigError, EmailSendError, type OutgoingEmail } from "./types";

/**
 * Microsoft Graph `sendMail` met een app-registratie (client credentials).
 * Verstuurt vanuit een Microsoft 365-mailbox (bijv. een gedeelde mailbox
 * website@uwdomein.nl). Vereist applicatierechten Mail.Send; beperk de app
 * tot die ene mailbox met RBAC for Applications in Exchange Online (zie README).
 */

type CachedToken = { value: string; expiresAt: number };
let cachedToken: CachedToken | null = null;

/** Alleen voor tests. */
export function resetGraphTokenCache(): void {
  cachedToken = null;
}

async function getAccessToken(env: Env): Promise<string> {
  const { MSGRAPH_TENANT_ID: tenant, MSGRAPH_CLIENT_ID: clientId, MSGRAPH_CLIENT_SECRET: secret } = env;
  if (!tenant || !clientId || !secret) {
    throw new EmailConfigError("MSGRAPH_TENANT_ID, MSGRAPH_CLIENT_ID en/of geheim MSGRAPH_CLIENT_SECRET ontbreken.");
  }

  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) return cachedToken.value;

  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: secret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new EmailSendError(`Token-aanvraag bij Microsoft Entra ID mislukt (HTTP ${response.status})`, "msgraph", response.status);
  }

  const data = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new EmailSendError("Geen access token ontvangen van Microsoft Entra ID", "msgraph");

  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

export async function sendViaMicrosoftGraph(env: Env, email: OutgoingEmail): Promise<void> {
  const token = await getAccessToken(env);

  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(email.from)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: email.subject,
        body: { contentType: "HTML", content: email.html },
        toRecipients: [{ emailAddress: { address: email.to } }],
        replyTo: [{ emailAddress: { address: email.replyTo.email, name: email.replyTo.name } }],
      },
      saveToSentItems: false,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (response.status === 401) cachedToken = null;
  if (response.status !== 202 && !response.ok) {
    throw new EmailSendError(`Microsoft Graph sendMail mislukt (HTTP ${response.status})`, "msgraph", response.status);
  }
}
