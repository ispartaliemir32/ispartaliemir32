import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RateCards } from "./RateCards";

export function RatesPreview() {
  return (
    <Section id="tarieven" tone="mist" labelledBy="tarieven-titel">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="tarieven-titel"
          eyebrow="Tarieven"
          title="Duidelijk wat het kost"
          intro="Je betaalt alleen de tijd die het kost, per kwartier afgerekend, met een minimum van 30 minuten per verzoek."
        />
        <ArrowLink href="/tarieven/" className="shrink-0 lg:mb-2">
          Alle tarieven en voorwaarden
        </ArrowLink>
      </div>
      <div className="mt-12">
        <RateCards />
      </div>
    </Section>
  );
}
