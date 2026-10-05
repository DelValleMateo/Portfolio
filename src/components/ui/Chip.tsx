import { cn } from "@/lib/cn";
import { SHOW_PENDING } from "@/components/ui/Pending";

const chip =
  "inline-flex h-7 items-center whitespace-nowrap rounded-full border border-line-strong px-3 font-mono text-chip text-ink-2";
const chipPending =
  "inline-flex h-7 items-center whitespace-nowrap rounded-full border border-dashed border-line-control px-3 font-mono text-chip text-ink-3";

/** Lista de chips de stack. Sin ítems, solo se ve el pendiente (en desarrollo). */
export function ChipList({
  items,
  label,
  todo,
  className,
}: {
  items: string[];
  label?: string;
  todo?: string;
  className?: string;
}) {
  const empty = items.length === 0;
  if (empty && !(todo && SHOW_PENDING)) return null;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {empty ? (
        <li className={chipPending}>[{todo}]</li>
      ) : (
        items.map((item) => (
          <li key={item} className={chip}>
            {item}
          </li>
        ))
      )}
    </ul>
  );
}
