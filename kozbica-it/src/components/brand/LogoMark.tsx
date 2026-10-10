import type { SVGProps } from "react";

/**
 * TIJDELIJK schildsymbool in de merkkleuren, totdat het officiële logo is
 * aangeleverd (zie README > "Officieel logo plaatsen"). Bewust zonder
 * gradients/ID's, zodat het symbool meerdere keren op een pagina kan staan.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 56" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M24 2.75 43.25 9.4v16.1c0 12.9-8.1 22.7-19.25 27.5C12.85 48.2 4.75 38.4 4.75 25.5V9.4L24 2.75Z"
        fill="#102334"
        stroke="#079FA5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M24 8.6 38.4 13.6v11.9c0 9.6-5.9 17-14.4 20.8" stroke="#1E3F5C" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="14.6" y="16" width="4.8" height="24" rx="2.4" fill="#FFFFFF" />
      <path d="M21 27.6 31.2 17.4" stroke="#079FA5" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M22.6 29.4 31.2 38.6" stroke="#2FB5BA" strokeWidth="4.4" strokeLinecap="round" />
      <circle cx="32.4" cy="16.2" r="3.1" fill="#FFFFFF" />
      <circle cx="32.4" cy="39.8" r="3.1" fill="#FFFFFF" />
    </svg>
  );
}
