import { Building2, Cloud, Handshake, RefreshCw, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section, SectionHeader } from "@/components/ui/Section";

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserRound,
    title: "Persoonlijk IT-contact",
    text: "Eén vast aanspreekpunt dat uw bedrijf en uw IT-omgeving kent. U hoeft uw verhaal niet steeds opnieuw te vertellen.",
  },
  {
    icon: Building2,
    title: "Gericht op het MKB",
    text: "Oplossingen voor bedrijven met 5 tot 30 medewerkers: degelijk geregeld, zonder onnodige complexiteit.",
  },
  {
    icon: Cloud,
    title: "Microsoft 365 & Cloud",
    text: "Focus op de Microsoft-omgeving waarin uw team dagelijks werkt, van e-mail en Teams tot apparaatbeheer en Azure.",
  },
  {
    icon: ShieldCheck,
    title: "Veilig en toekomstgericht",
    text: "Beveiliging is bij alles wat we doen het uitgangspunt, geen optie die u er later bij moet kopen.",
  },
  {
    icon: RefreshCw,
    title: "Flexibele ondersteuning",
    text: "Eenmalige hulp bij een project of structureel beheer: u kiest wat past bij de fase van uw bedrijf.",
  },
  {
    icon: Handshake,
    title: "Heldere afspraken",
    text: "U weet vooraf wat we doen en wat het kost. Licenties en hardware staan altijd apart en transparant vermeld.",
  },
];

export function WhyUs() {
  return (
    <Section id="waarom" tone="mist" labelledBy="waarom-titel">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="waarom-titel"
              eyebrow="Waarom Kozbica IT"
              title="Een IT-partner die uw bedrijf écht kent"
              intro="Kozbica IT is een onafhankelijk IT-bedrijf uit Rotterdam. Geen groot callcenter, maar korte lijnen en directe communicatie met degene die uw IT beheert."
            />
            <p className="mt-5 leading-relaxed text-muted">
              Wij geloven dat goede IT niet alleen is weggelegd voor grote organisaties. Met moderne Microsoft-technologie
              en een praktische aanpak krijgt ook uw bedrijf een professionele, veilige IT-omgeving.
            </p>
            <div className="mt-8">
              <ButtonLink href="/over-ons" variant="secondary" withArrow>
                Meer over Kozbica IT
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
