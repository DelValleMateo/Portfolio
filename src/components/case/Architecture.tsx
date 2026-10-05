import { Fragment } from "react";
import type {
  ArchNodeData,
  MateUnicoArchitectureData,
  StugoArchitectureData,
} from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { labelClass } from "@/components/ui/Text";

/* Diagramas de arquitectura. En desktop corren en horizontal; por debajo de
   1024 px se apilan y los conectores pasan a ser verticales. */

function ArchNode({
  node,
  className,
}: {
  node: ArchNodeData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2.5 rounded-sm bg-surface p-[18px] inset-ring-1 inset-ring-line-strong",
        className,
      )}
    >
      {node.kind ? <p className={labelClass.muted}>{node.kind}</p> : null}
      <p className="text-[18px] leading-[1.25] font-semibold tracking-[-.01em] text-ink">
        {node.title}
      </p>
      {node.subtitle ? (
        <p className="-mt-1 font-mono text-[12px] leading-[18px] text-ink-2">
          {node.subtitle}
        </p>
      ) : null}
      {node.layers ? <Layers layers={node.layers} /> : null}
      {node.points ? (
        <ul className="flex flex-col gap-1.5 border-t border-line pt-2.5">
          {node.points.map((point) => (
            <li
              key={point}
              className="relative pl-3.5 text-[14px] leading-[1.45] text-ink-2 before:absolute before:top-[.72em] before:left-0 before:h-px before:w-1.5 before:bg-ink-3 before:content-['']"
            >
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Capas del backend (router → service → repository): en columna en desktop, en fila al apilar. */
function Layers({ layers }: { layers: string[] }) {
  return (
    <div className="flex flex-col flex-wrap items-stretch gap-1 max-lg:flex-row max-lg:items-center max-lg:gap-1.5">
      {layers.map((layer, i) => (
        <Fragment key={layer}>
          {i > 0 ? (
            <Icon
              name="right"
              size={14}
              className="ml-3 rotate-90 self-start text-ink-3 max-lg:ml-0 max-lg:rotate-0 max-lg:self-center"
            />
          ) : null}
          <span className="inline-flex h-[26px] items-center rounded-xs px-2 font-mono text-[12px] leading-none text-ink inset-ring-1 inset-ring-line-control">
            {layer}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function ArchEdge({
  label,
  start = false,
  end = true,
  mu = false,
}: {
  label?: string;
  start?: boolean;
  end?: boolean;
  mu?: boolean;
}) {
  return (
    <div className={cn("arch-edge", mu && "arch-edge--mu")}>
      {start ? <i className="ah ah-start" /> : null}
      {label ? <span>{label}</span> : null}
      {end ? <i className="ah ah-end" /> : null}
    </div>
  );
}

export function StugoArchitecture({ data }: { data: StugoArchitectureData }) {
  const [client, api, db] = data.nodes;
  return (
    <div>
      <div className="grid grid-cols-[1fr_148px_1.1fr_48px_.9fr] items-stretch max-lg:grid-cols-[minmax(0,1fr)]">
        <ArchNode node={client} />
        <ArchEdge start label={data.contractLabel} />
        <ArchNode node={api} />
        <ArchEdge />
        <ArchNode node={db} />
      </div>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-meta text-ink-2">
        {data.notes.map((note) => (
          <Fragment key={note.label}>
            <span className="text-ink-3">{note.label}</span>
            <span>{note.value}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}

function Deploy({
  deploy,
}: {
  deploy: MateUnicoArchitectureData["deploys"][number];
}) {
  return (
    <div className="relative flex min-w-0 flex-col gap-2.5 rounded-md border border-dashed border-line-control p-3">
      <p className="font-mono text-label uppercase text-ink-2">{deploy.label}</p>
      <p className="flex items-center gap-2 font-mono text-[12px] leading-4 text-ink-2">
        <Icon name="user" size={14} className="text-ink-3" />
        {deploy.actor}
      </p>
      <ArchNode node={deploy.node} className="flex-1 justify-center" />
    </div>
  );
}

export function MateUnicoArchitecture({
  data,
}: {
  data: MateUnicoArchitectureData;
}) {
  const [frontend, cms] = data.deploys;
  return (
    <div className="grid grid-cols-[1fr_128px_1fr_48px_.72fr] items-stretch max-lg:grid-cols-[minmax(0,1fr)]">
      <Deploy deploy={frontend} />
      <ArchEdge mu start end={false} label={data.apiLabel} />
      <Deploy deploy={cms} />
      <ArchEdge mu />
      <ArchNode
        node={data.data}
        className="mt-16 mb-3 justify-center max-lg:m-0"
      />
    </div>
  );
}
