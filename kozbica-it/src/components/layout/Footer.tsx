import Link from "next/link";
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ContactValue } from "@/components/ui/ContactValue";
import { Container } from "@/components/ui/Container";
import { filled, site } from "@/config/site";
import { legalNav, mainNav } from "@/content/navigation";
import { services } from "@/content/services";
import { CurrentYear } from "./CurrentYear";

const linkClass = "rounded text-white/70 transition-colors hover:text-white hover:underline underline-offset-4";

export function Footer() {
  const email = filled(site.contact.email);
  const phone = filled(site.contact.phone);
  const kvk = filled(site.contact.kvk);
  const btw = filled(site.contact.btw);
  return (
    <footer className="no-print relative overflow-hidden bg-navy-950 text-white" aria-labelledby="footer-titel">
      <h2 id="footer-titel" className="sr-only">
        Informatie over Kozbica IT
      </h2>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-turquoise-500/60 to-transparent" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block rounded-lg" aria-label="Kozbica IT, naar de homepage">
              <Logo tone="onDark" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              Onafhankelijke IT-dienstverlener uit Rotterdam. Wij ondersteunen het MKB met IT-beheer, Microsoft 365,
              cloudoplossingen en cybersecurity, met één vast aanspreekpunt.
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm text-white/70">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-turquoise-400" />
              {site.serviceArea}
            </p>
          </div>

          <nav aria-labelledby="footer-navigatie" className="lg:col-span-2">
            <h3 id="footer-navigatie" className="text-sm font-semibold tracking-wide text-white uppercase">
              Navigatie
            </h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-diensten" className="lg:col-span-3">
            <h3 id="footer-diensten" className="text-sm font-semibold tracking-wide text-white uppercase">
              Diensten
            </h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/diensten#${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Contact</h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-white/70">
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-turquoise-400" />
                  <span className="sr-only">E-mail:</span>
                  <ContactValue type="email" value={email} className="text-white/85" />
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-turquoise-400" />
                  <span className="sr-only">Telefoon:</span>
                  <ContactValue type="phone" value={phone} className="text-white/85" />
                </li>
              )}
              {!email && !phone && (
                <li className="flex items-center gap-2.5">
                  <MessageSquareText aria-hidden="true" className="size-4 shrink-0 text-turquoise-400" />
                  <Link href="/contact" className={linkClass}>
                    Via het contactformulier
                  </Link>
                </li>
              )}
            </ul>
            {(kvk || btw) && (
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm text-white/60">
                {kvk && (
                  <>
                    <dt>KvK</dt>
                    <dd className="font-mono">{kvk}</dd>
                  </>
                )}
                {btw && (
                  <>
                    <dt>Btw-id</dt>
                    <dd className="font-mono">{btw}</dd>
                  </>
                )}
              </dl>
            )}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-turquoise-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-turquoise-700"
            >
              Plan een gratis kennismaking
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {site.legalName}. Alle rechten voorbehouden.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/60">
          Microsoft, Microsoft 365, Azure, Entra, Intune, Defender, Windows, SharePoint en Exchange zijn handelsmerken
          van de Microsoft-groep. Kozbica IT is een onafhankelijke IT-dienstverlener; het noemen van deze producten
          impliceert geen partnerschap of goedkeuring.
        </p>
      </Container>
    </footer>
  );
}
