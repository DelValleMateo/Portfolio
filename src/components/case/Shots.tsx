import type { CSSProperties } from "react";
import Image from "next/image";
import type { Shot } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { SHOW_PENDING } from "@/components/ui/Pending";

/**
 * Capturas visibles: en desarrollo se ven todas (con placeholder si falta la
 * imagen); en producción, solo las que ya tienen `src`.
 */
export function visibleShots(items: Shot[]): Shot[] {
  return items.filter((shot) => shot.src || SHOW_PENDING);
}

const pad = (n: number) => String(n).padStart(2, "0");

function ShotImage({
  shot,
  index,
  size,
  sizes,
  className,
}: {
  shot: Shot;
  index: number;
  size: string;
  sizes: string;
  className?: string;
}) {
  if (shot.src) {
    return (
      <Image
        src={shot.src}
        alt={shot.alt ?? shot.caption}
        fill
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return (
    <div className="shot-ph">
      <span className="font-mono text-[10px] leading-[14px] text-ink-3">
        CAPTURA {pad(index + 1)}
      </span>
      <span className="text-[14px] leading-[1.35] font-semibold text-ink max-md:text-[12px]">
        {shot.title}
      </span>
      <span className="font-mono text-[10px] leading-[14px] text-ink-3">{size}</span>
    </div>
  );
}

const captionClass =
  "flex gap-2 font-mono text-[12px] leading-4 text-ink-2 [&>b]:font-medium [&>b]:text-ink-3";

/** Ancho máximo de cada celular: con 4 capturas son un poco más angostos para que entren en 8 columnas. */
const phoneWidth = (count: number) => (count > 3 ? 168 : 180);

/**
 * Capturas de app móvil dentro de marcos de celular (proporción 390 × 844).
 * Desde 768 px son una grilla de una fila cuyas columnas se achican para entrar
 * en el ancho disponible; en mobile, una tira que se desliza con el dedo.
 *
 * Hover (solo desde 768 px y con mouse): el celular se agranda, sube un poco y
 * proyecta sombra; el borde y el número del pie se resaltan. Con
 * `prefers-reduced-motion` el cambio es instantáneo, sin transición. En mobile
 * no hay hover (la tira tiene overflow y recortaría el celular agrandado).
 */
export function PhoneShots({
  shots,
  swipeHint,
}: {
  shots: Shot[];
  /** Texto de ayuda en mobile; `{n}` se reemplaza por la cantidad de capturas. */
  swipeHint?: string;
}) {
  const grid = {
    "--n": shots.length,
    "--w": `${phoneWidth(shots.length)}px`,
  } as CSSProperties;

  return (
    <>
      <div
        style={grid}
        className="flex gap-3 max-md:-mx-5 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-5 max-md:pb-1 max-md:[scrollbar-width:none] max-md:scroll-px-5 max-md:[&::-webkit-scrollbar]:hidden md:grid md:grid-cols-[repeat(var(--n),minmax(0,var(--w)))] md:justify-end md:gap-6 max-xl:md:justify-start"
      >
        {shots.map((shot, i) => (
          <figure
            key={shot.caption}
            className="group/shot flex min-w-0 flex-col gap-3.5 odd:mt-14 max-md:w-[150px] max-md:flex-none max-md:snap-start max-md:odd:mt-0 md:hover:z-10 md:hover:-translate-y-1.5 md:hover:scale-110 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          >
            <div className="aspect-[390/844] rounded-device bg-surface p-1.5 inset-ring-1 inset-ring-line-strong motion-safe:transition-shadow motion-safe:duration-300 md:group-hover/shot:shadow-lift md:group-hover/shot:inset-ring-line-control">
              <div className="relative h-full overflow-hidden rounded-[calc(var(--radius-device)-6px)] bg-sunken">
                <i className="absolute top-[9px] left-1/2 z-[1] -ml-[29px] h-[17px] w-[58px] rounded-full bg-line-strong" />
                <ShotImage
                  shot={shot}
                  index={i}
                  size="1170 × 2532"
                  sizes="180px"
                />
              </div>
            </div>
            <figcaption
              className={cn(
                captionClass,
                "max-md:flex-col max-md:gap-0 max-md:text-[11px] motion-safe:transition-colors motion-safe:duration-300 md:group-hover/shot:text-ink",
              )}
            >
              <b className="motion-safe:transition-colors motion-safe:duration-300 md:group-hover/shot:text-accent">
                {pad(i + 1)}
              </b>
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {swipeHint && shots.length > 1 ? (
        <p className="mt-3.5 hidden items-center gap-2 font-mono text-[11px] leading-4 text-ink-3 max-md:flex">
          <Icon name="right" size={14} />
          {swipeHint.replace("{n}", String(shots.length))}
        </p>
      ) : null}
    </>
  );
}

/** Capturas web dentro de marcos de navegador; la segunda se superpone a la primera. */
export function BrowserShots({ shots }: { shots: Shot[] }) {
  return (
    <div className="flex flex-col">
      {shots.map((shot, i) => {
        const urlText = shot.url ?? (SHOW_PENDING && shot.urlTodo ? `[${shot.urlTodo}]` : null);
        return (
          <figure
            key={shot.caption}
            className={cn(
              "flex flex-col gap-3.5",
              i > 0 &&
                "relative z-[1] mt-[-72px] -mr-8 ml-auto w-[64%] max-md:mt-5 max-md:mr-0 max-md:w-full",
            )}
          >
            <div className="overflow-hidden rounded-md bg-surface shadow-[inset_0_0_0_1px_var(--line-strong),0_0_0_6px_var(--bg)]">
              <div className="flex h-[34px] items-center gap-3 border-b border-line-strong px-3">
                <span className="flex flex-none gap-1.5" aria-hidden="true">
                  <i className="size-[9px] rounded-full inset-ring-1 inset-ring-line-control" />
                  <i className="size-[9px] rounded-full inset-ring-1 inset-ring-line-control" />
                  <i className="size-[9px] rounded-full inset-ring-1 inset-ring-line-control" />
                </span>
                {urlText ? (
                  <span className="mx-auto h-5 max-w-[300px] flex-1 overflow-hidden rounded-xs bg-sunken px-2 text-center font-mono text-[10px] leading-5 text-ellipsis whitespace-nowrap text-ink-3">
                    {urlText}
                  </span>
                ) : null}
              </div>
              <div className="relative aspect-[19/10] bg-sunken">
                <ShotImage
                  shot={shot}
                  index={i}
                  size="1440 × 900"
                  sizes="(min-width: 1024px) 588px, 100vw"
                />
              </div>
            </div>
            <figcaption className={captionClass}>
              <b>{pad(i + 1)}</b>
              {shot.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
