/** Alle tarieven zijn exclusief btw. */

export type Rate = {
  name: string;
  price: string;
  unit: string;
  description: string;
  highlighted?: boolean;
};

export const rates: Rate[] = [
  {
    name: "IT-ondersteuning en applicatiebeheer",
    price: "€ 60",
    unit: "per uur",
    description: "Voor storingen, beheer van gebruikers en licenties, werkplekken en je bedrijfsapplicaties.",
  },
  {
    name: "IT-advies",
    price: "€ 75",
    unit: "per uur",
    description: "Vrijblijvend advies over licenties, beveiliging en werkplekinrichting.",
  },
  {
    name: "Urenbundel van 10 uur",
    price: "€ 550",
    unit: "voor 10 uur",
    description: "Voor ondersteuning en applicatiebeheer. 12 maanden geldig. Dat is € 55 per uur.",
    highlighted: true,
  },
];

export const conditions = [
  "Afgerekend per kwartier, met een minimum van 30 minuten per verzoek.",
  "Werk op locatie kan na afspraak. Reistijd telt als werktijd, plus € 0,23 per km.",
  "Alle tarieven zijn exclusief btw.",
  "Grotere projecten doe ik op offerte.",
];

export const examples = [
  { what: "Een snelle vraag van 30 minuten", cost: "€ 30" },
  { what: "Een storing van 45 minuten", cost: "€ 45" },
  { what: "Een uur advies over je licenties", cost: "€ 75" },
];
