import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function CheckList({
  items,
  tone = "light",
  className,
  dense,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
  dense?: boolean;
}) {
  return (
    <ul className={cn(dense ? "space-y-2" : "space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark" ? "bg-turquoise-400/20 text-turquoise-300" : "bg-turquoise-100 text-turquoise-700",
            )}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className={tone === "dark" ? "text-white/85" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
