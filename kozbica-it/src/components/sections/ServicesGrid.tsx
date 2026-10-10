import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section id="diensten" tone="white" labelledBy="diensten-titel">
      <SectionHeader
        id="diensten-titel"
        eyebrow="Onze diensten"
        title="Alles voor een IT-omgeving die gewoon werkt"
        intro="Van dagelijks beheer tot beveiliging en advies: wij nemen uw IT uit handen, in begrijpelijke taal en met oog voor wat uw bedrijf echt nodig heeft."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <li key={service.slug} className="group relative flex flex-col rounded-card bg-white p-7 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-turquoise-200 motion-reduce:hover:translate-y-0">
            <IconBadge icon={service.icon} />
            <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{service.summary}</p>
            <Link
              href={`/diensten#${service.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 rounded font-semibold text-turquoise-700 after:absolute after:inset-0 after:rounded-card hover:text-navy-900"
            >
              Lees meer<span className="sr-only"> over {service.title}</span>
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
        <li className="relative flex flex-col justify-between overflow-hidden rounded-card bg-navy-900 p-7 text-white lg:col-span-2 xl:col-span-1">
          <div aria-hidden="true" className="absolute -right-16 -bottom-16 size-56 rounded-full bg-turquoise-500/25 blur-2xl" />
          <div className="relative">
            <IconBadge icon={MessagesSquare} tone="dark" />
            <h3 className="mt-6 text-lg font-bold text-white">Niet zeker wat u nodig heeft?</h3>
            <p className="mt-3 leading-relaxed text-white/75">
              Geen probleem. In een vrijblijvend gesprek brengen we samen in kaart waar uw IT staat en wat de beste
              volgende stap is.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative mt-6 inline-flex w-fit items-center gap-1.5 rounded font-semibold text-turquoise-300 hover:text-white"
          >
            Plan een kennismaking
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </li>
      </ul>
    </Section>
  );
}
