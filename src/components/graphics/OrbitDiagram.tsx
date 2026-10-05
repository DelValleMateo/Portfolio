import { C, ORBITS } from "./orbit-geometry";
import { OrbitSatellites } from "./OrbitSatellites";

/**
 * Diagrama orbital del hero: anillo de azimut, tres órbitas, la estación en el
 * centro (Concepción del Uruguay) y tres "satélites", dos con etiqueta:
 * 01 STUGO (el activo, en acento) y 02 MATE ÚNICO.
 *
 * El dibujo fijo (anillo, órbitas, CDU) es de servidor: se calcula al
 * renderizar y no se hidrata. Solo los satélites son un componente de cliente
 * (OrbitSatellites), porque son lo único que se mueve.
 */

const f = (n: number) => n.toFixed(1);

const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

// Los textos y marcas se ocultan en mobile, donde el diagrama es solo ambiente.
const cls = {
  ring: "fill-none stroke-line",
  tick: "stroke-line-strong max-md:hidden",
  path: "fill-none stroke-line-strong",
  txt: "fill-ink-3 font-mono text-[10px] tracking-[.05em] max-md:hidden",
  core: "fill-ink",
  cross: "stroke-ink-3",
};

const AZIMUTH_LABELS = [
  { deg: 0, text: "000°", anchor: "middle" },
  { deg: 90, text: "090°", anchor: "end" },
  { deg: 270, text: "270°", anchor: "start" },
] as const;

export function OrbitDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      width="640"
      height="640"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* anillo de azimut + marcas cada 10° */}
      <circle className={cls.ring} cx={C} cy={C} r="300" />
      {Array.from({ length: 36 }, (_, i) => i * 10).map((deg) => {
        const outer = polar(300, deg);
        const inner = polar(deg % 30 === 0 ? 288 : 294, deg);
        return (
          <line
            key={deg}
            className={cls.tick}
            x1={f(outer.x)}
            y1={f(outer.y)}
            x2={f(inner.x)}
            y2={f(inner.y)}
          />
        );
      })}
      {AZIMUTH_LABELS.map(({ deg, text, anchor }) => {
        const p = polar(274, deg);
        return (
          <text
            key={deg}
            className={cls.txt}
            x={f(p.x)}
            y={f(p.y + 3.5)}
            textAnchor={anchor}
          >
            {text}
          </text>
        );
      })}

      {/* órbitas */}
      {ORBITS.map(({ a, b, rot }) => (
        <ellipse
          key={rot}
          className={cls.path}
          cx={C}
          cy={C}
          rx={a}
          ry={b}
          transform={`rotate(${rot} ${C} ${C})`}
        />
      ))}

      {/* estación en el centro */}
      <line className={cls.cross} x1={C - 18} y1={C} x2={C - 8} y2={C} />
      <line className={cls.cross} x1={C + 8} y1={C} x2={C + 18} y2={C} />
      <line className={cls.cross} x1={C} y1={C - 18} x2={C} y2={C - 8} />
      <line className={cls.cross} x1={C} y1={C + 8} x2={C} y2={C + 18} />
      <circle className={cls.core} cx={C} cy={C} r="3" />
      <text className={cls.txt} x={C + 14} y={C - 12}>
        CDU
      </text>

      {/* satélites: se dibujan encima de todo y son lo único que se mueve */}
      <OrbitSatellites />
    </svg>
  );
}
