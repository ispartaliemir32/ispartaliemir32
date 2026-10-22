import { Eye, FileText, MapPin, MessagesSquare, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Over mij: persoonlijke IT-ondersteuning in Rotterdam",
  description:
    "Kozbica IT biedt persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving. Duidelijke afspraken, heldere uitleg zonder vakjargon.",
  path: "/over-ons/",
});

const values: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: UserRound, title: "Persoonlijk", text: "Je hebt altijd met mij te maken. Korte lijnen en een snelle reactie." },
  { icon: MessagesSquare, title: "Heldere uitleg", text: "Ik leg uit wat ik doe en waarom, zonder vakjargon." },
  { icon: FileText, title: "Duidelijke afspraken", text: "Geen ingewikkelde contracten. Vooraf is duidelijk wat ik doe en wat het kost." },
  { icon: ShieldCheck, title: "Veiligheid als basis", text: "Zaken als MFA en goed beheerde accounts breng ik eerst op orde." },
  { icon: Eye, title: "Eerlijk", text: "Past je vraag niet bij mij, dan zeg ik dat." },
  { icon: MapPin, title: "Dichtbij", text: `${site.serviceArea}. Het meeste doe ik op afstand, op locatie kan na afspraak.` },
];

export default function OverMijPage() {
  return (
    <>
      <PageHero
        eyebrow="Over mij"
        title="Persoonlijke IT-ondersteuning voor kleine bedrijven"
        intro="Kozbica IT biedt persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving."
        crumbs={[{ name: "Over mij", path: "/over-ons/" }]}
      />

      <Section labelledBy="verhaal-titel">
        <div className="max-w-3xl">
          <SectionHeader id="verhaal-titel" eyebrow="Wat ik doe" title="Je IT op orde, zonder gedoe" />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Ik help bij het beheer van Microsoft 365, Entra ID en Intune: gebruikers en licenties beheren, werkplekken
            en laptops inrichten, beveiliging zoals MFA op orde brengen en storingen oplossen. Geen ingewikkelde
            contracten, wel duidelijke afspraken en heldere uitleg zonder vakjargon.
          </p>
        </div>
      </Section>

      <Section tone="mist" labelledBy="waarden-titel">
        <SectionHeader id="waarden-titel" eyebrow="Zo werk ik" title="Waar je op kunt rekenen" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <li key={value.title} className="rounded-card bg-white p-7 shadow-card ring-1 ring-line">
              <IconBadge icon={value.icon} size="sm" />
              <h3 className="mt-5 text-lg font-bold">{value.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner title="Kennismaken?" text="Stuur een e-mail of bel me. Ik reageer binnen 1 werkdag." subject="Kennismaken" />
    </>
  );
}
