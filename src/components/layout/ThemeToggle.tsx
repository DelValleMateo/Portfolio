"use client";

import { Icon } from "@/components/ui/Icon";

/**
 * Alterna entre oscuro y claro. El tema vive en <html data-theme> y se guarda
 * en localStorage ("theme"). El script de layout.tsx lo aplica antes de pintar
 * para que no haya destello al cargar.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* modo privado o storage bloqueado: el cambio vale para esta visita */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo oscuro y claro"
      className="inline-grid size-10 place-items-center rounded-full text-ink inset-ring-1 inset-ring-line-control transition-shadow duration-150 hover:inset-ring-ink focus-ring"
    >
      <Icon name="theme" />
    </button>
  );
}
