import type { Env } from "../env";
import { EmailConfigError, EmailSendError, type OutgoingEmail } from "./types";

/**
 * Cloudflare Email Service via de `send_email`-binding.
 * Gratis voor verzending naar geverifieerde bestemmingsadressen in uw account.
 * Het afzenderadres moet op een domein staan dat u in Email Service/Email Routing heeft ingesteld.
 */
export async function sendViaCloudflare(env: Env, email: OutgoingEmail): Promise<void> {
  if (!env.EMAIL) {
    throw new EmailConfigError("send_email-binding 'EMAIL' ontbreekt in wrangler.jsonc.");
  }
  try {
    await env.EMAIL.send({
      to: email.to,
      from: { email: email.from, name: email.fromName },
      replyTo: { email: email.replyTo.email, name: email.replyTo.name },
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    throw new EmailSendError(`Cloudflare Email Service: ${code ?? (error instanceof Error ? error.message : "onbekende fout")}`, "cloudflare");
  }
}
