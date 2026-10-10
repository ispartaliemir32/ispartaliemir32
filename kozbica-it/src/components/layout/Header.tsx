"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, primaryCta } from "@/content/navigation";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Schaduw en achtergrond zodra er gescrold wordt.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobiel menu: Escape sluit, bij openen focus op de eerste link,
  // en sluiten zodra het scherm breed genoeg is voor de desktopnavigatie.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
      cancelAnimationFrame(frame);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open
          ? "border-line/80 bg-white/90 shadow-header backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white/0",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="-m-1 rounded-lg p-1" aria-label="Kozbica IT, naar de homepage" onClick={() => close(false)}>
          <Logo priority />
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
                      active ? "text-navy-900" : "text-muted hover:text-navy-900",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-turquoise-500 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={primaryCta.href} withArrow>
              {primaryCta.shortLabel}
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 ring-1 ring-line-strong transition hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Menu sluiten" : "Menu openen"}</span>
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobiel-menu"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobiele navigatie">
            <ul className="divide-y divide-line">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close(false)}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-semibold",
                        active ? "text-turquoise-700" : "text-navy-900",
                      )}
                    >
                      {item.label}
                      {active && <span className="size-2 rounded-full bg-turquoise-500" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-4 pb-2">
            <ButtonLink href={primaryCta.href} size="lg" className="w-full" withArrow onClick={() => close(false)}>
              {primaryCta.label}
            </ButtonLink>
            <p className="mt-3 text-center text-sm text-muted">Vrijblijvend · Rotterdam en heel Nederland op afstand</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
