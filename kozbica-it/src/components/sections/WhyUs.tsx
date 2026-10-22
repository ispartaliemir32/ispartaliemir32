import { FileText, MessagesSquare, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section, SectionHeader } from "@/components/ui/Section";

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserRound,
    title: "Persoonlijk",
    text: "Je spreekt altijd met mij. Geen callcenter, geen wisselende gezichten en je hoeft je verhaal maar één keer te vertellen.",
  },
  {
    icon: MessagesSquare,
    title: "Uitleg zonder vakjargon",
    text: "Ik leg uit wat er aan de hand is en wat ik doe, in gewone taal. Zo snap je wat je krijgt.",
  },
  {
    icon: FileText,
    title: "Geen ingewikkelde contracten",
    text: "Wel duidelijke afspraken vooraf. Je betaalt alleen de tijd die het kost.",
  },
  {
    icon: ShieldCheck,
    title: "Veiligheid als basis",
    text: "Een veilige werkplek begint met de basis, zoals MFA en goed beheerde accounts. Die breng ik voor je op orde.",
  },
];

export function WhyUs() {
  return (
    <Section id="waarom" tone="mist" labelledBy="waarom-titel">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="waarom-titel"
              eyebrow="Over Kozbica IT"
              title="IT die je niet hoeft te begrijpen"
              intro="Kozbica IT biedt persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving. Ik help bij het beheer van Microsoft 365, Entra ID en Intune: gebruikers en licenties beheren, werkplekken en laptops inrichten, beveiliging zoals MFA op orde brengen en storingen oplossen."
            />
            <p className="mt-5 leading-relaxed text-muted">
              Geen ingewikkelde contracten, wel duidelijke afspraken en heldere uitleg zonder vakjargon.
            </p>
            <div className="mt-8">
              <ButtonLink href="/over-ons/" variant="secondary" withArrow>
                Meer over mij
              </ButtonLink>
            </div>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {reasons.map((reason) => (
            <li key={reason.title} className="rounded-card bg-white p-7 shadow-card ring-1 ring-line">
              <IconBadge icon={reason.icon} size="sm" />
              <h3 className="mt-5 text-lg font-bold">{reason.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
