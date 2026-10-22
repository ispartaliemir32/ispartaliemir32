import { Languages, MessagesSquare, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Over mij: Emir Mustafa Bıçakçı, IT-support in Rotterdam",
  description:
    "Ik ben Emir Mustafa Bıçakçı, systeembeheerder en IT-supportspecialist uit Rotterdam en de persoon achter Kozbica IT. Microsoft-gecertificeerd.",
  path: "/over-ons/",
});

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Veiligheid voorop",
    text: "MFA, goed ingestelde rechten en beheerde laptops zijn voor mij de basis.",
  },
  {
    icon: Wrench,
    title: "Ik pak het helemaal op",
    text: "Ik los een storing niet alleen op, ik zoek ook uit waar hij vandaan komt.",
  },
  {
    icon: MessagesSquare,
    title: "Heldere uitleg",
    text: "Geen vakjargon, wel duidelijke antwoorden.",
  },
];

export default function OverMijPage() {
  return (
    <>
      <PageHero
        eyebrow="Over mij"
        title="Over mij"
        intro="Ik ben Emir Mustafa Bıçakçı, systeembeheerder en IT-supportspecialist uit Rotterdam, en de persoon achter Kozbica IT."
        crumbs={[{ name: "Over mij", path: "/over-ons/" }]}
      />

      <Section labelledBy="verhaal-titel">
        <div className="max-w-3xl">
          <SectionHeader id="verhaal-titel" eyebrow="Wie ik ben" title="IT die gewoon werkt" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Ik heb ervaring met werkplekbeheer, IT-support en het zelfstandig beheren van complete
              Microsoft 365-omgevingen: van gebruikers en laptops tot beveiliging en bedrijfsapplicaties. Daardoor weet
              ik hoe belangrijk het is dat IT gewoon werkt, zeker voor kleine bedrijven zonder eigen IT-afdeling.
            </p>
            <p>
              Kozbica IT biedt persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving. Ik help bij
              het beheer van Microsoft 365, Entra ID en Intune: gebruikers en licenties beheren, werkplekken en laptops
              inrichten, beveiliging zoals MFA op orde brengen en storingen oplossen. Geen ingewikkelde contracten, wel
              duidelijke afspraken en heldere uitleg zonder vakjargon.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="waarden-titel">
        <SectionHeader id="waarden-titel" eyebrow="Waar ik voor sta" title="Waar je op kunt rekenen" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <li key={value.title} className="rounded-card bg-white p-7 shadow-card ring-1 ring-line">
              <IconBadge icon={value.icon} size="sm" />
              <h3 className="mt-5 text-lg font-bold">{value.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{value.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <p className="rounded-card bg-white p-6 text-[1.0625rem] leading-relaxed shadow-card ring-1 ring-line">
            Ik ben Microsoft-gecertificeerd en blijf mezelf ontwikkelen in cloud en security.
          </p>
          <p className="flex items-center gap-3 rounded-card bg-white p-6 text-[1.0625rem] shadow-card ring-1 ring-line">
            <Languages aria-hidden="true" className="size-6 shrink-0 text-turquoise-700" />
            Ik spreek Nederlands, Engels en Turks.
          </p>
        </div>
      </Section>

      <CtaBanner title="Kennismaken?" text="Stuur een e-mail of bel me. Ik reageer binnen 1 werkdag." subject="Kennismaken" />
    </>
  );
}
