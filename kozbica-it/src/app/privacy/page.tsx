import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { mailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacyverklaring",
  description: "Zo ga ik bij Kozbica IT om met je gegevens: alleen contact via e-mail of telefoon, geen cookies en geen tracking.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  const { email, kvk } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacyverklaring"
        intro="Kort en in gewone taal: dit doe ik met je gegevens."
        crumbs={[{ name: "Privacyverklaring", path: "/privacy/" }]}
      >
        <p className="text-sm text-muted">Laatst bijgewerkt: {site.lastUpdated}</p>
      </PageHero>

      <section className="bg-white py-14 sm:py-16 lg:py-20" aria-label="Privacyverklaring">
        <Container narrow>
          <article className="prose-legal">
            <h2>Wie ben ik?</h2>
            <p>
              Kozbica IT, gevestigd in Rotterdam (KvK {kvk}). Ik ben verantwoordelijk voor de gegevens die je met me
              deelt. Vragen over privacy? Mail naar <a href={mailHref("Vraag over privacy")}>{email}</a>.
            </p>

            <h2>Welke gegevens gebruik ik?</h2>
            <p>
              Alleen wat je zelf aan mij doorgeeft via e-mail of telefoon: bijvoorbeeld je naam, bedrijfsnaam,
              e-mailadres, telefoonnummer en de inhoud van je vraag. Op deze website staat geen formulier.
            </p>

            <h2>Waarvoor gebruik ik ze?</h2>
            <p>
              Alleen om op je vraag te reageren. Als we samenwerken, gebruik ik ze ook om de opdracht uit te voeren en te
              factureren. Ik gebruik ze niet voor reclame en deel ze niet met anderen voor hun eigen doelen.
            </p>

            <h2>Cookies en tracking</h2>
            <p>
              Deze website plaatst geen cookies en gebruikt geen analyse- of trackingdiensten. Lettertypen worden door de
              website zelf aangeboden, dus er worden geen gegevens naar andere partijen gestuurd als je de site bekijkt.
              De webhost van deze site kan wel tijdelijk technische gegevens, zoals je IP-adres, in serverlogs bewaren om de site
              te kunnen tonen en te beveiligen.
            </p>

            <h2>Waar worden gegevens bewaard?</h2>
            <p>
              Je e-mail komt binnen in een Gmail-postvak (Google). Ik bewaar gegevens niet langer dan nodig. Facturen
              bewaar ik 7 jaar, omdat de wet dat vraagt.
            </p>

            <h2>Je rechten</h2>
            <p>
              Je mag vragen welke gegevens ik van je heb, ze laten aanpassen of laten verwijderen. Stuur daarvoor een
              mail naar <a href={mailHref("Privacyverzoek")}>{email}</a>. Ik reageer binnen een maand. Ben je niet
              tevreden? Dan kun je een klacht indienen bij de{" "}
              <a href="https://www.autoriteitpersoonsgegevens.nl" rel="noopener noreferrer">
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>

            <p>
              <Link href="/contact/">Naar contact</Link>
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
