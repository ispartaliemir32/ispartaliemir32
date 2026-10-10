import type { Env } from "../env";
import { sendViaCloudflare } from "./cloudflare";
import { sendViaMicrosoftGraph } from "./msgraph";
import { sendViaResend } from "./resend";
import { EmailConfigError, type OutgoingEmail } from "./types";

export { EmailConfigError, EmailSendError, type OutgoingEmail } from "./types";

export const EMAIL_PROVIDERS = ["cloudflare", "resend", "msgraph"] as const;
export type EmailProvider = (typeof EMAIL_PROVIDERS)[number];

export function resolveProvider(env: Env): EmailProvider {
  const value = (env.EMAIL_PROVIDER ?? "cloudflare").trim().toLowerCase();
  if ((EMAIL_PROVIDERS as readonly string[]).includes(value)) return value as EmailProvider;
  throw new EmailConfigError(`Onbekende EMAIL_PROVIDER "${value}". Kies uit: ${EMAIL_PROVIDERS.join(", ")}.`);
}

export async function sendEmail(env: Env, email: OutgoingEmail): Promise<EmailProvider> {
  const provider = resolveProvider(env);
  switch (provider) {
    case "cloudflare":
      await sendViaCloudflare(env, email);
      break;
    case "resend":
      await sendViaResend(env, email);
      break;
    case "msgraph":
      await sendViaMicrosoftGraph(env, email);
      break;
  }
  return provider;
}
