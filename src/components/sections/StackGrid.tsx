"use client";

import { useState, type CSSProperties } from "react";
import type { StackGroup } from "@/content/types";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Text";

/** "Mate Único · CTI-WEB" → ["Mate Único", "CTI-WEB"]. */
const projectsOf = (where?: string) => (where ? where.split(" · ") : []);

/**
 * Stack en tarjetas por área. Al pasar el mouse sobre una tecnología se
 * enciende en acento el nombre de sus proyectos en todas las tarjetas: un
 * vistazo a "dónde más aparece esto". Es solo un énfasis visual con mouse; la
 * información (qué tecnología, en qué proyecto) está siempre escrita, así que
 * con teclado, táctil o lector de pantalla no se pierde nada.
 */
export function StackGrid({ groups }: { groups: StackGroup[] }) {
  const [hot, setHot] = useState<{ key: string; projects: string[] } | null>(
    null,
  );

  return (
    <div
      className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2 xl:grid-cols-3"
      onMouseLeave={() => setHot(null)}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={group.index}
          data-reveal
          style={{ "--i": groupIndex % 3 } as CSSProperties}
          className="flex flex-col gap-4 rounded-lg bg-surface p-7 inset-ring-1 inset-ring-line max-md:p-5"
        >
          <div className="flex items-baseline gap-3.5">
            <Label tone="accent">{group.index}</Label>
            <h3 className="text-h3 max-md:text-h3-m">{group.title}</h3>
          </div>

          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const key = `${group.index}/${item.name}`;
              const projects = projectsOf(item.where);
              const isHot = hot?.key === key;

              return (
                <li
                  key={item.name}
                  onMouseEnter={() =>
                    setHot(projects.length > 0 ? { key, projects } : null)
                  }
                  className={cn(
                    "flex min-w-0 items-baseline gap-3 rounded-sm border-l-2 px-3 py-2.5 motion-safe:transition-colors motion-safe:duration-150",
                    isHot ? "border-accent bg-sunken" : "border-transparent",
                  )}
                >
                  <span className="text-[16px] leading-[1.35] font-medium text-ink">
                    {item.name}
                    {item.detail ? (
                      <>
                        {" "}
                        <small className="text-[14px] font-normal text-ink-2">
                          {item.detail}
                        </small>
                      </>
                    ) : null}
                  </span>
                  {projects.length > 0 ? (
                    <>
                      <i className="min-w-3 flex-1 -translate-y-1 border-b border-dotted border-line-control" />
                      <span className="font-mono text-[12px] leading-4 whitespace-nowrap">
                        {projects.map((project, i) => (
                          <span key={project}>
                            {i > 0 ? (
                              <span className="text-ink-3"> · </span>
                            ) : null}
                            <span
                              className={cn(
                                "motion-safe:transition-colors motion-safe:duration-150",
                                hot?.projects.includes(project)
                                  ? "text-accent"
                                  : "text-ink-3",
                              )}
                            >
                              {project}
                            </span>
                          </span>
                        ))}
                      </span>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
