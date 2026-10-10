import { Building2, FileText, Mail, MapPin, Phone, Receipt } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactValue } from "@/components/ui/ContactValue";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { isPlaceholder, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact en gratis kennismaking",
  description:
    "Neem contact op met Kozbica IT in Rotterdam. Plan een gratis, vrijblijvende kennismaking over IT-beheer, Microsoft 365, cloud of cybersecurity voor uw bedrijf.",
  path: "/contact",
});

// Publieke Turnstile site key; wordt tijdens de build in de pagina opgenomen.
// Zonder configuratie (alleen lokaal) valt hij terug op de officiële testsleutel.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const steps = [
  { title: "We nemen contact op", text: "U hoort persoonlijk van ons om een moment voor de kennismaking af te spreken." },
  {
    title: "Kennismaking",
    text: "We bespreken uw bedrijf, uw IT en uw wensen: telefonisch, online of in de regio Rotterdam op locatie.",
  },
  { title: "Voorstel op maat", text: "Is er een match? Dan ontvangt u een helder voorstel. U zit nergens aan vast." },
];

export default function ContactPage() {
  const { email, phone, kvk, btw } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Plan een gratis kennismaking"
        intro="Vertel ons kort over uw bedrijf en uw IT-vraag. We denken vrijblijvend met u mee en laten u weten hoe we kunnen helpen."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section aria-label="Contactformulier en gegevens" className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ContactForm siteKey={TURNSTILE_SITE_KEY} directEmail={isPlaceholder(email) ? null : email} />
              <noscript>
                <p className="mt-4 rounded-2xl bg-warning-50 p-4 text-warning-800 ring-1 ring-warning-200">
                  Voor het contactformulier is JavaScript nodig. U kunt ons ook rechtstreeks mailen op {email}.
                </p>
              </noscript>
            </div>

            <div className="space-y-8 lg:col-span-5">
              <div>
                <h2 className="text-2xl font-bold">Wat kunt u verwachten?</h2>
                <ol className="mt-6 space-y-6">
                  {steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-turquoise-300"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-card bg-mist p-7 ring-1 ring-line">
                <h2 className="text-lg font-bold">Contactgegevens</h2>
                <dl className="mt-5 space-y-4 text-[0.9375rem]">
                  <div className="flex gap-3">
                    <dt className="flex items-center">
                      <MapPin aria-hidden="true" className="size-5 text-turquoise-700" />
                      <span className="sr-only">Locatie</span>
                    </dt>
                    <dd>
                      {site.location.city}, {site.location.country}
                      <span className="block text-sm text-muted">Op locatie in Zuid-Holland, op afstand in heel Nederland</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="flex items-center">
                      <Mail aria-hidden="true" className="size-5 text-turquoise-700" />
                      <span className="sr-only">E-mail</span>
                    </dt>
                    <dd>
                      <ContactValue type="email" value={email} className="font-medium text-navy-900" />
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="flex items-center">
                      <Phone aria-hidden="true" className="size-5 text-turquoise-700" />
                      <span className="sr-only">Telefoon</span>
                    </dt>
                    <dd>
                      <ContactValue type="phone" value={phone} className="font-medium text-navy-900" />
                    </dd>
                  </div>
                </dl>
                <dl className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2.5 border-t border-line pt-5 text-sm text-muted">
                  <dt className="flex items-center gap-2">
                    <Building2 aria-hidden="true" className="size-4" />
                    KvK-nummer
                  </dt>
                  <dd className="font-mono text-navy-900">{kvk}</dd>
                  <dt className="flex items-center gap-2">
                    <Receipt aria-hidden="true" className="size-4" />
                    Btw-id
                  </dt>
                  <dd className="font-mono text-navy-900">{btw}</dd>
                </dl>
              </div>

              <p className="flex gap-3 text-sm leading-relaxed text-muted">
                <FileText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-turquoise-700" />
                Uw gegevens worden alleen gebruikt om uw aanvraag te behandelen en niet gedeeld voor marketingdoeleinden.
                Het formulier is beveiligd met Cloudflare Turnstile.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
