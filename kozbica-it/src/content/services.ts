import { Headset, Lightbulb, AppWindow, type LucideIcon } from "lucide-react";

export type Service = {
  slug: "it-ondersteuning" | "applicatiebeheer" | "it-advies";
  title: string;
  icon: LucideIcon;
  summary: string;
  intro: string;
  /** Wat ik concreet doe. */
  includes: string[];
  /** Wat het je oplevert, in gewone taal. */
  benefits: string[];
  idealFor: string;
  /** Tekst van de knop, die een e-mail opent. */
  cta: string;
  rate: string;
};

export const services: Service[] = [
  {
    slug: "it-ondersteuning",
    title: "IT-ondersteuning",
    icon: Headset,
    summary:
      "Gebruikers, licenties en werkplekken in orde in Microsoft 365, Entra ID en Intune, en storingen opgelost.",
    intro:
      "Ik zorg dat jij en je collega's gewoon kunnen werken. Heb je een nieuwe medewerker, een laptop die ingericht moet worden of een storing? Dan los ik dat op, meestal op afstand en altijd met uitleg die je begrijpt.",
    includes: [
      "Gebruikers- en licentiebeheer in Microsoft 365, Entra ID en Intune",
      "Werkplekbeheer: laptops inrichten en up-to-date houden",
      "Beveiliging op orde brengen, zoals MFA (meervoudige verificatie)",
      "Storingen oplossen op werkplek- en gebruikersniveau",
    ],
    benefits: [
      "Nieuwe en vertrekkende medewerkers snel en correct geregeld",
      "Geen betaalde licenties die niemand gebruikt",
      "Een veiliger werkplek voor iedereen",
      "Eén vast aanspreekpunt in plaats van een anoniem loket",
    ],
    idealFor: "Kleine bedrijven zonder eigen IT-afdeling.",
    cta: "Stuur een vraag over IT-ondersteuning",
    rate: "€ 60 per uur",
  },
  {
    slug: "applicatiebeheer",
    title: "Applicatiebeheer",
    icon: AppWindow,
    summary:
      "Gebruikers, rechten en instellingen van je bedrijfsapplicaties geregeld, met uitleg voor je team.",
    intro:
      "Gebruik je een bedrijfsapplicatie waar niemand echt de baas over is? Ik neem het beheer op me: ik regel wie waar toegang toe heeft, zorg dat alles goed is ingesteld en help je collega's als ze er niet uitkomen.",
    includes: [
      "Gebruikers- en autorisatiebeheer",
      "Inrichting en instellingen van de applicatie",
      "Functionele ondersteuning en instructie van gebruikers",
      "Meldingenbeheer richting de leverancier",
      "Begeleiding en functioneel testen bij nieuwe releases",
    ],
    benefits: [
      "Iedereen heeft de juiste toegang, niet meer en niet minder",
      "Collega's weten hoe ze de applicatie gebruiken",
      "Problemen worden bij de leverancier gemeld en opgevolgd",
      "Een nieuwe versie komt niet als verrassing",
    ],
    idealFor: "Bedrijven die een applicatie gebruiken en daar functioneel beheer voor zoeken.",
    cta: "Stuur een vraag over applicatiebeheer",
    rate: "€ 60 per uur",
  },
  {
    slug: "it-advies",
    title: "IT-advies",
    icon: Lightbulb,
    summary:
      "Vrijblijvend advies over licenties, beveiliging en werkplekinrichting. Jij beslist over de aanschaf.",
    intro:
      "Twijfel je welke licenties je echt nodig hebt, of of je beveiliging goed genoeg is? Ik denk onafhankelijk met je mee en leg het uit in gewone taal. Daarna beslis jij zelf wat je doet en bij wie je het afneemt.",
    includes: [
      "Advies over licenties in Microsoft 365",
      "Advies over beveiliging, zoals MFA en toegang",
      "Advies over de inrichting van werkplekken",
    ],
    benefits: [
      "Eerlijk, vrijblijvend en onafhankelijk advies",
      "Jij beslist zelf over aanschaf",
      "Geen verkooppraatjes, wel een duidelijke aanbeveling",
    ],
    idealFor: "Ondernemers die een keuze moeten maken en een second opinion willen.",
    cta: "Stuur een vraag over IT-advies",
    rate: "€ 75 per uur",
  },
];
