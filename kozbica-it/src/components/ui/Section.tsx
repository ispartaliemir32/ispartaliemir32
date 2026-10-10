import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "relative overflow-hidden bg-navy-900 text-white",
};

export function Section({
  id,
  tone = "white",
  className,
  containerClassName,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase",
        tone === "dark" ? "text-turquoise-300" : "text-turquoise-700",
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "dark" ? "bg-turquoise-400" : "bg-turquoise-500")} />
      {children}
    </p>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-white/75" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}
