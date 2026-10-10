import Link from "next/link";
import { CheckCircle2, Target } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { servicesSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "IT-diensten: systeembeheer, Microsoft 365 & security",
  description:
    "IT-beheer, Microsoft 365 beheer, cloud & Azure, cybersecurity, werkplekbeheer met Intune, IT-support en IT-advies voor MKB-bedrijven in Rotterdam en heel Nederland.",
  path: "/diensten",
});

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title="IT-diensten voor het MKB"
        intro="Van dagelijks systeembeheer tot cybersecurity en advies. Wij zorgen dat uw IT veilig, actueel en overzichtelijk is, zodat u zich kunt richten op uw bedrijf. Hieronder leest u per dienst wat we doen en wat het u oplevert."
        crumbs={[{ name: "Diensten", path: "/diensten" }]}
      >
        <nav aria-label="Diensten op deze pagina">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`#${service.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-line transition hover:text-turquoise-700 hover:ring-turquoise-300"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-white">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-titel`}
            className={cn("py-20 sm:py-24", index % 2 === 1 && "bg-mist")}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <IconBadge icon={service.icon} size="lg" />
                    <p className="text-sm font-semibold tracking-wide text-turquoise-700 uppercase">
                      Dienst {index + 1} van {services.length}
                    </p>
                  </div>
                  <h2 id={`${service.slug}-titel`} className="mt-6 text-3xl font-bold sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{service.intro}</p>

                  <h3 className="mt-10 text-lg font-bold">Wat dit u oplevert</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {service.slug === "it-beheer" && (
                    <p className="mt-8">
                      <ArrowLink href="/it-beheer">Lees alles over IT-beheer en de pakketten</ArrowLink>
                    </p>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-card bg-white p-7 shadow-card ring-1 ring-line sm:p-8 lg:sticky lg:top-28">
                    <h3 className="text-lg font-bold">Wat we voor u doen</h3>
                    <CheckList items={service.includes} className="mt-5 text-[0.9375rem]" />

                    <div className="mt-7 border-t border-line pt-6">
                      <p className="text-sm font-semibold text-navy-900">Technologie</p>
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Gebruikte technologie">
                        {service.technologies.map((tech) => (
                          <li key={tech} className="rounded-full bg-mist px-3 py-1 text-sm text-navy-800 ring-1 ring-line">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex gap-3 rounded-2xl bg-turquoise-50 p-4 text-[0.9375rem] text-navy-800">
                      <Target aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-700" />
                      <p>
                        <span className="font-semibold">Geschikt voor: </span>
                        {service.idealFor}
                      </p>
                    </div>

                    <ButtonLink href={`/contact?dienst=${service.slug}`} className="mt-7 w-full" withArrow>
                      {service.cta}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section aria-label="Toelichting" className="border-t border-line bg-white py-10">
        <Container>
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Kozbica IT is een onafhankelijke IT-dienstverlener. Genoemde productnamen zoals Microsoft 365, Microsoft
            Entra ID, Microsoft Intune, Microsoft Defender en Microsoft Azure zijn handelsmerken van hun respectieve
            eigenaren.
          </p>
        </Container>
      </section>

      <CtaBanner
        title="Welke dienst past bij uw bedrijf?"
        text="Twijfelt u waar u moet beginnen? In een gratis kennismaking kijken we samen naar uw huidige IT en wat de meeste waarde oplevert."
      />
      <JsonLd data={servicesSchema(services, "/diensten")} />
    </>
  );
}
