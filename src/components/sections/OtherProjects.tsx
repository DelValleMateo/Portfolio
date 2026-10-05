import type { CSSProperties } from "react";
import { otherProjects } from "@/content/projects";
import type { OtherProjectData } from "@/content/types";
import { cn } from "@/lib/cn";
import { ChipList } from "@/components/ui/Chip";
import { Pending, SHOW_PENDING } from "@/components/ui/Pending";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CopyText, Label } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

function CardFoot({ project }: { project: OtherProjectData }) {
  if (project.contextLink) {
    return (
      <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
        <Label>Contexto</Label>
        <TextLink href={project.contextLink.href} icon="right">
          {project.contextLink.label}
        </TextLink>
      </div>
    );
  }

  const site = project.site;
  if (!site || (!site.url && !SHOW_PENDING)) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
      {site.url ? (
        <span className="min-w-0 font-mono text-meta text-ink-2 [overflow-wrap:anywhere]">
          {hostOf(site.url)}
        </span>
      ) : (
        <Pending hint={site.todo ?? "url del sitio"} />
      )}
      {/* Sin URL (solo en desarrollo) el link queda como ancla vacía. */}
      <TextLink href={site.url ?? "#"} className="shrink-0">Ver sitio</TextLink>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: OtherProjectData;
  index: number;
}) {
  const header = (
    <>
      <h3 className="text-h3 max-md:text-h3-m">{project.title}</h3>
      <p className="text-small text-ink-2">
        <CopyText copy={project.summary} />
      </p>
    </>
  );

  return (
    <article
      data-reveal
      style={{ "--i": index } as CSSProperties}
      className={cn(
        "flex min-h-[320px] flex-col gap-[18px] rounded-lg bg-surface p-8 inset-ring-1 inset-ring-line transition-shadow duration-150 hover:inset-ring-line-control max-md:min-h-0 max-md:gap-4 max-md:p-5",
        project.wide && "md:col-span-2",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Label>
          {project.index} · {project.category}
        </Label>
        {project.status ? (
          <span className="inline-flex items-center gap-2 font-mono text-label uppercase text-accent">
            <i className="size-[7px] rounded-full bg-accent motion-safe:animate-pulse" />
            {project.status}
          </span>
        ) : null}
      </div>

      {project.points ? (
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-4">
          <div className="flex flex-col gap-2.5">{header}</div>
          <ul className="flex flex-col border-t border-line">
            {project.points.map((point, i) => (
              <li
                key={point}
                className="flex gap-2.5 border-b border-line py-[9px] text-[14px] leading-[1.45] text-ink-2"
              >
                <span className="font-mono text-[11px] leading-5 text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">{header}</div>
      )}

      <ChipList
        items={project.stack}
        todo={project.stackTodo}
        className="mt-auto"
      />
      <CardFoot project={project} />
    </article>
  );
}

/** Otros proyectos: tarjetas compactas. */
export function OtherProjects() {
  return (
    <Section id="otros">
      <SectionHeader
        index="02 / 05"
        tag={`${otherProjects.length} proyectos`}
        title="Otros proyectos"
        lede="Más chicos o en otros dominios: sitios web, un sistema interno, Android y datos."
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {otherProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index % 3} />
        ))}
      </div>
    </Section>
  );
}
