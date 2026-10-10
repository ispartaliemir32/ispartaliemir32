import type { Env } from "../env";
import { EmailConfigError, EmailSendError, headerSafe, type OutgoingEmail } from "./types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Resend (https://resend.com) via de HTTP API. Vereist het geheim RESEND_API_KEY. */
export async function sendViaResend(env: Env, email: OutgoingEmail): Promise<void> {
  if (!env.RESEND_API_KEY) throw new EmailConfigError("Geheim RESEND_API_KEY ontbreekt.");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${headerSafe(email.fromName, 80)} <${email.from}>`,
      to: [email.to],
      reply_to: email.replyTo.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new EmailSendError(`Resend antwoordde met HTTP ${response.status}`, "resend", response.status);
  }
}
