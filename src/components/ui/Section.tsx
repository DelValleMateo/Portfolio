import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Text";

/** Sección de la página: filete arriba y 128 px de aire (80 px en mobile). `continuation` la une con la anterior. */
export function Section({
  id,
  ariaLabel,
  continuation = false,
  children,
}: {
  id: string;
  ariaLabel?: string;
  continuation?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        continuation
          ? "pt-12 pb-32 max-md:pt-8 max-md:pb-20"
          : "border-t border-line py-32 max-md:py-20",
      )}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Encabezado de sección: índice + filete, título y bajada en una grilla de 12 columnas. */
export function SectionHeader({
  index,
  tag,
  title,
  lede,
}: {
  index: string;
  tag: string;
  title?: string;
  lede?: string;
}) {
  return (
    <header className="mb-22 grid grid-cols-12 items-end gap-x-6 gap-y-7 max-md:mb-12 max-md:grid-cols-1 max-md:gap-y-4">
      <div className="col-span-full flex items-center gap-4 max-md:mb-3">
        <Label tone="ink">{index}</Label>
        <span className="h-px flex-1 bg-line" />
        <Label>{tag}</Label>
      </div>
      {title ? (
        <h2 className="col-[1/span_7] text-h2 max-md:col-auto max-md:text-h2-m">
          {title}
        </h2>
      ) : null}
      {lede ? (
        <p className="col-[8/span_5] pb-1.5 text-body text-ink-2 max-md:col-auto max-md:text-body-m">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
