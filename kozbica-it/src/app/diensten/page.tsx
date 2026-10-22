import Link from "next/link";
import { CheckCircle2, Target } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { mailHref } from "@/config/site";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { servicesSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Diensten: IT-ondersteuning, applicatiebeheer, IT-advies en AI",
  description:
    "IT-ondersteuning met Microsoft 365, Entra ID en Intune, applicatiebeheer, vrijblijvend IT-advies en AI-ondersteuning voor kleine bedrijven in Rotterdam en omgeving.",
  path: "/diensten/",
});

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title="Waar ik je mee help"
        intro="Vier diensten, in gewone taal uitgelegd. Per dienst lees je wat ik doe, wat het je oplevert en wat het kost."
        crumbs={[{ name: "Diensten", path: "/diensten/" }]}
      >
        <nav aria-label="Diensten op deze pagina">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`#${service.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-medium text-navy-800 ring-1 ring-line transition hover:text-turquoise-700 hover:ring-turquoise-300"
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
            className={cn("py-16 sm:py-24", index % 2 === 1 && "bg-mist")}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <IconBadge icon={service.icon} size="lg" />
                  <h2 id={`${service.slug}-titel`} className="mt-6 text-3xl font-bold sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{service.intro}</p>

                  <h3 className="mt-9 text-lg font-bold">Wat dit je oplevert</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-card bg-white p-7 shadow-card ring-1 ring-line sm:p-8 lg:sticky lg:top-28">
                    <h3 className="text-lg font-bold">Wat ik voor je doe</h3>
                    <CheckList items={service.includes} className="mt-5 text-[0.9375rem]" />

                    <div className="mt-6 flex gap-3 rounded-2xl bg-turquoise-50 p-4 text-[0.9375rem] text-navy-800">
                      <Target aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-700" />
                      <p>
                        <span className="font-semibold">Geschikt voor: </span>
                        {service.idealFor}
                      </p>
                    </div>

                    <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                      Tarief: <span className="font-semibold text-navy-900">{service.rate}</span> (excl. btw), per
                      kwartier afgerekend.{" "}
                      <Link href="/tarieven/" className="font-semibold text-turquoise-700 underline underline-offset-2">
                        Alle tarieven
                      </Link>
                    </p>

                    <ButtonLink href={mailHref(service.cta)} className="mt-6 w-full">
                      {service.cta}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CtaBanner
        title="Weet je niet welke dienst past?"
        text="Geen probleem. Beschrijf kort je situatie, dan laat ik binnen 1 werkdag weten hoe ik kan helpen."
        subject="Welke dienst past bij mij?"
      />
      <JsonLd data={servicesSchema(services, "/diensten/")} />
    </>
  );
}
