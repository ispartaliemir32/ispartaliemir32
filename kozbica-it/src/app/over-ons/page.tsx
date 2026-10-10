import { Eye, Handshake, Laptop, MapPin, MessagesSquare, Quote, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Over ons: onafhankelijke IT-partner uit Rotterdam",
  description:
    "Kozbica IT is een onafhankelijk IT-bedrijf uit Rotterdam dat professionele IT toegankelijk maakt voor het MKB: persoonlijke ondersteuning, duidelijke communicatie en moderne technologie.",
  path: "/over-ons",
});

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessagesSquare,
    title: "Directe communicatie",
    text: "U spreekt rechtstreeks met degene die uw IT beheert. Korte lijnen, heldere taal en geen doorverwijzingen.",
  },
  {
    icon: Wrench,
    title: "Praktische oplossingen",
    text: "We kiezen voor wat werkt en past bij uw bedrijf, niet voor de duurste of meest complexe oplossing.",
  },
  {
    icon: Laptop,
    title: "Moderne Microsoft-technologie",
    text: "We werken met de actuele mogelijkheden van Microsoft 365, Entra ID, Intune, Defender en Azure.",
  },
  {
    icon: Handshake,
    title: "Langdurige relaties",
    text: "We investeren in het leren kennen van uw bedrijf. Hoe beter we u kennen, hoe beter we u kunnen helpen.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first",
    text: "Bij elke keuze kijken we eerst naar veiligheid. Goede beveiliging is de basis, geen extra optie.",
  },
  {
    icon: Eye,
    title: "Transparantie",
    text: "Duidelijke afspraken over wat we doen en wat het kost. Uw gegevens en accounts blijven altijd van u.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title="Een onafhankelijke IT-partner uit Rotterdam"
        intro="Kozbica IT helpt MKB-bedrijven aan een professionele, veilige IT-omgeving, met de persoonlijke aandacht die bij grote IT-dienstverleners vaak ontbreekt."
        crumbs={[{ name: "Over ons", path: "/over-ons" }]}
      />

      <Section labelledBy="verhaal-titel">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader id="verhaal-titel" eyebrow="Ons verhaal" title="Waarom Kozbica IT bestaat" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Veel kleinere bedrijven draaien volledig op IT, maar hebben geen eigen IT-afdeling. De IT groeit dan
                ‘vanzelf’: een collega die er handig in is lost problemen op, accounts en licenties raken uit beeld en
                beveiliging schiet erbij in. Tot er iets misgaat.
              </p>
              <p>
                Kozbica IT is opgericht om dat te veranderen. Wij geloven dat professionele IT niet alleen is
                weggelegd voor grote organisaties. Ook een bedrijf met tien medewerkers verdient een IT-omgeving die
                veilig, overzichtelijk en goed beheerd is, met een vast aanspreekpunt dat het bedrijf écht kent.
              </p>
              <p>
                Als jong, onafhankelijk bedrijf zijn we bewust persoonlijk en direct. U heeft contact met degene die uw
                IT beheert, zonder tussenlagen. We zeggen eerlijk wat we wel en niet doen, en als iets niet bij ons
                past, hoort u dat ook.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-card bg-navy-900 p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <div aria-hidden="true" className="absolute -top-20 -right-20 size-64 rounded-full bg-turquoise-500/25 blur-3xl" />
              <Quote aria-hidden="true" className="relative size-10 text-turquoise-400" />
              <p className="relative mt-4 text-sm font-semibold tracking-wide text-turquoise-300 uppercase">Onze missie</p>
              <blockquote className="relative mt-3 font-display text-2xl leading-snug font-bold text-white sm:text-[1.75rem]">
                Professionele IT-dienstverlening toegankelijk maken voor het MKB, met persoonlijke ondersteuning,
                duidelijke communicatie en moderne technologie.
              </blockquote>
              <figcaption className="relative mt-6 text-white/70">Kozbica IT</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="waarden-titel">
        <SectionHeader
          id="waarden-titel"
          eyebrow="Waar we voor staan"
          title="Zo werken we"
          intro="Deze uitgangspunten bepalen hoe we met klanten, met technologie en met uw gegevens omgaan."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <li key={value.title} className="rounded-card bg-white p-7 shadow-card ring-1 ring-line">
              <IconBadge icon={value.icon} size="sm" />
              <h3 className="mt-5 text-lg font-bold">{value.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="werkgebied-titel">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            id="werkgebied-titel"
            eyebrow="Werkgebied"
            title="Vanuit Rotterdam, voor heel Nederland"
            intro="Veel IT-beheer kan veilig op afstand. Daardoor ondersteunen we bedrijven in heel Nederland. In Rotterdam en de rest van Zuid-Holland komen we waar nodig ook op locatie, in overleg."
          />
          <ul className="grid gap-4">
            {[
              { title: "Rotterdam", text: "Ondersteuning op afstand en, waar nodig, op locatie." },
              { title: "Zuid-Holland", text: "Ondersteuning op afstand en op locatie in overleg." },
              { title: "Heel Nederland", text: "Volledige ondersteuning op afstand via beveiligde verbindingen." },
            ].map((area, index) => (
              <li key={area.title} className="flex items-start gap-4 rounded-card bg-white p-6 shadow-card ring-1 ring-line">
                <span
                  aria-hidden="true"
                  className={
                    index === 0
                      ? "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-turquoise-600 text-white"
                      : "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-turquoise-50 text-turquoise-700 ring-1 ring-turquoise-200"
                  }
                >
                  <MapPin className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{area.title}</h3>
                  <p className="mt-1 text-muted">{area.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner
        title="Laten we kennismaken"
        text="Benieuwd of Kozbica IT bij uw bedrijf past? Plan een vrijblijvend gesprek. We horen graag hoe u werkt en waar u tegenaan loopt."
        secondary={{ href: "/diensten", label: "Bekijk onze diensten" }}
      />
    </>
  );
}
