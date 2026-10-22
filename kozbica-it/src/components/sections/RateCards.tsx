import { cn } from "@/lib/cn";
import { rates } from "@/content/pricing";

export function RateCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {rates.map((rate) => (
        <li
          key={rate.name}
          className={cn(
            "flex flex-col rounded-card p-8",
            rate.highlighted
              ? "bg-navy-900 text-white shadow-[0_30px_60px_-30px_rgb(18_38_54/0.7)] ring-1 ring-navy-700"
              : "bg-white shadow-card ring-1 ring-line",
          )}
        >
          <Heading className={cn("text-lg font-bold", rate.highlighted && "text-white")}>{rate.name}</Heading>
          <p className="mt-5 flex items-baseline gap-2">
            <span className={cn("font-display text-4xl font-extrabold", rate.highlighted ? "text-white" : "text-navy-900")}>
              {rate.price}
            </span>
            <span className={rate.highlighted ? "text-white/70" : "text-muted"}>{rate.unit}</span>
          </p>
          <p className={cn("mt-4 flex-1 leading-relaxed", rate.highlighted ? "text-white/75" : "text-muted")}>
            {rate.description}
          </p>
          <p className={cn("mt-6 text-sm", rate.highlighted ? "text-white/60" : "text-muted")}>Exclusief btw</p>
        </li>
      ))}
    </ul>
  );
}
