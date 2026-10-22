import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { mailHref, phoneHref, site } from "@/config/site";
import { mainNav } from "@/content/navigation";
import { services } from "@/content/services";

const linkClass = "rounded text-white/70 transition-colors hover:text-white hover:underline underline-offset-4";

export function Footer() {
  // Het copyrightjaar is minimaal 2027 (startjaar) en loopt daarna vanzelf mee.
  const year = Math.max(2027, new Date().getFullYear());
  return (
    <footer className="no-print relative overflow-hidden bg-navy-950 text-white" aria-labelledby="footer-titel">
      <h2 id="footer-titel" className="sr-only">
        Informatie over Kozbica IT
      </h2>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-turquoise-500/60 to-transparent" />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block rounded-lg" aria-label="Kozbica IT, naar de homepage">
              <Logo tone="onDark" />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">
              Persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-white/70">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-turquoise-400" />
              {site.serviceArea}
            </p>
          </div>

          <nav aria-labelledby="footer-navigatie" className="lg:col-span-2">
            <h3 id="footer-navigatie" className="text-sm font-semibold tracking-wide text-white uppercase">
              Pagina&apos;s
            </h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-diensten" className="lg:col-span-2">
            <h3 id="footer-diensten" className="text-sm font-semibold tracking-wide text-white uppercase">
              Diensten
            </h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/diensten/#${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-turquoise-400" />
                <a href={mailHref()} className={linkClass}>
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-turquoise-400" />
                <a href={phoneHref} className={linkClass}>
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Kozbica IT · KvK {site.contact.kvk} · Rotterdam
          </p>
          <Link href="/privacy/" className={linkClass}>
            Privacyverklaring
          </Link>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-white/60">
          Microsoft, Microsoft 365, Entra en Intune zijn handelsmerken van de Microsoft-groep. Kozbica IT is een
          onafhankelijke IT-dienstverlener; het noemen van deze producten impliceert geen partnerschap of goedkeuring.
        </p>
      </Container>
    </footer>
  );
}
