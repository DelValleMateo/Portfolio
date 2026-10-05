import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-sm px-[22px] text-[16px] leading-none font-semibold tracking-[-.005em] transition-[background-color,box-shadow,color] duration-150 focus-ring";

const variants = {
  primary:
    "bg-accent text-on-accent hover:bg-[color-mix(in_oklab,var(--accent)_86%,var(--ink))]",
  secondary: "text-ink inset-ring-1 inset-ring-line-control hover:inset-ring-ink",
} as const;

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}
