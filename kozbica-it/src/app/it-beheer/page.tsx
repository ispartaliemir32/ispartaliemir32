import {
  CalendarClock,
  Check,
  CircleAlert,
  Headset,
  KeyRound,
  Lightbulb,
  Mails,
  Minus,
  MonitorSmartphone,
  Receipt,
  ShieldCheck,
  UserPlus,
  Wrench,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PackageCards } from "@/components/sections/PackageCards";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { managedItFaq } from "@/content/faq";
import { billedSeparately, includedInPackage, packageComparison, packages, type ComparisonValue } from "@/content/packages";
import { primaryCta } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Extern IT-beheer en systeembeheer voor het MKB in Rotterdam",
  description:
    "Uitbesteed IT-beheer voor bedrijven met 5–30 medewerkers: remote support, Microsoft 365-beheer, on- en offboarding, Intune en Defender. Pakketten IT Basis, Professional en Compleet.",
  path: "/it-beheer",
});

const painPoints = [
  "Een collega die ‘er verstand van heeft’ lost IT-problemen op naast het eigen werk",
  "Niemand weet precies welke accounts, licenties en apparaten er zijn",
  "Nieuwe laptops worden handmatig ingericht en niet centraal beheerd",
  "Beveiliging is nooit echt goed geregeld of gecontroleerd",
  "Bij een storing is het onduidelijk wie u moet bellen",
];

const outcomes = [
  "Eén vast aanspreekpunt voor alle IT-vragen",
  "Een overzichtelijke, gedocumenteerde IT-omgeving",
  "Apparaten en accounts centraal en veilig beheerd",
  "Problemen worden voorkomen in plaats van alleen opgelost",
  "Tijd en rust voor u en uw team",
];

const scope: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Headset, title: "Remote IT-support", text: "Hulp op afstand bij vragen en storingen, via een beveiligde verbinding." },
  { icon: Mails, title: "Microsoft 365-beheer", text: "Accounts, licenties, e-mail, Teams en SharePoint goed ingericht en beheerd." },
  { icon: UserPlus, title: "On- en offboarding", text: "Nieuwe medewerkers direct aan de slag, vertrekkende medewerkers veilig afgemeld." },
  { icon: ShieldCheck, title: "Endpointbeveiliging", text: "Laptops en telefoons beschermd met Microsoft Defender en een veilige configuratie." },
  { icon: MonitorSmartphone, title: "Apparaatconfiguratie", text: "Uniforme instellingen en automatische inrichting met Microsoft Intune." },
  { icon: KeyRound, title: "Gebruikers- en accountbeheer", text: "Rechten, wachtwoorden en MFA overzichtelijk beheerd in Microsoft Entra ID." },
  { icon: CalendarClock, title: "Preventief onderhoud", text: "Updates en periodieke controles, zodat problemen worden voorkomen." },
  { icon: Lightbulb, title: "IT-advies", text: "Meedenken over investeringen, risico’s en de volgende stap voor uw bedrijf." },
];

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-700">
        <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
        <span className="sr-only">Inbegrepen</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex text-line-strong">
        <Minus aria-hidden="true" className="size-5" />
        <span className="sr-only">Niet inbegrepen</span>
      </span>
    );
  }
  return <span className="text-sm font-medium text-navy-800">{value}</span>;
}

export default function ItBeheerPage() {
  return (
    <>
      <PageHero
        eyebrow="IT-beheer"
        title="Extern IT-beheer voor het MKB"
        intro="Uw eigen IT-afdeling, zonder er één in dienst te nemen. Kozbica IT beheert de IT van bedrijven met 5 tot 30 medewerkers in Rotterdam, Zuid-Holland en op afstand in heel Nederland."
        crumbs={[{ name: "IT-beheer", path: "/it-beheer" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?dienst=it-beheer" size="lg" withArrow>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="#pakketten" size="lg" variant="secondary">
            Bekijk de pakketten
          </ButtonLink>
        </div>
      </PageHero>

      <Section id="externe-it-partner" labelledBy="partner-titel">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="partner-titel"
              eyebrow="Uw externe IT-partner"
              title="Professionele IT, zonder eigen IT-afdeling"
              intro="Voor een bedrijf met 5 tot 30 medewerkers is een fulltime IT’er vaak niet haalbaar of nodig. Toch hangt uw bedrijf volledig af van werkende systemen. Als externe IT-partner vullen wij precies dat gat."
            />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Wij leren uw bedrijf en uw IT-omgeving kennen en worden uw vaste aanspreekpunt. We beheren uw Microsoft
                365-omgeving, uw laptops en telefoons en de beveiliging daarvan. Medewerkers kunnen bij ons terecht met
                hun IT-vragen, en u heeft één partij die overzicht houdt en vooruitkijkt.
              </p>
              <p>
                Omdat we uw omgeving structureel beheren, zien we problemen vaak aankomen voordat ze uw team hinderen.
                Zo wordt IT iets waar u niet meer over hoeft na te denken.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-card bg-mist p-7 ring-1 ring-line">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <CircleAlert aria-hidden="true" className="size-5 text-turquoise-700" />
                Herkenbaar?
              </h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-muted">
                {painPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/60" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-navy-900 p-7 text-white">
              <h3 className="text-lg font-bold text-white">Met Kozbica IT als IT-partner</h3>
              <CheckList items={outcomes} tone="dark" className="mt-4 text-[0.9375rem]" dense />
            </div>
          </div>
        </div>
      </Section>

      <Section id="wat-valt-eronder" tone="mist" labelledBy="scope-titel">
        <SectionHeader
          id="scope-titel"
          eyebrow="Inhoud"
          title="Wat valt onder IT-beheer?"
          intro="Afhankelijk van het pakket en uw wensen nemen wij de volgende onderdelen voor onze rekening."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scope.map((item) => (
            <li key={item.title} className="rounded-card bg-white p-6 shadow-card ring-1 ring-line">
              <IconBadge icon={item.icon} size="sm" />
              <h3 className="mt-5 font-bold">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="eenmalig-of-structureel" labelledBy="vergelijk-titel">
        <SectionHeader
          id="vergelijk-titel"
          eyebrow="Twee manieren van samenwerken"
          title="Eenmalige ondersteuning of structureel beheer?"
          intro="U kunt ons inschakelen voor een concrete klus, of ons structureel verantwoordelijk maken voor uw IT. Het verschil zit in hoe proactief we kunnen zijn."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="rounded-card bg-white p-8 shadow-card ring-1 ring-line">
            <IconBadge icon={Wrench} />
            <h3 className="mt-6 text-2xl font-bold">Eenmalige ondersteuning</h3>
            <p className="mt-2 font-medium text-turquoise-700">Voor een concreet probleem of project</p>
            <dl className="mt-6 space-y-5 text-[0.9375rem]">
              <div>
                <dt className="font-semibold text-navy-900">Voorbeelden</dt>
                <dd className="mt-1 text-muted">
                  Een storing oplossen, een migratie naar Microsoft 365, nieuwe laptops inrichten of een eenmalige
                  beveiligingscheck.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Hoe het werkt</dt>
                <dd className="mt-1 text-muted">U vraagt, wij voeren uit. Na afronding is de opdracht klaar.</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Facturatie</dt>
                <dd className="mt-1 text-muted">Per opdracht, op basis van vooraf gemaakte afspraken of een offerte.</dd>
              </div>
            </dl>
          </article>
          <article className="rounded-card bg-white p-8 shadow-card ring-2 ring-turquoise-500/60">
            <IconBadge icon={Repeat} />
            <h3 className="mt-6 text-2xl font-bold">Structureel IT-beheer</h3>
            <p className="mt-2 font-medium text-turquoise-700">Voor IT die doorlopend goed geregeld is</p>
            <dl className="mt-6 space-y-5 text-[0.9375rem]">
              <div>
                <dt className="font-semibold text-navy-900">Voorbeelden</dt>
                <dd className="mt-1 text-muted">
                  Dagelijks beheer en support, preventief onderhoud, beveiliging actueel houden en een vast
                  aanspreekpunt voor uw team.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Hoe het werkt</dt>
                <dd className="mt-1 text-muted">
                  Wij zijn doorlopend verantwoordelijk voor de afgesproken onderdelen van uw IT en signaleren proactief
                  wat aandacht nodig heeft.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Facturatie</dt>
                <dd className="mt-1 text-muted">Een vast periodiek bedrag volgens het afgesproken pakket.</dd>
              </div>
            </dl>
          </article>
        </div>
        <p className="mt-8 text-[0.9375rem] text-muted">
          Begint u liever met eenmalige hulp? Dat kan. U kunt later altijd overstappen naar structureel beheer.
        </p>
      </Section>

      <Section id="pakketten" tone="mist" labelledBy="pakketten-titel">
        <SectionHeader
          id="pakketten-titel"
          eyebrow="Pakketten"
          title="Drie pakketten als vertrekpunt"
          intro="De pakketten geven richting; de precieze inhoud stemmen we af op uw bedrijf. Bereikbaarheid, reactietijden en eventuele uitbreidingen leggen we samen vast in uw voorstel."
        />
        <div className="mt-14">
          <PackageCards />
        </div>

        <div className="mt-20">
          <h3 id="vergelijking-titel" className="text-2xl font-bold">
            Pakketten vergelijken
          </h3>
          <div
            role="region"
            aria-labelledby="vergelijking-titel"
            tabIndex={0}
            className="relative mt-6 overflow-x-auto rounded-card bg-white shadow-card ring-1 ring-line"
          >
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Vergelijking van de pakketten IT Basis, IT Professional en IT Compleet</caption>
              <thead>
                <tr className="border-b border-line bg-mist/70">
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-navy-900">
                    Onderdeel
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} scope="col" className="px-4 py-4 text-center text-sm font-semibold text-navy-900">
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {packageComparison.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" className="px-6 py-3.5 text-[0.9375rem] font-normal text-ink">
                      {row.feature}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={packages[index]?.id ?? index} className="px-4 py-3.5 text-center">
                        <ComparisonCell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-mist/50">
                  <th scope="row" className="px-6 py-4 text-[0.9375rem] font-semibold text-navy-900">
                    Prijs
                  </th>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="px-4 py-4 text-center text-sm font-semibold text-navy-900">
                      Op aanvraag
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            Pakketinhoud is indicatief. “Op aanvraag” en “In overleg” betekenen dat we dit onderdeel per situatie
            afspreken.
          </p>
        </div>
      </Section>

      <Section id="kosten" labelledBy="kosten-titel">
        <SectionHeader
          id="kosten-titel"
          eyebrow="Transparante kosten"
          title="Wat is inbegrepen, en wat niet?"
          intro="Geen verrassingen achteraf. In uw voorstel staat precies wat onder het pakket valt en wat apart wordt gefactureerd."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-white p-8 shadow-card ring-1 ring-line">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <IconBadge icon={Check} size="sm" />
              Inbegrepen in uw pakket
            </h3>
            <CheckList items={includedInPackage} className="mt-6" />
          </div>
          <div className="rounded-card bg-mist p-8 ring-1 ring-line">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <IconBadge icon={Receipt} size="sm" />
              Apart gefactureerd
            </h3>
            <ul className="mt-6 space-y-3">
              {billedSeparately.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-turquoise-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Wij adviseren welke licenties en hardware u écht nodig heeft, zodat u niet betaalt voor wat u niet
              gebruikt.
            </p>
          </div>
        </div>
      </Section>

      <Faq
        items={managedItFaq}
        title="Vragen over IT-beheer"
        intro="Nog iets onduidelijk over hoe IT-beheer werkt? Hieronder de antwoorden op vragen die we vaak horen."
        tone="mist"
      />

      <CtaBanner
        title="Benieuwd wat IT-beheer voor uw bedrijf betekent?"
        text="In een gratis kennismaking bespreken we uw situatie en welk pakket past. U ontvangt daarna een helder voorstel, zonder verplichtingen."
        secondary={{ href: "/diensten", label: "Bekijk alle diensten" }}
      />
    </>
  );
}
