import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import logoOnDark from "@/assets/brand/kozbica-it-logo-wit.png";
import logoOnLight from "@/assets/brand/kozbica-it-logo.png";

/**
 * Officieel Kozbica IT-logo. De bestanden worden gegenereerd uit
 * brand/kozbica-it-logo-origineel.png met `npm run brand`.
 */
export function Logo({
  tone = "onLight",
  className,
  priority,
}: {
  /** "onLight" voor lichte achtergronden (header), "onDark" voor donkere (footer). */
  tone?: "onLight" | "onDark";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "onDark" ? logoOnDark : logoOnLight}
      alt={site.name}
      priority={priority}
      className={cn("h-10 w-auto", className)}
    />
  );
}
