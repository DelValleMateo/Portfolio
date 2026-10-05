"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789°'/";

/**
 * Texto que se "decodifica" al cargar: cada letra pasa por símbolos al azar y
 * se fija de izquierda a derecha, como una señal que termina de sincronizar.
 *
 * - El primer render (servidor y cliente) es el texto final, así que sin JS y para
 *   buscadores el texto es siempre el real. Para lectores de pantalla, el
 *   contenedor tiene que declarar el nombre con `aria-label` (ver Hero.tsx).
 * - Con `prefers-reduced-motion` no hace nada.
 * - Corre una sola vez por sesión (sessionStorage): al recargar o volver a la
 *   página no se repite.
 * - Los espacios y saltos de línea se respetan, para que el ancho no cambie de más.
 */
export function ScrambleText({
  text,
  duration = 900,
  className,
}: {
  text: string;
  /** Milisegundos hasta que la última letra queda fija. */
  duration?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const key = "scramble:" + text;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* storage bloqueado: se anima igual, solo esta vez */
    }

    const letters = Array.from(text);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const fixed = Math.floor(progress * letters.length);
      setShown(
        letters
          .map((char, i) =>
            i < fixed || char === " " || char === "\n"
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      setShown(text);
      // Se marca al terminar (no al empezar) para que el doble efecto de React en desarrollo no la corte.
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        /* nada que guardar */
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, duration]);

  // Decorativo: mientras corre el efecto el texto visible son símbolos, así que
  // el elemento que lo contiene (el <h1>) debe llevar el nombre accesible en aria-label.
  return (
    <span aria-hidden="true" className={className}>
      {shown}
    </span>
  );
}
