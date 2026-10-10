import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { Container } from "./Container";
import { Eyebrow } from "./Section";

type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Kruimelpad exclusief "Home"; de laatste is de huidige pagina. */
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-mist">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-32 -z-10 size-[34rem] rounded-full bg-turquoise-300/25 blur-3xl"
      />
      <Container className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-24">
        <nav aria-label="Kruimelpad" className="no-print">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {trail.map((crumb, i) => {
              const isLast = i === trail.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-navy-900">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="rounded hover:text-turquoise-700 hover:underline">
                        {crumb.name}
                      </Link>
                      <ChevronRight aria-hidden="true" className="size-3.5" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="mt-10 max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">{title}</h1>
          {intro && <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </section>
  );
}
