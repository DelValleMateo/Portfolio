/**
 * Traza terrestre ilustrativa (inclinación 51,6°, como la de la ISS) sobre una
 * grilla equirectangular, con Concepción del Uruguay marcada. Es decoración:
 * "ilustrativa" lo dice el epígrafe.
 *
 * Componente de servidor: se calcula al renderizar.
 */

const W = 588;
const H = 150;
const INCLINATION = (51.6 * Math.PI) / 180;
const EARTH_SHIFT = 23.2; // grados que rota la Tierra por órbita
const LON_START = -150;
const STEPS = 900;
const STATION = { lon: -58.23, lat: -32.48 };

const f = (n: number) => n.toFixed(1);
const wrapLon = (lon: number) => ((((lon + 180) % 360) + 360) % 360) - 180;

/** Segmentos de la traza, cortados donde la longitud da la vuelta (±180°). */
function buildSegments() {
  const segments: Array<Array<[number, number]>> = [];
  let current: Array<[number, number]> = [];
  let previous: number | null = null;

  for (let k = 0; k <= STEPS; k++) {
    const u = (4 * Math.PI * k) / STEPS;
    const lat =
      (Math.asin(Math.sin(INCLINATION) * Math.sin(u)) * 180) / Math.PI;
    const lonRel =
      (Math.atan2(Math.cos(INCLINATION) * Math.sin(u), Math.cos(u)) * 180) /
      Math.PI;
    const revolution = Math.floor((u + Math.PI) / (2 * Math.PI));
    const lon = wrapLon(
      LON_START + lonRel + 360 * revolution - EARTH_SHIFT * (u / (2 * Math.PI)),
    );

    if (previous !== null && Math.abs(lon - previous) > 180) {
      segments.push(current);
      current = [];
    }
    current.push([((lon + 180) / 360) * W, ((90 - lat) / 180) * H]);
    previous = lon;
  }
  segments.push(current);
  return segments.filter((segment) => segment.length > 1);
}

const cls = {
  line: "stroke-grid",
  equator: "stroke-line-strong [stroke-dasharray:2_4]",
  path: "fill-none stroke-accent/60 stroke-[1.5] [stroke-dasharray:3_5]",
  ring: "fill-none stroke-accent",
  pos: "fill-ink",
  cross: "stroke-ink",
  txt: "fill-ink-3 font-mono text-[9px] tracking-[.05em]",
  lbl: "fill-ink-2 font-mono text-[9px] font-medium tracking-[.06em]",
};

export function GroundTrack() {
  const sx = ((STATION.lon + 180) / 360) * W;
  const sy = ((90 - STATION.lat) / 180) * H;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-full"
    >
      {Array.from({ length: 11 }, (_, i) => {
        const x = (W * (i + 1)) / 12;
        return <line key={`m${i}`} className={cls.line} x1={f(x)} y1="0" x2={f(x)} y2={H} />;
      })}
      {Array.from({ length: 5 }, (_, j) => {
        const y = (H * (j + 1)) / 6;
        return (
          <line
            key={`p${j}`}
            className={j + 1 === 3 ? cls.equator : cls.line}
            x1="0"
            y1={f(y)}
            x2={W}
            y2={f(y)}
          />
        );
      })}

      {buildSegments().map((segment, i) => (
        <path
          key={i}
          className={cls.path}
          d={
            "M" + segment.map(([x, y]) => `${f(x)} ${f(y)}`).join(" L")
          }
        />
      ))}

      {/* estación: Concepción del Uruguay */}
      <circle className={cls.ring} cx={f(sx)} cy={f(sy)} r="16" strokeOpacity="0.25" />
      <circle className={cls.ring} cx={f(sx)} cy={f(sy)} r="9" strokeOpacity="0.5" />
      <line className={cls.cross} x1={f(sx - 7)} y1={f(sy)} x2={f(sx + 7)} y2={f(sy)} />
      <line className={cls.cross} x1={f(sx)} y1={f(sy - 7)} x2={f(sx)} y2={f(sy + 7)} />
      <circle className={cls.pos} cx={f(sx)} cy={f(sy)} r="2.5" />
      <text className={cls.lbl} x={f(sx + 9)} y={f(sy + 12)}>
        CDU
      </text>
      <text className={cls.txt} x="6" y={f(H / 2 - 5)}>
        0°
      </text>
    </svg>
  );
}
