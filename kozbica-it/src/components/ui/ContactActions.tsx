import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { mailHref, phoneHref, site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Twee grote knoppen: mailen en bellen. Werken met één tik op een telefoon. */
export function ContactActions({
  tone = "light",
  subject = "Vraag via kozbica.nl",
  className,
}: {
  tone?: "light" | "dark";
  subject?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <ButtonLink href={mailHref(subject)} size="lg" variant={tone === "dark" ? "onDark" : "primary"}>
        <Mail aria-hidden="true" className="size-5" />
        Stuur een e-mail
      </ButtonLink>
      <ButtonLink href={phoneHref} size="lg" variant={tone === "dark" ? "onDarkOutline" : "secondary"}>
        <Phone aria-hidden="true" className="size-5" />
        Bel {site.contact.phone}
      </ButtonLink>
    </div>
  );
}
