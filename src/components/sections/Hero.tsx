import { site } from "@/content/site";
import { OrbitDiagram } from "@/components/graphics/OrbitDiagram";
import { Telemetry } from "@/components/sections/Telemetry";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { TextLink } from "@/components/ui/TextLink";
import { labelClass } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

// Marcas de coordenadas sobre la grilla (cada celda de 120 px = 1′ de arco).
const LON_MARKS = [
  { left: 720, text: "58°17'O" },
  { left: 840, text: "58°16'O" },
  { left: 960, text: "58°15'O" },
  { left: 1080, text: "58°14'O" },
  { left: 1200, text: "58°13'O" },
];
const LAT_MARKS = [
  { top: 174, text: "32°27'S" },
  { top: 294, text: "32°28'S" },
  { top: 414, text: "32°29'S" },
  { top: 534, text: "32°30'S" },
  { top: 654, text: "32°31'S" },
];

/**
 * Hero. A partir de 1280 px: composición completa (órbitas a la derecha y panel
 * de telemetría flotando). Por debajo, el panel pasa a la columna y las órbitas
 * se recortan contra el borde, como en la versión mobile.
 */
export function Hero() {
  const { city, region, country } = site.location;

  return (
    <section id="top" className="relative overflow-hidden max-md:flex max-md:flex-col">
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-mono text-[10px] leading-none tracking-[.04em] text-ink-3 max-xl:hidden"
      >
        {LON_MARKS.map((mark) => (
          <span
            key={mark.text}
            className="absolute top-3 translate-x-1.5 whitespace-nowrap"
            style={{ left: mark.left }}
          >
            {mark.text}
          </span>
        ))}
        {LAT_MARKS.map((mark) => (
          <span
            key={mark.text}
            className="absolute right-3 translate-y-1.5 whitespace-nowrap"
            style={{ top: mark.top }}
          >
            {mark.text}
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-14 -right-32 size-[480px] max-md:relative max-md:order-2 max-md:mx-auto max-md:mb-14 max-md:aspect-square max-md:size-auto max-md:w-[calc(100%-40px)] max-md:max-w-[360px] max-md:inset-auto xl:top-[94px] xl:right-10 xl:size-[640px]"
      >
        <OrbitDiagram className="size-full overflow-visible" />
      </div>

      <div className="wrap relative z-[2] flex min-h-[828px] items-center pt-14 pb-18 max-xl:block max-xl:min-h-0 max-xl:pt-12 max-xl:pb-14">
        {/* data-orbit-avoid: las etiquetas de los satélites se atenúan al pasar cerca de este texto */}
        <div data-orbit-avoid className="w-full max-w-[690px]">
          <p
            className={cn(
              labelClass.muted,
              "mb-9 flex flex-wrap gap-x-3 gap-y-1.5 max-md:mb-7 max-md:flex-col max-md:gap-1",
            )}
          >
            <span>
              {city}, {region}
            </span>
            <span className="text-line-control max-md:hidden">/</span>
            <span>{country} · Remoto</span>
          </p>

          <h1
            aria-label={site.name}
            className="mb-8 text-display max-md:mb-6 max-md:text-display-m"
          >
            <ScrambleText text="Mateo" />
            <br />
            <ScrambleText text="del Valle" className="text-ink-3" />
          </h1>

          <p className="mb-4 text-[22px] leading-[1.3] font-semibold tracking-[-.01em] text-ink max-md:mb-3.5 max-md:text-[18px]">
            <span className="max-md:block">{site.role}</span>
            <span className="text-accent max-md:hidden"> · </span>
            <span className="max-md:block">{site.degree}</span>
          </p>

          <p className="mb-10 max-w-[590px] text-lead text-ink-2 max-md:mb-8 max-md:text-lead-m">
            {site.value}
          </p>

          <div className="mb-8 flex gap-3 max-md:mb-7 max-md:flex-col max-md:gap-2.5">
            <Button href="#proyectos" className="max-md:w-full">
              Ver proyectos <Icon name="down" />
            </Button>
            <Button href="#contacto" variant="secondary" className="max-md:w-full">
              Contacto
            </Button>
          </div>

          <ul className="flex gap-7">
            <li>
              <TextLink href={site.links.github}>GitHub</TextLink>
            </li>
            <li>
              <TextLink href={site.links.linkedin}>LinkedIn</TextLink>
            </li>
          </ul>
        </div>

        <Telemetry className="z-[2] max-xl:mt-10 xl:absolute xl:right-0 xl:bottom-14" />
      </div>
    </section>
  );
}
