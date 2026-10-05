import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Link de texto en mono, subrayado fino; el subrayado toma el acento al pasar el mouse. */
export function TextLink({
  href,
  icon = "ne",
  className,
  children,
}: {
  href: string;
  icon?: IconName | null;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs font-mono text-meta text-ink underline decoration-line-control decoration-1 underline-offset-[5px] hover:decoration-accent focus-ring",
        className,
      )}
    >
      {children}
      {icon ? <Icon name={icon} size={14} /> : null}
    </a>
  );
}
