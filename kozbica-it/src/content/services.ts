import { Headset, Lightbulb, AppWindow, Sparkles, type LucideIcon } from "lucide-react";

export type Service = {
  slug: "it-ondersteuning" | "applicatiebeheer" | "it-advies" | "ai-ondersteuning";
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
  {
    slug: "ai-ondersteuning",
    title: "AI-ondersteuning",
    icon: Sparkles,
    summary:
      "Advies over AI-tools die bij je bedrijf passen, en het inrichten en beheren ervan binnen Microsoft 365.",
    intro:
      "AI kan je dagelijks werk sneller maken, maar welke tool past bij jou, en hoe gebruik je die veilig? Ik adviseer onafhankelijk en help je daarna om AI-tools goed in te richten, zodat de juiste mensen er toegang toe hebben.",
    includes: [
      "Vrijblijvend advies over AI-tools, zoals Microsoft Copilot, en wat ze voor je bedrijf kunnen betekenen",
      "Advies over veilig gebruik: welke gegevens wel en niet in AI-tools thuishoren",
      "Inrichten van AI-tools: licenties, gebruikers en rechten in Microsoft 365",
      "Beheer van die AI-tools, inclusief storingen en vragen van collega's",
    ],
    benefits: [
      "Een eerlijk beeld van wat AI wel en niet voor je doet",
      "Je beslist zelf over aanschaf en je betaalt niet voor licenties die niemand gebruikt",
      "AI-tools staan veilig ingesteld, met de juiste toegang voor de juiste mensen",
      "Uitleg in gewone taal, zonder hype",
    ],
    idealFor: "Ondernemers die AI willen gebruiken, maar niet weten waar te beginnen.",
    cta: "Stuur een vraag over AI",
    rate: "€ 75 per uur",
  },
];
