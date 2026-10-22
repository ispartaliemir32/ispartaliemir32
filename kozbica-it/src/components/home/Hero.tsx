import { Clock, Receipt, UserRound } from "lucide-react";
import { ContactActions } from "@/components/ui/ContactActions";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./HeroVisual";

const indicators = [
  { icon: UserRound, text: "Persoonlijk contact, geen callcenter" },
  { icon: Clock, text: "Reactie binnen 1 werkdag" },
  { icon: Receipt, text: "Duidelijke tarieven, per kwartier" },
];

export function Hero() {
  return (
    <section className="relative isolate -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="hero-titel">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-b from-mist via-white to-white" />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_20%,black_25%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute -top-32 right-[-10rem] -z-10 size-[40rem] rounded-full bg-turquoise-300/25 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/2 -left-48 -z-10 size-[28rem] rounded-full bg-navy-500/10 blur-3xl" />

      <Container className="grid items-center gap-16 pt-12 pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800 shadow-card ring-1 ring-line">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-turquoise-500" />
            </span>
            IT-ondersteuning in Rotterdam en omgeving
          </p>

          <h1 id="hero-titel" className="mt-6 text-[2.75rem] leading-[1.04] font-extrabold sm:text-6xl lg:text-[4.1rem]">
            Veilige IT,{" "}
            <span className="block bg-linear-to-r from-turquoise-700 to-turquoise-500 bg-clip-text pb-[0.12em] text-transparent">
              zonder gedoe.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Persoonlijke IT-ondersteuning voor kleine bedrijven. Ik help met Microsoft 365, Entra ID en Intune, met
            heldere uitleg zonder vakjargon.
          </p>

          <ContactActions className="mt-9" subject="Vraag via kozbica.nl" />

          <ul className="mt-10 grid gap-3 text-[0.9375rem] text-navy-800 sm:grid-cols-1">
            {indicators.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-turquoise-700 shadow-card ring-1 ring-line">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 xl:col-span-6 xl:pl-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
