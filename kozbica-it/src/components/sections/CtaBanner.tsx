import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta } from "@/content/navigation";

export function CtaBanner({
  title = "Klaar voor IT zonder zorgen?",
  text = "Vertel ons in een vrijblijvend gesprek hoe uw bedrijf werkt en waar u tegenaan loopt. Daarna weet u precies waar u staat en wat de mogelijke volgende stappen zijn.",
  secondary = { href: "/it-beheer", label: "Bekijk IT-beheer" },
}: {
  title?: string;
  text?: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section aria-labelledby="cta-titel" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-turquoise-500/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-turquoise-700/30 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 id="cta-titel" className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <ButtonLink href={primaryCta.href} size="lg" variant="onDark" withArrow>
                {primaryCta.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="onDarkOutline">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {["Vrijblijvend", "Persoonlijk contact", "Rotterdam en heel Nederland op afstand"].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-turquoise-300" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
