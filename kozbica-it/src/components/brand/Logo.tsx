import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "./LogoMark";

type LogoProps = {
  /** "onLight" voor lichte achtergronden (header), "onDark" voor donkere (footer). */
  tone?: "onLight" | "onDark";
  className?: string;
  priority?: boolean;
};

export function Logo({ tone = "onLight", className, priority }: LogoProps) {
  const logo = site.logo;

  if (logo.type === "image") {
    return (
      <Image
        src={tone === "onDark" ? logo.srcOnDark : logo.src}
        alt={site.name}
        width={logo.width}
        height={logo.height}
        priority={priority}
        className={cn("h-10 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-auto shrink-0" />
      <span
        className={cn(
          "font-display text-[1.3rem] leading-none font-extrabold tracking-tight",
          tone === "onDark" ? "text-white" : "text-navy-900",
        )}
      >
        Kozbica
        <span className={tone === "onDark" ? "text-turquoise-400" : "text-turquoise-600"}> IT</span>
      </span>
    </span>
  );
}
