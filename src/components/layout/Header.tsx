"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { labelClass } from "@/components/ui/Text";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/** Navegación fija arriba. Enciende el ítem de la sección que está en pantalla. */
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Sección visible → ítem activo del menú.
  useEffect(() => {
    const targets = Object.keys(site.navForSection)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(site.navForSection[entry.target.id] ?? null);
          }
        }
      },
      // Franja fina en el medio de la pantalla: gana la sección que la cruza.
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Menú mobile: se cierra con Escape y al pasar a desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="wrap flex h-18 items-center justify-between max-md:h-15">
        <a
          href="#top"
          className="rounded-xs text-[16px] font-semibold tracking-[-.01em] focus-ring"
        >
          {site.name}
        </a>

        <div className="flex items-center gap-8">
          <nav aria-label="Secciones" className="flex gap-8 text-[15px] max-md:hidden">
            {site.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "rounded-xs transition-colors duration-150 hover:text-ink focus-ring",
                  active === item.id ? "text-ink" : "text-ink-2",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((value) => !value)}
              className="hidden h-10 items-center gap-2 rounded-sm px-3.5 font-mono text-label leading-none uppercase text-ink inset-ring-1 inset-ring-line-control focus-ring max-md:inline-flex"
            >
              <Icon name={open ? "close" : "menu"} />
              <span>Menú</span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          aria-label="Menú"
          className="absolute inset-x-0 top-full border-b border-line bg-bg md:hidden"
        >
          <ul className="wrap pb-2">
            {site.nav.map((item, index) => (
              <li key={item.id} className="border-t border-line first:border-t-0">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="flex items-baseline gap-4 rounded-xs py-4 text-[18px] font-medium text-ink focus-ring"
                >
                  <span className={labelClass.muted}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
