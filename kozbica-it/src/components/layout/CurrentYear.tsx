"use client";

import { useEffect, useState } from "react";

/**
 * Toont het huidige jaar. In de statische HTML staat het bouwjaar; in de
 * browser wordt dit direct bijgewerkt naar het actuele jaar.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return <>{year}</>;
}
