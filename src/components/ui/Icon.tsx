import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

const PATHS = {
  ne: <path d="M5 11 11 5M6 5h5v5" />,
  down: <path d="M8 3v10M4 9l4 4 4-4" />,
  up: <path d="M8 13V3M4 7l4-4 4 4" />,
  right: <path d="M3 8h10M9 4l4 4-4 4" />,
  copy: (
    <>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M10.5 5.5V2.5h-8v8h3" />
    </>
  ),
  theme: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M2.5 5.5h11M2.5 10.5h11" />,
  close: <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />,
  user: (
    <>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c.8-2.3 2.7-3.5 5-3.5s4.2 1.2 5 3.5" />
    </>
  ),
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof PATHS;

/** Íconos de trazo de 16 px (o 14 px dentro de links y controles chicos). Heredan el color del texto. */
export function Icon({
  name,
  size = 16,
  className,
}: {
  name: IconName;
  size?: 14 | 16;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      className={cn("shrink-0", size === 14 ? "size-3.5" : "size-4", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
