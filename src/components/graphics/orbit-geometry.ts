/**
 * Geometría del diagrama orbital. Viewbox de 640 × 640, con la estación (CDU)
 * en el centro. La comparten OrbitDiagram (dibuja las órbitas) y
 * OrbitSatellites (mueve los satélites sobre ellas).
 */

export const C = 320;

export type Orbit = {
  /** Semieje mayor. */
  a: number;
  /** Semieje menor. */
  b: number;
  /** Rotación de la elipse, en grados. */
  rot: number;
};

export const ORBITS: readonly [Orbit, Orbit, Orbit] = [
  { a: 272, b: 92, rot: -16 },
  { a: 212, b: 150, rot: 32 },
  { a: 140, b: 56, rot: -58 },
];

/** Punto de la órbita en el ángulo paramétrico `phi` (grados). */
export function onEllipse({ a, b, rot }: Orbit, phi: number) {
  const t = (rot * Math.PI) / 180;
  const p = (phi * Math.PI) / 180;
  return {
    x: C + a * Math.cos(p) * Math.cos(t) - b * Math.sin(p) * Math.sin(t),
    y: C + a * Math.cos(p) * Math.sin(t) + b * Math.sin(p) * Math.cos(t),
  };
}
