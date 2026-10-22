import { Hero } from "@/components/home/Hero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { RatesPreview } from "@/components/sections/RatesPreview";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { homeFaq } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Veilige IT, zonder gedoe | IT-ondersteuning in Rotterdam",
  description:
    "Persoonlijke IT-ondersteuning voor kleine bedrijven in Rotterdam en omgeving: Microsoft 365, Entra ID en Intune, applicatiebeheer, IT-advies en AI-ondersteuning. Duidelijke tarieven, reactie binnen 1 werkdag.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <RatesPreview />
      <Faq items={homeFaq} />
      <CtaBanner />
    </>
  );
}
