export type SupportPackage = {
  id: "basis" | "professional" | "compleet";
  name: string;
  tagline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

/**
 * Indicatieve pakketindeling. Prijzen, reactietijden en servicevoorwaarden
 * worden per klant in een voorstel vastgelegd ("Prijs op aanvraag").
 */
export const packages: SupportPackage[] = [
  {
    id: "basis",
    name: "IT Basis",
    tagline: "Voor kleinere bedrijven die essentiële IT-ondersteuning zoeken.",
    description:
      "Een vast aanspreekpunt en hulp wanneer u die nodig heeft, met de basis van uw Microsoft 365-omgeving goed geregeld.",
    features: [
      "Remote IT-support bij vragen en storingen",
      "Gebruikersbeheer in Microsoft 365: accounts, wachtwoorden en licenties",
      "Controle van de basisbeveiliging, waaronder MFA",
      "Vast aanspreekpunt voor al uw IT-vragen",
      "Advies bij de aanschaf van hardware en software",
    ],
  },
  {
    id: "professional",
    name: "IT Professional",
    tagline: "Voor bedrijven die werkplekken en beveiliging structureel geregeld willen hebben.",
    description:
      "Naast support beheren we uw apparaten en beveiliging centraal en proactief, zodat uw omgeving veilig en voorspelbaar blijft.",
    features: [
      "Alles uit IT Basis",
      "Werkplek- en apparaatbeheer met Microsoft Intune",
      "Endpointbeveiliging met Microsoft Defender",
      "Vaste werkwijze voor on- en offboarding van medewerkers",
      "Preventief onderhoud en updatebeheer",
      "Documentatie van uw IT-omgeving",
    ],
    highlighted: true,
  },
  {
    id: "compleet",
    name: "IT Compleet",
    tagline: "Voor bedrijven die hun IT zo breed mogelijk willen uitbesteden.",
    description:
      "Wij functioneren als uw externe IT-afdeling: van dagelijks beheer tot IT-planning, cloud en de afstemming met leveranciers.",
    features: [
      "Alles uit IT Professional",
      "Periodiek IT-overleg en een IT-roadmap",
      "Beheer van uw cloudomgeving, waaronder Microsoft Azure",
      "Periodieke beveiligingscontrole met verbeteradvies",
      "Afstemming met leveranciers en externe partijen",
      "Ondersteuning op locatie in de regio Rotterdam (in overleg)",
    ],
  },
];

export type ComparisonValue = boolean | string;

export const packageComparison: { feature: string; values: [ComparisonValue, ComparisonValue, ComparisonValue] }[] = [
  { feature: "Remote IT-support", values: [true, true, true] },
  { feature: "Vast aanspreekpunt", values: [true, true, true] },
  { feature: "Gebruikers- en licentiebeheer Microsoft 365", values: [true, true, true] },
  { feature: "Controle basisbeveiliging en MFA", values: [true, true, true] },
  { feature: "On- en offboarding van medewerkers", values: ["Op aanvraag", true, true] },
  { feature: "Werkplekbeheer met Microsoft Intune", values: [false, true, true] },
  { feature: "Endpointbeveiliging met Microsoft Defender", values: [false, true, true] },
  { feature: "Preventief onderhoud en updatebeheer", values: [false, true, true] },
  { feature: "Documentatie van uw IT-omgeving", values: [false, true, true] },
  { feature: "Periodiek IT-overleg en IT-roadmap", values: [false, false, true] },
  { feature: "Beheer cloudomgeving en Azure", values: [false, "Op aanvraag", true] },
  { feature: "Periodieke beveiligingscontrole", values: [false, false, true] },
  { feature: "Afstemming met leveranciers", values: [false, false, true] },
  { feature: "Op locatie in de regio Rotterdam", values: ["Op aanvraag", "Op aanvraag", "In overleg"] },
];

export const billedSeparately = [
  "Microsoft 365- en andere softwarelicenties",
  "Hardware, zoals laptops, telefoons en netwerkapparatuur",
  "Projecten buiten het pakket, zoals migraties of grote implementaties (op basis van een offerte)",
  "Diensten van derden, zoals internetverbindingen, telefonie of externe back-upopslag",
];

export const includedInPackage = [
  "De beheer- en supportwerkzaamheden die in uw pakket zijn afgesproken",
  "Een vast aanspreekpunt dat uw omgeving kent",
  "Advies binnen de afgesproken pakketinhoud",
  "Inzicht in de uitgevoerde werkzaamheden",
];
