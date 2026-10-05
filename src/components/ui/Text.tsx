import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Pending } from "@/components/ui/Pending";
import type { Copy } from "@/content/types";

/** Clases de las etiquetas en mono y mayúsculas (índices, claves de tabla, kickers). */
export const labelClass = {
  muted: "font-mono text-label uppercase text-ink-3",
  ink: "font-mono text-label uppercase text-ink",
  accent: "font-mono text-label uppercase text-accent",
} as const;

export function Label({
  tone = "muted",
  className,
  children,
}: {
  tone?: keyof typeof labelClass;
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn(labelClass[tone], className)}>{children}</span>;
}

/** Código en línea. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-xs bg-sunken px-[5px] py-px font-mono text-[.8em] text-ink">
      {children}
    </code>
  );
}

/** Texto plano donde lo que va entre `backticks` se muestra como código. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <Code key={i}>{part}</Code> : part,
      )}
    </>
  );
}

/** Texto confirmado + continuación opcional. Si falta la continuación, se ve el pendiente (solo en desarrollo). */
export function CopyText({ copy }: { copy: Copy }) {
  return (
    <>
      <RichText text={copy.text} />
      {copy.extra ? (
        <>
          {" "}
          <RichText text={copy.extra} />
        </>
      ) : copy.todo ? (
        <>
          {" "}
          <Pending hint={copy.todo} />
        </>
      ) : null}
    </>
  );
}
