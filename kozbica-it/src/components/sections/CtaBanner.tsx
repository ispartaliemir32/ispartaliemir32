import { Check } from "lucide-react";
import { ContactActions } from "@/components/ui/ContactActions";
import { Container } from "@/components/ui/Container";

export function CtaBanner({
  title = "Een vraag over je IT?",
  text = "Stuur een e-mail of bel me. Ik reageer binnen 1 werkdag en leg alles uit in gewone taal.",
  subject = "Vraag via kozbica.nl",
}: {
  title?: string;
  text?: string;
  subject?: string;
}) {
  return (
    <section aria-labelledby="cta-titel" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-turquoise-500/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-turquoise-700/30 blur-3xl" />

          <h2 id="cta-titel" className="max-w-2xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p>
          <ContactActions tone="dark" subject={subject} className="mt-8" />
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {["Reactie binnen 1 werkdag", "Duidelijke tarieven", "Rotterdam en omgeving"].map((item) => (
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
