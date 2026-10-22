/**
 * Centrale bedrijfsgegevens van Kozbica IT. Pas het KvK-nummer hier aan zodra
 * het bekend is; alle pagina's, de footer en de structured data volgen mee.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kozbica.nl";

const EMAIL = "kozbica.it@gmail.com";
const PHONE_DISPLAY = "06 43 65 00 90";

export const site = {
  name: "Kozbica IT",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "nl_NL",
  slogan: "Veilige IT, zonder gedoe.",
  description:
    "Kozbica IT biedt persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving: Microsoft 365, Entra ID en Intune, applicatiebeheer, IT-advies en AI-ondersteuning.",
  city: "Rotterdam",
  serviceArea: "Rotterdam en omgeving",
  contact: {
    email: EMAIL,
    phone: PHONE_DISPLAY,
    /** Internationaal formaat voor tel:-links. */
    phoneHref: "+31643650090",
    /** Vervang door het echte nummer zodra bekend. */
    kvk: "[KVK-NUMMER]",
  },
  /** Zodra het KvK-nummer is ingevuld verdwijnt de placeholder vanzelf. */
  lastUpdated: "oktober 2026",
} as const;

export function isPlaceholder(value: string): boolean {
  return /^\[[^\]]+\]$/.test(value.trim());
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** mailto-link met een vooraf ingevuld onderwerp. */
export function mailHref(subject?: string): string {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export const phoneHref = `tel:${site.contact.phoneHref}`;
