export type OutgoingEmail = {
  to: string;
  from: string;
  fromName: string;
  replyTo: { email: string; name: string };
  subject: string;
  text: string;
  html: string;
};

/** Configuratiefout (ontbrekende variabele/secret): niet tijdelijk, beheerder moet ingrijpen. */
export class EmailConfigError extends Error {
  override name = "EmailConfigError";
}

/** Verzendfout bij de provider (mogelijk tijdelijk). */
export class EmailSendError extends Error {
  override name = "EmailSendError";
  constructor(
    message: string,
    readonly provider: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

/** Verwijdert tekens die in een e-mailheader (onderwerp, naam) niet thuishoren. */
export function headerSafe(value: string, maxLength = 200): string {
  return value
    .replace(/[\r\n\u0000-\u001F\u007F]+/g, " ")
    .replace(/[<>"]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}
