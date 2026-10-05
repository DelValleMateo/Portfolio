/**
 * Pendientes de contenido.
 * En desarrollo (`npm run dev`) se ven como recuadros punteados para que sepas qué falta.
 * En producción no se renderiza nada: el visitante nunca ve un placeholder.
 */
export const SHOW_PENDING = process.env.NODE_ENV !== "production";

export function Pending({ hint }: { hint: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <span className="rounded-xs border border-dashed border-line-control px-1.5 py-px font-mono text-[12px] leading-5 font-normal tracking-normal text-ink-3 normal-case box-decoration-clone">
      [{hint}]
    </span>
  );
}

export function PendingBlock({ hint }: { hint: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <p className="block rounded-xs border border-dashed border-line-control px-3 py-2.5 font-mono text-[12px] leading-[18px] text-ink-3">
      [{hint}]
    </p>
  );
}
