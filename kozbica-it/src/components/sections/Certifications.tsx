import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import azure from "@/assets/certs/microsoft-azure.webp";
import entra from "@/assets/certs/microsoft-entra-id.webp";

const certs = [
  { name: "Microsoft Azure", logo: azure },
  { name: "Microsoft Entra ID", logo: entra },
];

/** Compacte strook onder de hero met de Microsoft-certificeringen. */
export function Certifications() {
  return (
    <section aria-labelledby="certificeringen-titel" className="border-y border-line bg-white">
      <Container className="py-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 id="certificeringen-titel" className="flex items-center gap-2 text-lg font-bold">
              <BadgeCheck aria-hidden="true" className="size-5 text-turquoise-600" />
              Microsoft-gecertificeerd
            </h2>
            <p className="mt-1 text-sm text-muted">
              Persoonlijk gecertificeerd, zodat je weet dat je IT in goede handen is.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {certs.map((cert) => (
              <li
                key={cert.name}
                className="flex items-center gap-4 rounded-2xl bg-mist px-5 py-3.5 ring-1 ring-line"
              >
                <Image src={cert.logo} alt="" width={44} height={44} className="size-11 shrink-0" />
                <p className="flex items-center gap-2 font-semibold text-navy-900">
                  {cert.name} gecertificeerd
                  <span
                    aria-hidden="true"
                    className="inline-flex size-5 items-center justify-center rounded-full bg-turquoise-600 text-white"
                  >
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m2.5 6.2 2.3 2.3 4.7-5" />
                    </svg>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
