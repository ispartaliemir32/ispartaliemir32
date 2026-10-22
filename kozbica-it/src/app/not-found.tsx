import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-mist" aria-labelledby="niet-gevonden-titel">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <Container narrow className="py-24 text-center sm:py-32">
        <p className="font-display text-7xl font-extrabold text-turquoise-600 sm:text-8xl">404</p>
        <h1 id="niet-gevonden-titel" className="mt-6 text-3xl font-extrabold sm:text-4xl">
          Deze pagina bestaat niet (meer)
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Mogelijk is de link verouderd of is het adres verkeerd getypt. Via de links hieronder vind je snel wat je zoekt.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" withArrow>
            Naar de homepage
          </ButtonLink>
          <ButtonLink href="/contact/" size="lg" variant="secondary">
            Neem contact op
          </ButtonLink>
        </div>
        <nav aria-label="Populaire pagina's" className="mt-14">
          <ul className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            {mainNav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-left font-semibold text-navy-900 shadow-card ring-1 ring-line transition hover:ring-turquoise-300"
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-4 text-turquoise-700 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
