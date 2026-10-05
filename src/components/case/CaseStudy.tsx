import type { ReactNode } from "react";
import type { CaseStudyData, Fact } from "@/content/types";
import { cn } from "@/lib/cn";
import { Challenges } from "@/components/case/Challenges";
import { BrowserShots, PhoneShots, visibleShots } from "@/components/case/Shots";
import { ChipList } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Pending, SHOW_PENDING } from "@/components/ui/Pending";
import { Label, RichText, labelClass } from "@/components/ui/Text";

const factKey =
  "border-b border-line pt-[15px] pb-3 font-mono text-label uppercase text-ink-3";
const factValue =
  "border-b border-line py-3 text-small text-ink max-md:text-[14px]";

/** Fila de la tabla de datos. Sin valor, en producción la fila no se muestra. */
function FactRow({ fact }: { fact: Fact }) {
  const hasValue = Boolean(fact.value);
  if (!hasValue && !SHOW_PENDING) return null;

  const pending =
    fact.todo && SHOW_PENDING ? <Pending hint={fact.todo} /> : null;

  const body = !hasValue ? null : fact.href ? (
    <a
      href={fact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-xs font-mono text-meta text-ink underline decoration-line-control decoration-1 underline-offset-[5px] hover:decoration-accent focus-ring"
    >
      <span>
        {fact.prefix ? <span className="max-md:hidden">{fact.prefix}</span> : null}
        {fact.value}
      </span>
      <Icon name="ne" size={14} />
    </a>
  ) : (
    <RichText text={fact.value as string} />
  );

  const separator = pending && body ? " · " : null;

  return (
    <div className="contents">
      <dt className={factKey}>{fact.label}</dt>
      <dd className={factValue}>
        {fact.todoAfter ? (
          <>
            {body}
            {separator}
            {pending}
          </>
        ) : (
          <>
            {pending}
            {separator}
            {body}
          </>
        )}
      </dd>
    </div>
  );
}

/** Fila de un caso: clave a la izquierda (3 columnas) y contenido a la derecha (9). */
function CaseRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-26 grid grid-cols-12 gap-x-6 max-md:mt-16 max-md:grid-cols-1 max-md:gap-y-5">
      <div className="col-[1/span_3] flex flex-col gap-2.5 pt-0.5 max-md:col-1">
        <p className={labelClass.ink}>{label}</p>
        <p className="max-w-[240px] text-small text-ink-2 max-md:max-w-none">
          {hint}
        </p>
      </div>
      <div className="col-[4/span_9] min-w-0 max-md:col-1">{children}</div>
    </div>
  );
}

const Dot = () => <i className="size-[3px] rounded-full bg-line-control" />;

/**
 * Un proyecto contado como caso: título y contexto, datos, stack, capturas,
 * arquitectura y desafíos. `reverse` invierte el lado de las capturas.
 */
export function CaseStudy({
  data,
  architecture,
  reverse = false,
}: {
  data: CaseStudyData;
  /** Diagrama de arquitectura (cada caso tiene el suyo). */
  architecture: ReactNode;
  reverse?: boolean;
}) {
  const shots = visibleShots(data.shots.items);
  const titleId = `caso-${data.id}`;
  const phone = data.shots.kind === "phone";
  // Con 4 capturas de celular las columnas son 4 + 8 (en vez de 5 + 6) para que entren en una fila.
  const wide = phone && shots.length > 3;

  return (
    <article aria-labelledby={titleId}>
      <div
        className={cn(
          "grid grid-cols-12 items-start gap-x-6",
          // Los casos con celulares se apilan por debajo de 1280 px (las capturas necesitan el ancho); los demás, por debajo de 1024.
          phone ? "max-xl:grid-cols-1 max-xl:gap-y-10" : "max-lg:grid-cols-1 max-lg:gap-y-10",
        )}
      >
        <div
          className={cn(
            "row-start-1 flex flex-col gap-7 max-md:gap-6",
            phone ? "max-xl:col-1 max-xl:max-w-[720px]" : "max-lg:col-1",
            shots.length === 0
              ? "col-[1/span_8]"
              : reverse
                ? "col-[8/span_5]"
                : wide
                  ? "col-[1/span_4]"
                  : "col-[1/span_5]",
          )}
        >
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <Label tone="ink">Caso {data.number}</Label>
            <Dot />
            <Label>{data.kind}</Label>
            <Dot />
            <Label>{data.format}</Label>
          </p>
          <h3 id={titleId} className="-mt-2 text-h1 max-md:text-h1-m">
            {data.title}
          </h3>
          <p className="text-[19px] leading-[1.5] tracking-[-.005em] text-ink max-md:text-[17px]">
            {data.context}
          </p>
          <dl className="grid grid-cols-[104px_1fr] border-t border-line max-md:grid-cols-[84px_1fr]">
            {data.facts.map((fact) => (
              <FactRow key={fact.label} fact={fact} />
            ))}
          </dl>
          <ChipList items={data.stack} label="Stack del proyecto" />
        </div>

        {shots.length > 0 ? (
          <div
            data-reveal
            className={cn(
              "row-start-1 min-w-0",
              phone ? "max-xl:col-1 max-xl:row-start-2" : "max-lg:col-1 max-lg:row-start-2",
              reverse ? "col-[1/span_6]" : wide ? "col-[5/span_8]" : "col-[7/span_6]",
            )}
          >
            {data.shots.kind === "phone" ? (
              <PhoneShots shots={shots} swipeHint={data.shots.swipeHint} />
            ) : (
              <BrowserShots shots={shots} />
            )}
          </div>
        ) : null}
      </div>

      <CaseRow label="Arquitectura" hint={data.architecture.hint}>
        {architecture}
      </CaseRow>

      <CaseRow label={data.challenges.label} hint={data.challenges.hint}>
        <Challenges data={data.challenges} />
      </CaseRow>
    </article>
  );
}
