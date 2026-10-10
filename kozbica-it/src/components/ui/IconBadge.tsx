import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function IconBadge({
  icon: Icon,
  tone = "light",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = { sm: "size-10 rounded-xl", md: "size-12 rounded-2xl", lg: "size-14 rounded-2xl" }[size];
  const icon = { sm: "size-5", md: "size-6", lg: "size-7" }[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        box,
        tone === "dark"
          ? "bg-white/8 text-turquoise-300 ring-1 ring-white/12"
          : "bg-gradient-to-br from-turquoise-50 to-turquoise-100 text-turquoise-700 ring-1 ring-turquoise-200/70",
        className,
      )}
    >
      <Icon className={icon} strokeWidth={1.75} />
    </span>
  );
}
