import {
  Cloud,
  Headset,
  Lightbulb,
  Mails,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { ServiceOptionValue } from "./service-options";

export type Service = {
  slug: Exclude<ServiceOptionValue, "anders">;
  title: string;
  icon: LucideIcon;
  /** Korte tekst voor servicekaarten. */
  summary: string;
  /** Uitgebreide uitleg op de dienstenpagina, in begrijpelijke taal. */
  intro: string;
  /** Wat de klant eraan heeft. */
  benefits: string[];
  /** Wat Kozbica IT concreet doet. */
  includes: string[];
  technologies: string[];
  idealFor: string;
  cta: string;
};

export const services: Service[] = [
  {
    slug: "it-beheer",
    title: "IT-beheer & systeembeheer",
    icon: ServerCog,
    summary:
      "Wij houden uw IT-omgeving stabiel, actueel en overzichtelijk, zodat uw team zich kan richten op het eigenlijke werk.",
    intro:
      "Een IT-omgeving die gewoon werkt, vraagt om structureel onderhoud. Wij nemen het dagelijkse beheer van uw systemen, gebruikers en apparaten uit handen en houden het overzicht: wat er draait, wie waar toegang toe heeft en wat aandacht nodig heeft. Zo voorkomt u verrassingen en weet u altijd bij wie u terechtkunt.",
    benefits: [
      "Eén vast aanspreekpunt dat uw omgeving kent",
      "Minder storingen dankzij preventief onderhoud",
      "Overzicht en documentatie van uw IT",
      "Voorspelbare kosten door heldere afspraken",
    ],
    includes: [
      "Beheer van gebruikers, rechten en accounts",
      "Onderhoud en controle van systemen en instellingen",
      "Update- en patchbeheer",
      "Documentatie van uw IT-omgeving",
      "Aanspreekpunt richting uw IT-leveranciers",
    ],
    technologies: ["Microsoft 365", "Microsoft Entra ID", "Windows 11"],
    idealFor: "Bedrijven zonder eigen IT-afdeling die hun IT structureel geregeld willen hebben.",
    cta: "Bespreek IT-beheer",
  },
  {
    slug: "microsoft-365",
    title: "Microsoft 365 beheer",
    icon: Mails,
    summary:
      "E-mail, Teams, SharePoint en OneDrive professioneel ingericht: veilig, overzichtelijk en afgestemd op hoe uw team werkt.",
    intro:
      "Microsoft 365 is voor veel bedrijven het hart van de dagelijkse samenwerking. Toch groeit de inrichting vaak zonder plan: losse accounts, onduidelijke rechten en bestanden op verschillende plekken. Wij richten Microsoft 365 logisch en veilig in en houden het beheer bij, van licenties tot gedeelde mappen.",
    benefits: [
      "Overzichtelijke samenwerking in Teams en SharePoint",
      "Veilig inloggen met meervoudige verificatie (MFA)",
      "Geen onnodige licentiekosten",
      "Nieuwe en vertrekkende medewerkers correct geregeld",
    ],
    includes: [
      "Inrichting en beheer van e-mail in Exchange Online",
      "Structuur aanbrengen in Teams, SharePoint en OneDrive",
      "Licentiebeheer en -advies",
      "Gebruikers- en groepsbeheer in Microsoft Entra ID",
      "Migraties naar Microsoft 365",
    ],
    technologies: ["Microsoft 365", "Exchange Online", "SharePoint", "Microsoft Entra ID"],
    idealFor: "Bedrijven die Microsoft 365 al gebruiken of willen overstappen en het goed geregeld willen hebben.",
    cta: "Bespreek Microsoft 365",
  },
  {
    slug: "cloud-azure",
    title: "Cloudoplossingen & Azure",
    icon: Cloud,
    summary:
      "Van lokale server naar de cloud: wij adviseren over en begeleiden een veilige, doordachte overstap.",
    intro:
      "Steeds meer bedrijven willen af van de server in de meterkast. De cloud maakt uw bedrijf flexibeler en minder afhankelijk van één locatie, mits alles goed wordt ingericht. Wij kijken eerst wat u werkelijk nodig heeft en kiezen daarna de passende oplossing: vaak volstaat Microsoft 365, soms is Microsoft Azure de juiste stap.",
    benefits: [
      "Overal veilig bij uw bestanden en applicaties",
      "Minder afhankelijk van verouderde hardware",
      "Een omgeving die meegroeit met uw bedrijf",
      "Inzicht in en grip op uw cloudkosten",
    ],
    includes: [
      "Advies over cloudstrategie en migratie",
      "Migratie van bestanden en servers naar de cloud",
      "Inrichting en beheer van Microsoft Azure-resources",
      "Back-up- en herstelmogelijkheden in de cloud",
      "Optimalisatie van cloudabonnementen en -kosten",
    ],
    technologies: ["Microsoft Azure", "Microsoft 365", "SharePoint"],
    idealFor: "Bedrijven met een verouderde server of die flexibeler en locatieonafhankelijk willen werken.",
    cta: "Bespreek uw cloudplannen",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity & endpointbeveiliging",
    icon: ShieldCheck,
    summary:
      "Praktische bescherming tegen phishing, ransomware en datalekken, passend bij de omvang van uw bedrijf.",
    intro:
      "Ook kleinere bedrijven zijn doelwit van cybercriminelen. Goede beveiliging hoeft niet ingewikkeld te zijn, maar moet wel kloppen. Wij brengen de belangrijkste risico's in kaart en nemen gerichte maatregelen: van meervoudige verificatie en goed beveiligde apparaten tot bewustwording binnen uw team.",
    benefits: [
      "Kleinere kans op phishing en ransomware",
      "Beveiliging die medewerkers niet in de weg zit",
      "Grip op wie toegang heeft tot welke gegevens",
      "Een stevige basis richting klanten en verzekeraars",
    ],
    includes: [
      "Meervoudige verificatie (MFA) en veilig aanmeldbeleid",
      "Endpointbeveiliging met Microsoft Defender",
      "Aanscherpen van de beveiligingsinstellingen in Microsoft 365",
      "Beleid voor wachtwoorden, toegang en apparaten",
      "Advies over back-up en herstel",
      "Bewustwording bij medewerkers (security awareness)",
    ],
    technologies: ["Microsoft Defender", "Microsoft Entra ID", "Microsoft Intune"],
    idealFor: "Bedrijven die werken met klantgegevens en hun digitale risico's serieus willen verkleinen.",
    cta: "Bespreek uw beveiliging",
  },
  {
    slug: "werkplekbeheer",
    title: "Werkplekbeheer & apparaatbeheer",
    icon: MonitorSmartphone,
    summary:
      "Laptops en telefoons centraal beheerd: veilig, up-to-date en direct klaar voor gebruik.",
    intro:
      "Elke laptop en telefoon met toegang tot uw bedrijfsgegevens moet veilig en goed ingesteld zijn. Met centraal apparaatbeheer zorgen wij dat elk apparaat dezelfde instellingen, updates en beveiliging krijgt. Nieuwe laptops worden grotendeels automatisch ingericht, en bij verlies of diefstal blijven uw gegevens beschermd.",
    benefits: [
      "Nieuwe medewerkers sneller aan de slag",
      "Alle apparaten up-to-date en beveiligd",
      "Bedrijfsgegevens beschermd bij verlies of diefstal",
      "Minder handwerk en minder fouten",
    ],
    includes: [
      "Apparaatbeheer met Microsoft Intune",
      "Automatische inrichting van nieuwe Windows 11-laptops",
      "Update- en softwarebeheer",
      "Beheer van zakelijke smartphones",
      "Advies bij de aanschaf van hardware",
    ],
    technologies: ["Microsoft Intune", "Windows 11", "Microsoft Entra ID"],
    idealFor: "Bedrijven met meerdere laptops en telefoons die veilig en uniform beheerd moeten worden.",
    cta: "Bespreek werkplekbeheer",
  },
  {
    slug: "it-support",
    title: "IT-support & troubleshooting",
    icon: Headset,
    summary:
      "Persoonlijke hulp bij storingen en IT-vragen: op afstand, en in de regio Rotterdam ook op locatie.",
    intro:
      "Een account dat geblokkeerd is, een laptop die steeds vastloopt of e-mail die niet aankomt: IT-problemen kosten tijd en energie. Bij Kozbica IT kunt u terecht bij een vast aanspreekpunt dat met u meedenkt. We lossen het probleem op en kijken ook naar de oorzaak, zodat het niet steeds terugkomt.",
    benefits: [
      "Hulp van iemand die uw omgeving kent",
      "Geen anonieme helpdesk met wisselende gezichten",
      "Structurele oplossingen in plaats van lapmiddelen",
      "Ondersteuning op afstand én op locatie in de regio",
    ],
    includes: [
      "Ondersteuning op afstand via een beveiligde verbinding",
      "Oplossen van problemen met hardware, software en accounts",
      "Hulp bij Microsoft 365, e-mail en Teams",
      "Netwerk- en wifiproblemen op kantoor",
      "Op locatie in Rotterdam en Zuid-Holland (in overleg)",
    ],
    technologies: ["Windows 11", "Microsoft 365", "Exchange Online"],
    idealFor: "Bedrijven die bij IT-problemen snel bij een bekend aanspreekpunt terecht willen kunnen.",
    cta: "Vraag IT-support aan",
  },
  {
    slug: "it-advies",
    title: "IT-advies & automatisering",
    icon: Lightbulb,
    summary:
      "Een heldere IT-koers en slimme automatisering die uw team tijd en handwerk bespaart.",
    intro:
      "Welke software past bij uw bedrijf? Is uw IT klaar voor groei? En welke handmatige taken kunnen slimmer? Wij denken als sparringpartner mee over de IT-keuzes die ertoe doen en vertalen techniek naar heldere adviezen. Waar het loont, automatiseren we terugkerende taken, bijvoorbeeld met Microsoft 365-tools en scripts.",
    benefits: [
      "Heldere keuzes zonder technisch jargon",
      "Minder handmatig en foutgevoelig werk",
      "Een IT-planning die past bij uw groei",
      "Investeringen die aansluiten op uw doelen",
    ],
    includes: [
      "IT-scan en advies over uw huidige omgeving",
      "IT-roadmap en budgetplanning",
      "Automatisering van terugkerende taken, o.a. met Power Automate en PowerShell",
      "Advies bij software- en leverancierskeuzes",
      "Begeleiding van IT-projecten",
    ],
    technologies: ["Microsoft 365", "Microsoft Azure", "SharePoint"],
    idealFor: "Ondernemers die vooruit willen kijken en hun IT bewust willen inzetten.",
    cta: "Plan een adviesgesprek",
  },
];

export function getService(slug: Service["slug"]): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Onbekende dienst: ${slug}`);
  return service;
}
