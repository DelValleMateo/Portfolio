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
        "w-[336px] rounded-lg bg-surface font-mono inset-ring-1 inset-ring-line-strong max-md:w-auto",
        className,
      )}
    >
      <div className="flex h-11 items-center justify-between border-b border-line px-5">
        <span className={labelClass.muted}>Telemetría</span>
        <span className="inline-flex items-center gap-2 text-label uppercase text-accent">
          <i className="size-[7px] rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_28%,transparent)] motion-safe:animate-pulse" />
          En línea
        </span>
      </div>
      <dl className="px-5 pt-2 pb-3.5">
        {rows.map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-[64px_1fr] gap-x-3 py-[5px] text-[12px] leading-[18px]"
          >
            <dt className="text-ink-3">{key}</dt>
            <dd className={key === "HORA" ? "text-accent" : "text-ink"}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
