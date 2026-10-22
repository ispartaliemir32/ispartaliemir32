import { Mail, MessagesSquare, Wrench, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Mail, title: "Je stuurt je vraag", text: "Per e-mail. Vertel kort waar je tegenaan loopt." },
  { icon: MessagesSquare, title: "Ik reageer binnen 1 werkdag", text: "Ik laat weten hoe ik kan helpen en wat het ongeveer kost." },
  { icon: Wrench, title: "Ik los het op", text: "Meestal op afstand. Je betaalt alleen de tijd die het kost." },
];

export function Process() {
  return (
    <Section id="werkwijze" tone="white" labelledBy="werkwijze-titel">
      <SectionHeader
        id="werkwijze-titel"
        eyebrow="Werkwijze"
        title="In drie stappen geregeld"
        intro="Geen formulieren en geen wachtrij. Gewoon een mail, en daarna zit ik erbovenop."
        align="center"
      />

      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute top-7 right-[16.7%] left-[16.7%] hidden h-px bg-linear-to-r from-turquoise-200 via-turquoise-400 to-turquoise-200 md:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative text-center">
                <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-turquoise-300 shadow-[0_12px_30px_-12px_rgb(18_38_54/0.6)] ring-4 ring-white">
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
        <p className="mt-10 text-center text-sm text-muted">Werk op locatie is mogelijk na afspraak.</p>
      </div>
    </Section>
  );
}
