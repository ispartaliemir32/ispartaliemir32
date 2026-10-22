import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList } from "@/components/ui/CheckList";
import { isPlaceholder, mailHref, phoneHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact: stuur een e-mail of bel",
  description:
    "Neem contact op met Kozbica IT in Rotterdam. Stuur een e-mail of bel. Ik reageer binnen 1 werkdag.",
  path: "/contact/",
});

const tips = [
  "Je naam en bedrijf",
  "Waar je tegenaan loopt, in je eigen woorden",
  "Over welke applicatie of welk apparaat het gaat",
  "Wanneer je mij kunt bereiken",
];

export default function ContactPage() {
  const { email, phone, kvk } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Mail of bel mij"
        intro="Geen formulier, geen wachtrij. Stuur je vraag per e-mail, dan reageer ik binnen 1 werkdag. Liever bellen? Dat kan ook."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      <section aria-label="Contactgegevens" className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-card bg-white p-8 shadow-card ring-1 ring-line">
              <IconBadge icon={Mail} />
              <h2 className="mt-6 text-2xl font-bold">E-mail</h2>
              <p className="mt-2 text-muted">De beste manier. Ik reageer binnen 1 werkdag.</p>
              <p className="mt-4 text-lg font-semibold break-all text-navy-900">{email}</p>
              <ButtonLink href={mailHref("Vraag via kozbica.nl")} size="lg" className="mt-6 w-full sm:w-fit">
                <Mail aria-hidden="true" className="size-5" />
                Stuur een e-mail
              </ButtonLink>
            </div>

            <div className="flex flex-col rounded-card bg-white p-8 shadow-card ring-1 ring-line">
              <IconBadge icon={Phone} />
              <h2 className="mt-6 text-2xl font-bold">Telefoon</h2>
              <p className="mt-2 text-muted">Voor een korte vraag. Mail je liever eerst, dan kan ik me voorbereiden.</p>
              <p className="mt-4 text-lg font-semibold text-navy-900">{phone}</p>
              <ButtonLink href={phoneHref} variant="secondary" size="lg" className="mt-6 w-full sm:w-fit">
                <Phone aria-hidden="true" className="size-5" />
                Bel {phone}
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold">Wat kun je in je mail zetten?</h2>
              <p className="mt-3 text-muted">Hoe duidelijker je vraag, hoe sneller ik kan helpen.</p>
              <CheckList items={tips} className="mt-5" />
            </div>
            <div className="rounded-card bg-mist p-7 ring-1 ring-line">
              <h2 className="text-lg font-bold">Goed om te weten</h2>
              <ul className="mt-5 space-y-4 text-[0.9375rem]">
                <li className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-700" />
                  <span>
                    <span className="font-semibold">{site.serviceArea}.</span> Het meeste doe ik op afstand, op locatie
                    kan na afspraak.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-700" />
                  <span>Ik reageer binnen 1 werkdag.</span>
                </li>
                {!isPlaceholder(kvk) && (
                  <li className="flex gap-3 text-muted">
                    <span className="size-5 shrink-0" aria-hidden="true" />
                    <span>KvK {kvk}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
