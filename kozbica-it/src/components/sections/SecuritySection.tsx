import { DatabaseBackup, FileStack, Fingerprint, LaptopMinimalCheck, LockKeyhole, ShieldCheck, type LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section, SectionHeader } from "@/components/ui/Section";

const measures: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Fingerprint,
    title: "Identiteit & toegang",
    text: "Meervoudige verificatie en duidelijk toegangsbeheer via Microsoft Entra ID.",
  },
  {
    icon: LaptopMinimalCheck,
    title: "Beheerde apparaten",
    text: "Centraal beheerde, versleutelde en up-to-date laptops en telefoons met Microsoft Intune.",
  },
  {
    icon: ShieldCheck,
    title: "Bescherming tegen dreigingen",
    text: "Endpointbeveiliging met Microsoft Defender tegen onder meer malware en ransomware.",
  },
  {
    icon: DatabaseBackup,
    title: "Back-up & herstel",
    text: "Advies over en inrichting van back-ups, zodat uw belangrijke gegevens herstelbaar zijn.",
  },
  {
    icon: LockKeyhole,
    title: "Minimale rechten",
    text: "Medewerkers en beheerders krijgen alleen de toegang die ze voor hun werk nodig hebben.",
  },
  {
    icon: FileStack,
    title: "Documentatie & eigenaarschap",
    text: "Uw omgeving is gedocumenteerd. U blijft eigenaar van uw gegevens, accounts en beheertoegang.",
  },
];

export function SecuritySection() {
  return (
    <Section id="veiligheid" tone="navy" labelledBy="veiligheid-titel">
      <div aria-hidden="true" className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -top-40 left-1/3 size-[36rem] rounded-full bg-turquoise-500/15 blur-3xl" />

      <div className="relative">
        <SectionHeader
          id="veiligheid-titel"
          eyebrow="Veiligheid & betrouwbaarheid"
          title="Beveiliging als uitgangspunt, niet als extraatje"
          intro="Een goed beveiligde IT-omgeving begint bij de basis. Wij richten uw omgeving in volgens gangbare best practices en houden die actueel."
          tone="dark"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {measures.map((measure) => (
            <li
              key={measure.title}
              className="rounded-card bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07]"
            >
              <IconBadge icon={measure.icon} tone="dark" size="sm" />
              <h3 className="mt-5 text-lg font-bold text-white">{measure.title}</h3>
              <p className="mt-2.5 leading-relaxed text-white/75">{measure.text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/65">
          Eerlijk is eerlijk: geen enkele maatregel biedt honderd procent zekerheid. Met de juiste basismaatregelen,
          goed beheer en alerte medewerkers verkleint u de risico&apos;s wel aanzienlijk.
        </p>
      </div>
    </Section>
  );
}
