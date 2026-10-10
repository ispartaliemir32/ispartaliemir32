import { Check, Cloud, DatabaseBackup, Fingerprint, Headset, Laptop, Mails, ShieldCheck, UserPlus, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * Decoratieve illustratie van een beheerde IT-omgeving: één centraal
 * aanspreekpunt (schild) verbonden met de onderdelen die Kozbica IT beheert.
 * Bewust zonder cijfers, scores of klantstatistieken.
 */

type Node = { label: string; icon: LucideIcon; x: number; y: number; labelAbove?: boolean };

const CENTER = { x: 240, y: 200 };

// Posities in het SVG-assenstelsel (480 x 400). Linksonder blijft vrij voor het zwevende kaartje.
const nodes: Node[] = [
  { label: "Microsoft 365", icon: Mails, x: 240, y: 68, labelAbove: true },
  { label: "Cloud & Azure", icon: Cloud, x: 388, y: 122 },
  { label: "Beveiliging", icon: ShieldCheck, x: 402, y: 222 },
  { label: "Back-up", icon: DatabaseBackup, x: 240, y: 326 },
  { label: "Werkplekken", icon: Laptop, x: 78, y: 222 },
  { label: "Identiteit", icon: Fingerprint, x: 92, y: 122 },
];

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl select-none lg:max-w-none">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-turquoise-200/50 via-transparent to-navy-500/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_80px_-32px_rgb(16_35_52/0.55)] ring-1 ring-navy-700">
        <div className="bg-grid-light absolute inset-0" />
        <div className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-turquoise-500/20 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-xs font-medium tracking-wide text-white/70">Uw IT-omgeving</span>
          <span className="w-[42px]" />
        </div>

        <svg viewBox="0 0 480 400" className="relative block h-auto w-full" role="presentation">
          <ellipse cx={CENTER.x} cy={CENTER.y} rx="150" ry="118" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="1" />
          <ellipse cx={CENTER.x} cy={CENTER.y} rx="92" ry="74" fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth="1" />

          {nodes.map((node) => (
            <g key={node.label}>
              <line x1={CENTER.x} y1={CENTER.y} x2={node.x} y2={node.y} stroke="rgb(47 181 186 / 0.25)" strokeWidth="1.5" />
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={node.x}
                y2={node.y}
                stroke="#2FB5BA"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="2 12"
                className="animate-dash"
              />
            </g>
          ))}

          <circle cx={CENTER.x} cy={CENTER.y} r="58" fill="rgb(7 159 165 / 0.10)" className="animate-pulse-soft origin-center [transform-box:fill-box]" />
          <circle cx={CENTER.x} cy={CENTER.y} r="44" fill="#163049" stroke="rgb(47 181 186 / 0.55)" strokeWidth="1.5" />
          <LogoMark x={CENTER.x - 19} y={CENTER.y - 22} width="38" height="44" />

          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <g key={`${node.label}-node`}>
                <rect x={node.x - 26} y={node.y - 26} width="52" height="52" rx="15" fill="#163049" stroke="rgb(255 255 255 / 0.12)" />
                <Icon x={node.x - 12} y={node.y - 12} width="24" height="24" color="#6FCDD0" strokeWidth={1.75} />
                <text
                  x={node.x}
                  y={node.labelAbove ? node.y - 38 : node.y + 48}
                  textAnchor="middle"
                  fill="rgb(255 255 255 / 0.82)"
                  fontSize="15"
                  fontWeight="600"
                  fontFamily="var(--font-manrope), system-ui, sans-serif"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Zwevende kaartjes (vanaf tabletbreedte) */}
      <div className="absolute -bottom-10 -left-6 hidden w-60 animate-float rounded-2xl bg-white p-4 shadow-card-hover ring-1 ring-line sm:block xl:-left-10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-turquoise-50 text-turquoise-700">
            <UserPlus className="size-4" />
          </span>
          <p className="text-sm font-semibold text-navy-900">Nieuwe medewerker</p>
        </div>
        <ul className="mt-3 space-y-2 text-[0.8125rem] text-muted">
          {["Account aangemaakt", "Laptop automatisch ingericht", "MFA ingesteld"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-700">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -top-6 -right-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card-hover ring-1 ring-line [animation-delay:1.5s] sm:flex animate-float xl:-right-8">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-navy-900 text-turquoise-300">
          <Headset className="size-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">Vast aanspreekpunt</p>
          <p className="text-xs text-muted">Persoonlijk en direct</p>
        </div>
      </div>
    </div>
  );
}
