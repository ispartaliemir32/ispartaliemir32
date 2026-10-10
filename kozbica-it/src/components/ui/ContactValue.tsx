import { isPlaceholder } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Toont een e-mailadres of telefoonnummer. Zolang de waarde een [PLACEHOLDER]
 * is, wordt die als platte tekst getoond (geen kapotte mailto:/tel:-link).
 */
export function ContactValue({
  type,
  value,
  className,
}: {
  type: "email" | "phone";
  value: string;
  className?: string;
}) {
  if (isPlaceholder(value)) {
    return <span className={cn("font-mono text-[0.95em]", className)}>{value}</span>;
  }
  const href = type === "email" ? `mailto:${value}` : `tel:${value.replace(/[^\d+]/g, "")}`;
  return (
    <a href={href} className={cn("underline-offset-4 hover:underline", className)}>
      {value}
    </a>
  );
}
