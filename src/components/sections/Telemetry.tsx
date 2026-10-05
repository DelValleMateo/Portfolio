import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { BuenosAiresClock } from "@/components/layout/BuenosAiresClock";
import { labelClass } from "@/components/ui/Text";

/** Panel de "telemetría" del hero: dónde está, qué hora es y qué busca. */
export function Telemetry({ className }: { className?: string }) {
  const { lat, lon } = site.location;
  const rows: Array<[string, ReactNode]> = [
    ["POS", `${lat} ${lon}`],
    ["HORA", <BuenosAiresClock key="hora" />],
    ["BUSCA", site.telemetry.searching],
    ["MODO", site.telemetry.mode],
  ];

  return (
    <div
      role="group"
      aria-label="Telemetría"
      className={cn(
        "w-[336px] rounded-sm bg-surface font-mono inset-ring-1 inset-ring-line-strong max-md:w-auto",
        className,
      )}
    >
      <div className="flex h-10 items-center justify-between border-b border-line px-4">
        <span className={labelClass.muted}>Telemetría</span>
        <span className="inline-flex items-center gap-2 text-label uppercase text-ink-2">
          <i className="size-[7px] rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_28%,transparent)]" />
          En línea
        </span>
      </div>
      <dl className="px-4 pt-2 pb-3">
        {rows.map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-[64px_1fr] gap-x-3 py-[5px] text-[12px] leading-[18px]"
          >
            <dt className="text-ink-3">{key}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
