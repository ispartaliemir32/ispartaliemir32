import { Info } from "lucide-react";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PackageCards } from "./PackageCards";

export function PackagesPreview() {
  return (
    <Section id="pakketten" tone="mist" labelledBy="pakketten-titel">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="pakketten-titel"
          eyebrow="IT-ondersteuningspakketten"
          title="Ondersteuning die past bij uw bedrijf"
          intro="Kies de basis die bij u past. We stemmen de inhoud altijd af op uw situatie, zodat u alleen betaalt voor wat u nodig heeft."
        />
        <ArrowLink href="/it-beheer#pakketten" className="shrink-0 lg:mb-2">
          Bekijk en vergelijk de pakketten
        </ArrowLink>
      </div>

      <div className="mt-14">
        <PackageCards />
      </div>

      <p className="mt-10 flex items-start gap-2.5 rounded-2xl bg-white px-5 py-4 text-[0.9375rem] text-muted ring-1 ring-line sm:items-center">
        <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-700 sm:mt-0" />
        Microsoft 365-licenties, hardware en projecten buiten het pakket worden apart en transparant gefactureerd.
      </p>
    </Section>
  );
}
