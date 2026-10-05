"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Botón "Copiar" del mail. Avisa con "Copiado" durante dos segundos. */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-mono text-label whitespace-nowrap text-ink uppercase inset-ring-1 inset-ring-line-control transition-shadow duration-150 hover:inset-ring-ink focus-ring"
    >
      <Icon name="copy" size={14} />
      <span aria-live="polite">
        {state === "copied" ? "Copiado" : state === "failed" ? "No se pudo" : "Copiar"}
      </span>
    </button>
  );
}
