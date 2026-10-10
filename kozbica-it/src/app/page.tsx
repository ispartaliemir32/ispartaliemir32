import { Hero } from "@/components/home/Hero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { Process } from "@/components/sections/Process";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { homeFaq } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "IT-beheer voor het MKB in Rotterdam | Kozbica IT",
  description:
    "Kozbica IT is uw externe IT-partner uit Rotterdam: IT-beheer, Microsoft 365, cloud en cybersecurity voor MKB-bedrijven met 5–30 medewerkers. Plan een gratis kennismaking.",
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
      <PackagesPreview />
      <SecuritySection />
      <Faq items={homeFaq} />
      <CtaBanner />
    </>
  );
}
