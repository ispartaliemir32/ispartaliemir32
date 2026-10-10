import Link from "next/link";
import type { ReactNode } from "react";
import { FileWarning, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/cn";
import { PrintButton } from "./PrintButton";

export type TocItem = { id: string; title: string };

/** Markeert een onderdeel dat juridische controle nodig heeft (alleen zichtbaar in conceptmodus). */
export function Review({ draft, children }: { draft: boolean; children?: ReactNode }) {
  if (!draft) return null;
  return (
    <span className="my-1 inline-flex flex-wrap items-center gap-1.5 rounded-lg bg-warning-50 px-2.5 py-1 align-middle text-sm font-medium text-warning-800 ring-1 ring-warning-200">
      <Scale aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="font-semibold">Juridisch controleren</span>
      {children && <span className="font-normal">· {children}</span>}
    </span>
  );
}

export function LegalDocument({
  title,
  intro,
  path,
  draft,
  draftText,
  lastUpdated,
  toc,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  draft: boolean;
  draftText: ReactNode;
  lastUpdated: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Juridisch" title={title} intro={intro} crumbs={[{ name: title, path }]}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{draft ? `Concept, laatst bijgewerkt: ${lastUpdated}` : `Laatst bijgewerkt: ${lastUpdated}`}</span>
          <PrintButton />
        </div>
      </PageHero>

      <section className="bg-white py-14 sm:py-16 lg:py-20" aria-label={title}>
        <Container>
          {draft && (
            <div
              role="note"
              className="mb-12 flex gap-4 rounded-card bg-warning-50 p-6 text-warning-800 ring-1 ring-warning-200 sm:p-7"
            >
              <FileWarning aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
              <div className="leading-relaxed">
                <p className="font-bold">Concept: nog niet juridisch getoetst</p>
                <div className="mt-1.5">{draftText}</div>
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-12">
            <nav aria-labelledby="inhoudsopgave" className="no-print lg:col-span-4 xl:col-span-3">
              <div className="rounded-card bg-mist p-6 ring-1 ring-line lg:sticky lg:top-28">
                <h2 id="inhoudsopgave" className="text-base font-bold">
                  Inhoudsopgave
                </h2>
                <ol className="mt-4 space-y-2 text-[0.9375rem]">
                  {toc.map((item, index) => (
                    <li key={item.id} className="flex gap-2">
                      <span className="w-5 shrink-0 text-muted tabular-nums">{index + 1}.</span>
                      <Link href={`#${item.id}`} className="rounded text-navy-800 hover:text-turquoise-700 hover:underline">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <article className={cn("prose-legal max-w-3xl lg:col-span-8 xl:col-span-9")}>{children}</article>
          </div>
        </Container>
      </section>
    </>
  );
}

