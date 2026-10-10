import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkOutline";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out " +
  "focus-visible:outline-3 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-turquoise-600 text-white shadow-[0_10px_24px_-12px_rgb(8_127_137/0.8)] hover:bg-turquoise-700 hover:shadow-[0_14px_30px_-12px_rgb(8_127_137/0.9)] active:translate-y-px",
  secondary:
    "bg-white text-navy-900 ring-1 ring-line-strong hover:ring-turquoise-500 hover:text-turquoise-700 active:translate-y-px",
  ghost: "text-navy-900 hover:text-turquoise-700",
  onDark: "bg-white text-navy-900 hover:bg-turquoise-50 active:translate-y-px",
  onDarkOutline: "text-white ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/60 active:translate-y-px",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
  lg: "min-h-12 px-6 py-3 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow,
  children,
  className,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  children,
  className,
  type = "button",
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

/** Tekstlink met pijl, bijvoorbeeld "Lees meer". */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded font-semibold text-turquoise-700 transition-colors hover:text-navy-900",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
