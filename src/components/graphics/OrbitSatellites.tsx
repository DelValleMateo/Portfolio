"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { onEllipse, ORBITS } from "./orbit-geometry";

/**
 * Los tres satélites del hero, girando alrededor de CDU.
 *
 * Cada satélite es un `<g>` con su punto, su guía y su etiqueta; lo único que
 * cambia por cuadro es el `transform` de ese grupo, así que la etiqueta lo
 * acompaña. Se actualiza el DOM directo (sin estado de React): no hay renders
 * por cuadro.
 *
 * - Uno de los tres está «encendido» (naranja). Tocar otro lo enciende y apaga
 *   el anterior. Es solo un énfasis visual: la información está en las
 *   secciones de abajo, por eso el diagrama sigue siendo `aria-hidden`.
 *   El toque no se resuelve con eventos del SVG: el copy del hero está por
 *   encima del diagrama y los taparía. En su lugar se escucha el clic en el
 *   hero y se compara con la posición actual de cada satélite.
 * - El primer render, en servidor y en cliente, deja a cada satélite en su
 *   posición inicial: sin JS, o con `prefers-reduced-motion`, el diagrama
 *   queda quieto, igual que el dibujo original.
 * - Se detiene cuando el diagrama sale de pantalla (y el navegador ya frena
 *   los cuadros con la pestaña en segundo plano).
 * - Las etiquetas se atenúan al acercarse a un texto marcado con
 *   `data-orbit-avoid` (el copy del hero), para no superponerse con él, y
 *   cuando se cruzan entre sí cede la que no está encendida.
 */

type Label = {
  text: string;
  /** Extremo de la guía junto al punto, extremo lejano y origen del texto. */
  from: [number, number];
  to: [number, number];
  at: [number, number];
  anchor: "start" | "end";
  /** Si es `false`, la etiqueta aparece solo mientras el satélite está encendido. */
  always: boolean;
};

type Satellite = {
  orbit: (typeof ORBITS)[number];
  /** Posición inicial en la órbita, en grados paramétricos. */
  phi0: number;
  /** Segundos por vuelta. */
  period: number;
  /** Radio del punto apagado (hueco). */
  r: number;
  label: Label;
};

/**
 * Los períodos siguen aproximadamente la tercera ley de Kepler (T ∝ a^1,5):
 * cuanto más grande la órbita, más lenta la vuelta. STUGO, la más externa,
 * tarda 48 s.
 */
const SATELLITES: readonly [Satellite, Satellite, Satellite] = [
  {
    orbit: ORBITS[0],
    phi0: 236,
    period: 48,
    r: 4.5,
    label: { text: "01 STUGO", from: [-8, -8], to: [-26, -26], at: [-30, -30], anchor: "end", always: true },
  },
  {
    orbit: ORBITS[1],
    phi0: 292,
    period: 33,
    r: 4.5,
    label: { text: "02 MATE ÚNICO", from: [7, -7], to: [24, -24], at: [28, -28], anchor: "start", always: true },
  },
  {
    orbit: ORBITS[2],
    phi0: 120,
    period: 18,
    r: 3.5,
    label: { text: "03 OTROS PROYECTOS", from: [7, -7], to: [24, -24], at: [28, -28], anchor: "start", always: false },
  },
];

/** Satélite encendido al cargar. */
const INITIAL_ACTIVE = 0;

/** 1 = sentido horario en pantalla; -1 = antihorario. */
const DIRECTION = 1;

/** Radio del punto encendido y de su halo (unidades del SVG). */
const CORE = 5;
const HALO = 11;
/** Radio, alrededor de cada satélite, en el que responde al toque (unidades del SVG). */
const HIT = 22;
/** Distancia (px) a la que una etiqueta empieza a atenuarse / queda del todo apagada. */
const FADE_FROM = 40;
const FADE_TO = 6;

type Box = [left: number, top: number, right: number, bottom: number];

const f = (n: number) => n.toFixed(1);

function position({ orbit, phi0, period }: Satellite, seconds: number) {
  return onEllipse(orbit, phi0 + DIRECTION * 360 * (seconds / period));
}

function translate({ x, y }: { x: number; y: number }) {
  return `translate(${f(x)} ${f(y)})`;
}

/** Separación entre dos rectángulos (0 si se tocan o se superponen). */
function gap(a: Box, b: Box) {
  const dx = Math.max(0, b[0] - a[2], a[0] - b[2]);
  const dy = Math.max(0, b[1] - a[3], a[1] - b[3]);
  return Math.hypot(dx, dy);
}

/** 1 lejos, 0 pegado; con curva suave para que no "parpadee". */
function visibility(box: Box, ...groups: readonly (readonly Box[])[]) {
  let nearest = Infinity;
  for (const group of groups) {
    for (const other of group) nearest = Math.min(nearest, gap(box, other));
  }
  const x = Math.min(1, Math.max(0, (nearest - FADE_TO) / (FADE_FROM - FADE_TO)));
  return x * x * (3 - 2 * x);
}

/** Líneas de texto (en coordenadas de documento) dentro de los bloques `data-orbit-avoid`. */
function collectText(): Box[] {
  const boxes: Box[] = [];
  document.querySelectorAll("[data-orbit-avoid]").forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      Array.from(range.getClientRects()).forEach((r) => {
        if (r.width > 1) {
          boxes.push([
            r.left + window.scrollX,
            r.top + window.scrollY,
            r.right + window.scrollX,
            r.bottom + window.scrollY,
          ]);
        }
      });
    }
  });
  return boxes;
}

// Los textos y las guías se ocultan en mobile, donde el diagrama es solo ambiente.
const cls = {
  fade: "motion-safe:transition-opacity motion-safe:duration-300",
  ring: "fill-bg stroke-ink-2 stroke-[1.25]",
  core: "fill-accent stroke-none",
  halo: "fill-none stroke-accent/40",
  lead: "stroke-ink-3 max-md:hidden",
  lbl: "font-mono text-[10px] font-medium tracking-[.06em] motion-safe:transition-colors motion-safe:duration-300 max-md:hidden",
};

export function OrbitSatellites() {
  const [active, setActive] = useState(INITIAL_ACTIVE);
  const [hover, setHover] = useState(-1);
  const activeRef = useRef(active);
  activeRef.current = active;

  const nodes = useRef<(SVGGElement | null)[]>([]);
  const labels = useRef<(SVGGElement | null)[]>([]);
  const bindNode = (i: number) => (el: SVGGElement | null) => {
    nodes.current[i] = el;
  };
  const bindLabel = (i: number) => (el: SVGGElement | null) => {
    labels.current[i] = el;
  };

  useEffect(() => {
    const first = nodes.current[0];
    const svg = first?.ownerSVGElement;
    if (!first || !svg) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let last = 0;
    let elapsed = 0;

    // Medidas del diseño en coordenadas de documento: se recalculan al cambiar
    // el tamaño o al terminar de cargar las fuentes, no por cuadro.
    let scale = 1;
    let originX = 0;
    let originY = 0;
    let text: Box[] = [];
    let labelBoxes: (Box | null)[] = [null, null, null];
    const shown = ["", "", ""];

    const measure = () => {
      const rect = svg.getBoundingClientRect();
      scale = rect.width / 640;
      originX = rect.left + window.scrollX;
      originY = rect.top + window.scrollY;
      text = collectText();
      labelBoxes = SATELLITES.map((_, i) => {
        const node = labels.current[i]?.querySelector("text");
        try {
          const b = node?.getBBox();
          return b && b.width > 0 ? ([b.x, b.y, b.x + b.width, b.y + b.height] as Box) : null;
        } catch {
          return null; // algunos navegadores no miden elementos con display:none
        }
      });
    };

    const toDocument = (p: { x: number; y: number }, b: Box): Box => [
      originX + scale * (p.x + b[0]),
      originY + scale * (p.y + b[1]),
      originX + scale * (p.x + b[2]),
      originY + scale * (p.y + b[3]),
    ];

    const setOpacity = (i: number, value: number) => {
      const next = value.toFixed(2);
      if (shown[i] === next) return;
      shown[i] = next;
      labels.current[i]?.setAttribute("opacity", next);
    };

    const haloBox: Box = [-HALO, -HALO, HALO, HALO];

    // Toque y hover: qué satélite (si alguno) está bajo el puntero, según su posición actual.
    const hero = svg.closest("section") ?? svg.parentElement ?? svg;
    let pointer: { x: number; y: number } | null = null;
    let hovered = -1;

    const hitAt = (clientX: number, clientY: number) => {
      let best = -1;
      let bestDistance = HIT * scale;
      SATELLITES.forEach((satellite, i) => {
        const p = position(satellite, elapsed);
        const distance = Math.hypot(
          originX + scale * p.x - window.scrollX - clientX,
          originY + scale * p.y - window.scrollY - clientY,
        );
        if (distance <= bestDistance) {
          best = i;
          bestDistance = distance;
        }
      });
      return best;
    };

    const updateHover = () => {
      const next = pointer ? hitAt(pointer.x, pointer.y) : -1;
      if (next === hovered) return;
      hovered = next;
      setHover(next);
      (hero as HTMLElement).style.cursor = next >= 0 ? "pointer" : "";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      updateHover();
    };

    const onLeave = () => {
      pointer = null;
      updateHover();
    };

    const onClick = (event: MouseEvent) => {
      // No pisa links ni botones, ni un clic que termina una selección de texto.
      if ((event.target as Element).closest("a, button, input, textarea, select, label")) return;
      if (window.getSelection()?.isCollapsed === false) return;
      const i = hitAt(event.clientX, event.clientY);
      if (i >= 0) setActive(i);
    };

    const draw = () => {
      const points = SATELLITES.map((s) => position(s, elapsed));
      points.forEach((p, i) => nodes.current[i]?.setAttribute("transform", translate(p)));

      // Prioridad cuando algo se cruza: primero el encendido, después el orden de arriba abajo.
      const on = activeRef.current;
      const order = [0, 1, 2].sort((a, b) => Number(b === on) - Number(a === on) || a - b);
      const above: Box[] = [];
      for (const i of order) {
        const own = labelBoxes[i];
        if (own) {
          const box = toDocument(points[i], own);
          setOpacity(i, visibility(box, text, above));
          if (SATELLITES[i].label.always || i === on) above.push(box);
        }
        above.push(toDocument(points[i], haloBox));
      }

      // El satélite se mueve aunque el mouse esté quieto: el hover se recalcula por cuadro.
      if (pointer) updateHover();
    };

    const tick = (now: number) => {
      // Tope por cuadro: si la pestaña estuvo congelada, no pega un salto al volver.
      elapsed += Math.min(Math.max(now - last, 0), 100) / 1000;
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const sync = () => {
      if (motion.matches || !visible) {
        stop();
      } else if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(measure);

    measure();
    intersection.observe(svg);
    resize.observe(svg);
    document.querySelectorAll("[data-orbit-avoid]").forEach((el) => resize.observe(el));
    window.addEventListener("resize", measure);
    hero.addEventListener("pointermove", onMove as EventListener);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("click", onClick as EventListener);
    motion.addEventListener("change", sync);
    void document.fonts?.ready.then(measure);
    sync();

    return () => {
      stop();
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", measure);
      hero.removeEventListener("pointermove", onMove as EventListener);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("click", onClick as EventListener);
      (hero as HTMLElement).style.cursor = "";
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      {SATELLITES.map((satellite, i) => {
        const on = active === i;
        const { label } = satellite;
        return (
          <g
            key={label.text}
            ref={bindNode(i)}
            transform={translate(position(satellite, 0))}
          >
            <circle
              className={cn(cls.halo, cls.fade, on ? "opacity-100" : hover === i ? "opacity-60" : "opacity-0")}
              r={HALO}
            />
            <circle className={cn(cls.ring, cls.fade, on ? "opacity-0" : "opacity-100")} r={satellite.r} />
            <circle className={cn(cls.core, cls.fade, on ? "opacity-100" : "opacity-0")} r={CORE} />

            <g ref={bindLabel(i)}>
              <g className={cn(cls.fade, label.always || on ? "opacity-100" : "opacity-0")}>
                <line
                  className={cls.lead}
                  x1={label.from[0]}
                  y1={label.from[1]}
                  x2={label.to[0]}
                  y2={label.to[1]}
                />
                <text
                  className={cn(cls.lbl, on ? "fill-ink" : "fill-ink-2")}
                  x={label.at[0]}
                  y={label.at[1]}
                  textAnchor={label.anchor}
                >
                  {label.text}
                </text>
              </g>
            </g>
          </g>
        );
      })}
    </>
  );
}
