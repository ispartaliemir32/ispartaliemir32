"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-navy-800 ring-1 ring-line-strong transition hover:text-turquoise-700 hover:ring-turquoise-500"
    >
      <Printer aria-hidden="true" className="size-4" />
      Afdrukken of opslaan als pdf
    </button>
  );
}
