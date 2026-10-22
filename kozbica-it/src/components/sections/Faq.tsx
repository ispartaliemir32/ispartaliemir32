import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { mailHref } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import type { FaqItem } from "@/content/faq";
import { faqSchema } from "@/lib/structured-data";

/** Veelgestelde vragen met native <details>: toegankelijk en werkt zonder JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-card bg-white shadow-card ring-1 ring-line">
      {items.map((item) => (
        <details key={item.question} className="group px-6 sm:px-8">
          <summary className="flex items-start justify-between gap-6 rounded-lg py-6 text-left font-display text-lg font-bold text-navy-900 transition-colors hover:text-turquoise-700">
            {item.question}
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-mist text-turquoise-700 transition-transform duration-300 group-open:rotate-45"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 pb-6 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq({
  items,
  title = "Veelgestelde vragen",
  intro = "Staat je vraag er niet tussen? Stuur me gerust een e-mail.",
  tone = "white",
}: {
  items: FaqItem[];
  title?: string;
  intro?: string;
  tone?: "white" | "mist";
}) {
  return (
    <Section id="veelgestelde-vragen" tone={tone} labelledBy="faq-titel">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-titel" eyebrow="FAQ" title={title} intro={intro} />
          <div className="mt-8">
            <ButtonLink href={mailHref("Vraag via kozbica.nl")} variant="secondary">
              Stel je vraag
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
      <JsonLd data={faqSchema(items)} />
    </Section>
  );
}
