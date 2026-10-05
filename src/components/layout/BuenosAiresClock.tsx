"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: site.location.timeZone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
// En el servidor no hay hora "del visitante": se muestra un guion y el cliente completa la hora real.
const getServerSnapshot = () => "--:--";

/** Hora actual de Argentina (UTC-3, sin horario de verano). */
export function BuenosAiresClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{time} · UTC-3</>;
}
