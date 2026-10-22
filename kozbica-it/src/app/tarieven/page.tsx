import { Calculator, CheckCircle2 } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { RateCards } from "@/components/sections/RateCards";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { conditions, examples } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Tarieven: € 60 per uur, per kwartier afgerekend",
  description:
    "Duidelijke tarieven voor IT-ondersteuning, applicatiebeheer, IT-advies en AI-ondersteuning. Per kwartier afgerekend, urenbundel van 10 uur voor € 550. Alle tarieven exclusief btw.",
  path: "/tarieven/",
});

export default function TarievenPage() {
  return (
    <>
      <PageHero
        eyebrow="Tarieven"
        title="Duidelijk wat het kost"
        intro="Geen abonnement en geen verrassingen. Je betaalt alleen de tijd die het kost. Alle tarieven zijn exclusief btw."
        crumbs={[{ name: "Tarieven", path: "/tarieven/" }]}
      />

      <Section labelledBy="tarief-titel">
        <h2 id="tarief-titel" className="sr-only">
          Overzicht van de tarieven
        </h2>
        <RateCards />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-mist p-8 ring-1 ring-line">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <IconBadge icon={CheckCircle2} size="sm" />
              Afspraken
            </h3>
            <ul className="mt-6 space-y-3">
              {conditions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-turquoise-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card bg-white p-8 shadow-card ring-1 ring-line">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <IconBadge icon={Calculator} size="sm" />
              Voorbeelden
            </h3>
            <dl className="mt-6 divide-y divide-line">
              {examples.map((example) => (
                <div key={example.what} className="flex items-baseline justify-between gap-4 py-3">
                  <dt>{example.what}</dt>
                  <dd className="font-display text-lg font-bold text-navy-900">{example.cost}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted">Bedragen exclusief btw, op basis van € 60 per uur (advies € 75).</p>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Benieuwd wat jouw vraag kost?"
        text="Stuur een e-mail met je vraag. Ik laat binnen 1 werkdag weten hoe ik kan helpen en wat het ongeveer kost."
        subject="Wat kost mijn vraag?"
      />
    </>
  );
}
