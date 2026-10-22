import { Mail, Phone } from "lucide-react";
import { mailHref, phoneHref } from "@/config/site";

/** Vaste balk onderaan op telefoons: altijd één tik van mailen of bellen. */
export function MobileContactBar() {
  return (
    <nav aria-label="Snel contact" className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-2.5 shadow-[0_-8px_24px_-12px_rgb(18_38_54/0.25)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={phoneHref}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white font-semibold text-navy-900 ring-1 ring-line-strong"
        >
          <Phone aria-hidden="true" className="size-4.5" />
          Bel mij
        </a>
        <a
          href={mailHref("Vraag via kozbica.nl")}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-turquoise-600 font-semibold text-white"
        >
          <Mail aria-hidden="true" className="size-4.5" />
          Stuur e-mail
        </a>
      </div>
    </nav>
  );
}
