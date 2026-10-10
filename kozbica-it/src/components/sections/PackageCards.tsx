import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { packages } from "@/content/packages";
import { cn } from "@/lib/cn";

export function PackageCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
      {packages.map((pkg) => (
        <li
          key={pkg.id}
          className={cn(
            "relative flex flex-col rounded-card p-8",
            pkg.highlighted
              ? "bg-navy-900 text-white shadow-[0_30px_60px_-30px_rgb(16_35_52/0.7)] ring-1 ring-navy-700 lg:-my-3 lg:py-11"
              : "bg-white shadow-card ring-1 ring-line",
          )}
        >
          {pkg.highlighted && (
            <p className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full bg-turquoise-500 px-3 py-1 text-xs font-bold text-navy-950">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Ons advies voor de meeste teams
            </p>
          )}
          <Heading className={cn("text-2xl font-extrabold", pkg.highlighted && "text-white")}>{pkg.name}</Heading>
          <p className={cn("mt-2 font-medium", pkg.highlighted ? "text-turquoise-300" : "text-turquoise-700")}>
            {pkg.tagline}
          </p>
          <p className={cn("mt-4 leading-relaxed", pkg.highlighted ? "text-white/75" : "text-muted")}>{pkg.description}</p>

          <div className={cn("mt-6 border-t pt-6", pkg.highlighted ? "border-white/10" : "border-line")}>
            <p className={cn("font-display text-xl font-bold", pkg.highlighted ? "text-white" : "text-navy-900")}>
              Prijs op aanvraag
            </p>
            <p className={cn("mt-1 text-sm", pkg.highlighted ? "text-white/60" : "text-muted")}>
              Op basis van gebruikers, apparaten en wensen
            </p>
          </div>

          <CheckList items={pkg.features} tone={pkg.highlighted ? "dark" : "light"} className="mt-6 flex-1 text-[0.9375rem]" dense />

          <ButtonLink
            href={`/contact?dienst=it-beheer&pakket=${pkg.id}`}
            variant={pkg.highlighted ? "primary" : "secondary"}
            className="mt-8 w-full"
            withArrow
          >
            Vraag een voorstel aan<span className="sr-only"> voor {pkg.name}</span>
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
