import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section id="diensten" tone="white" labelledBy="diensten-titel">
      <SectionHeader
        id="diensten-titel"
        eyebrow="Diensten"
        title="Waar ik je mee help"
        intro="Drie diensten, helder omschreven. Zo weet je precies wat je van me kunt verwachten."
      />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.slug}
            className="group relative flex flex-col rounded-card bg-white p-7 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-turquoise-200 motion-reduce:hover:translate-y-0"
          >
            <IconBadge icon={service.icon} />
            <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{service.summary}</p>
            <p className="mt-5 text-sm font-semibold text-navy-900">{service.rate} (excl. btw)</p>
            <Link
              href={`/diensten/#${service.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded font-semibold text-turquoise-700 after:absolute after:inset-0 after:rounded-card hover:text-navy-900"
            >
              Lees meer<span className="sr-only"> over {service.title}</span>
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
