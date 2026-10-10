/**
 * Centrale bedrijfs- en siteconfiguratie.
 *
 * Waarden tussen [BLOKHAKEN] zijn placeholders die nog door Kozbica IT
 * moeten worden ingevuld. Zolang een waarde een placeholder is, toont de
 * website die als platte tekst (zonder mailto:/tel:-link) en wordt de waarde
 * niet opgenomen in gestructureerde data voor zoekmachines.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "Kozbica IT",
  legalName: "Kozbica IT",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "nl_NL",
  language: "nl",
  tagline: "Professionele IT. Zonder zorgen.",
  description:
    "Kozbica IT is een onafhankelijke IT-dienstverlener uit Rotterdam voor het MKB: IT-beheer, Microsoft 365, cloudoplossingen en cybersecurity, met één vast aanspreekpunt.",
  location: {
    city: "Rotterdam",
    region: "Zuid-Holland",
    countryCode: "NL",
    country: "Nederland",
  },
  serviceArea: "Rotterdam, Zuid-Holland en op afstand in heel Nederland",
  contact: {
    email: "[EMAIL]",
    phone: "[PHONE]",
    kvk: "[KVK]",
    btw: "[BTW]",
    /** Vestigingsadres (nodig voor de privacyverklaring). */
    address: "[ADRES]",
  },
  /**
   * Logo-instelling. Zolang het officiële logobestand niet in het project staat,
   * wordt een tijdelijk logo (schild + woordmerk) als inline SVG getoond.
   * Officieel logo gebruiken: zet de bestanden in /public/brand/ en wijzig naar:
   *   { type: "image", src: "/brand/kozbica-it-logo.svg", srcOnDark: "/brand/kozbica-it-logo-wit.svg", width: 180, height: 44 }
   */
  logo: { type: "placeholder" } as LogoConfig,
  /**
   * Juridische status. Zet op `false` zodra een jurist de tekst heeft goedgekeurd:
   * dan verdwijnen de concept-banner en de markeringen "Juridisch controleren".
   */
  legal: {
    privacyIsDraft: true,
    termsIsDraft: true,
    lastUpdated: "10 oktober 2026",
  },
} as const;

export type LogoConfig =
  | { type: "placeholder" }
  | { type: "image"; src: string; srcOnDark: string; width: number; height: number };

/** True als de waarde nog een [PLACEHOLDER] is. */
export function isPlaceholder(value: string): boolean {
  return /^\[[^\]]+\]$/.test(value.trim());
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}
