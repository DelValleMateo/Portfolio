"use client";

import { useEffect } from "react";

/**
 * Marca con `data-in` los elementos `[data-reveal]` cuando entran en pantalla.
 * El estado oculto y la transición viven en components.css y solo existen con
 * `prefers-reduced-motion: no-preference`; sin JavaScript, el `<noscript>` de
 * layout.tsx los deja visibles. Cada elemento se observa una sola vez.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"),
    );
    if (targets.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      // Aparece un poco antes de llegar al borde inferior para no mostrar huecos al scrollear.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
