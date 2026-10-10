/**
 * Gedeelde validatie voor het contactformulier.
 *
 * Dit bestand wordt gebruikt door:
 *  - de browser (directe feedback in het formulier), en
 *  - de Cloudflare Worker (de daadwerkelijke, leidende controle).
 * Het mag daarom geen browser- of Node-specifieke API's gebruiken.
 */
import { EMPLOYEE_OPTIONS, SERVICE_OPTIONS } from "../content/service-options";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  company: { min: 2, max: 120 },
  email: { max: 254 },
  phone: { max: 30 },
  message: { min: 10, max: 5000 },
  maxLinksInMessage: 3,
  turnstileToken: { max: 2048 },
  /** Maximale grootte van de JSON-body in bytes. */
  maxBodyBytes: 20_000,
  /** Minimale tijd (ms) tussen laden en versturen van het formulier. */
  minFillTimeMs: 2_500,
} as const;

/** De velden die een bezoeker invult. */
export type ContactFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
  service: string;
  message: string;
  consent: boolean;
};

export type ContactFieldName = keyof ContactFields;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

/** Het volledige verzoek dat de browser naar /api/contact stuurt. */
export type ContactRequestBody = ContactFields & {
  turnstileToken: string;
  /** Honeypot: moet leeg blijven. */
  kz_extra: string;
  /** Tijdstip (ms sinds epoch) waarop het formulier is geladen. */
  startedAt: number;
};

export type ContactSubmission = Omit<ContactFields, "consent"> & { consent: true };

export type ValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:".]+(?:\.[^\s@<>()[\]\\,;:".]+)*\.(?:[a-z]{2,}|xn--[a-z0-9-]+)$/i;
const PHONE_PATTERN = /^\+?[0-9\s().-]{6,30}$/;
const LINK_PATTERN = /(https?:\/\/|www\.)/gi;
// Stuurtekens behalve tab (\u0009) en regeleinden (\u000A, \u000D).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F​-‏‪-‮⁦-⁩]/g;

/** Eén regel tekst: stuurtekens en regeleinden weg, witruimte samenvoegen. */
export function cleanSingleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.normalize("NFC").replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

/** Meerregelige tekst: stuurtekens weg, regeleinden normaliseren, max. 2 lege regels. */
export function cleanMultiLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isOneOf(value: string, options: readonly { value: string }[]): boolean {
  return options.some((o) => o.value === value);
}

export function validateContact(input: unknown): ValidationResult {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const errors: ContactFieldErrors = {};

  const name = cleanSingleLine(raw.name);
  const company = cleanSingleLine(raw.company);
  const email = cleanSingleLine(raw.email).toLowerCase();
  const phone = cleanSingleLine(raw.phone);
  const employees = cleanSingleLine(raw.employees);
  const service = cleanSingleLine(raw.service);
  const message = cleanMultiLine(raw.message);
  const consent = raw.consent === true;

  const L = CONTACT_LIMITS;

  if (name.length < L.name.min) errors.name = "Vul uw volledige naam in.";
  else if (name.length > L.name.max) errors.name = `Uw naam mag maximaal ${L.name.max} tekens bevatten.`;

  if (company.length < L.company.min) errors.company = "Vul de naam van uw bedrijf in.";
  else if (company.length > L.company.max)
    errors.company = `De bedrijfsnaam mag maximaal ${L.company.max} tekens bevatten.`;

  if (!email) errors.email = "Vul uw zakelijke e-mailadres in.";
  else if (email.length > L.email.max || !EMAIL_PATTERN.test(email))
    errors.email = "Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.";

  if (phone && (phone.length > L.phone.max || !PHONE_PATTERN.test(phone) || phone.replace(/\D/g, "").length < 6))
    errors.phone = "Vul een geldig telefoonnummer in, of laat dit veld leeg.";

  if (employees && !isOneOf(employees, EMPLOYEE_OPTIONS)) errors.employees = "Kies een geldige optie.";

  if (!service) errors.service = "Kies waar u interesse in heeft.";
  else if (!isOneOf(service, SERVICE_OPTIONS)) errors.service = "Kies een geldige dienst uit de lijst.";

  if (message.length < L.message.min)
    errors.message = `Beschrijf uw vraag in minimaal ${L.message.min} tekens.`;
  else if (message.length > L.message.max)
    errors.message = `Uw bericht mag maximaal ${L.message.max} tekens bevatten.`;
  else if ((message.match(LINK_PATTERN)?.length ?? 0) > L.maxLinksInMessage)
    errors.message = `Uw bericht bevat te veel links (maximaal ${L.maxLinksInMessage}).`;

  if (!consent) errors.consent = "Geef toestemming om uw gegevens te verwerken voor het beantwoorden van uw aanvraag.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, company, email, phone, employees, service, message, consent: true },
  };
}
