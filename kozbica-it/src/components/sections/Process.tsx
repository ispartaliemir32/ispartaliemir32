import { ClipboardCheck, FileSignature, MessagesSquare, ServerCog, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessagesSquare,
    title: "Kennismaking",
    text: "Een vrijblijvend gesprek over uw bedrijf, uw IT en waar u tegenaan loopt.",
  },
  {
    icon: ClipboardCheck,
    title: "Inventarisatie",
    text: "We brengen uw huidige omgeving in kaart: gebruikers, apparaten, Microsoft 365 en beveiliging.",
  },
  {
    icon: FileSignature,
    title: "Voorstel op maat",
    text: "U ontvangt een helder voorstel: wat we doen, wat het kost en welke afspraken we maken.",
  },
  {
    icon: ServerCog,
    title: "Overdracht & beheer",
    text: "We nemen het beheer zorgvuldig over en blijven uw omgeving proactief verbeteren.",
  },
];

export function Process() {
  return (
    <Section id="werkwijze" tone="white" labelledBy="werkwijze-titel">
      <SectionHeader
        id="werkwijze-titel"
        eyebrow="Zo werken we"
        title="In vier heldere stappen naar zorgeloze IT"
        intro="Geen verrassingen en geen vakjargon. U weet bij elke stap waar u aan toe bent."
        align="center"
      />

      <div className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-turquoise-200 via-turquoise-400 to-turquoise-200 lg:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="relative text-center">
              <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-turquoise-300 shadow-[0_12px_30px_-12px_rgb(16_35_52/0.6)] ring-4 ring-white">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                <span className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-turquoise-600 text-xs font-bold text-white ring-2 ring-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold">
                <span className="sr-only">Stap {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mx-auto mt-2.5 max-w-xs leading-relaxed text-muted">{step.text}</p>
            </li>
          );
        })}
        </ol>
      </div>
    </Section>
  );
}
