export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/it-beheer", label: "IT-beheer" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export const legalNav: NavItem[] = [
  { href: "/privacyverklaring", label: "Privacyverklaring" },
  { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
];

export const primaryCta = {
  href: "/contact",
  label: "Plan een gratis kennismaking",
  shortLabel: "Gratis kennismaking",
} as const;
