import type { CSSProperties } from "react";
import type { Challenge, CaseStudyData } from "@/content/types";
import { cn } from "@/lib/cn";
import { CopyText, Label, RichText, labelClass } from "@/components/ui/Text";

const stepBase =
  "relative grid grid-cols-[112px_1fr] gap-x-4 pl-[30px] before:absolute before:top-1 before:left-0 before:size-[11px] before:content-[''] max-md:grid-cols-[minmax(0,1fr)] max-md:gap-y-1 max-md:pl-7";

/**
 * Cada paso tiene su propio color (además de su rótulo): el problema queda
 * atenuado, la decisión en tinta, el resultado en acento y el costo en coral,
 * con punto cuadrado. El color nunca es lo único que distingue un paso.
 */
const tone = {
  problem: {
    dot: "before:rounded-full before:bg-bg before:inset-ring-2 before:inset-ring-ink-3",
    label: "text-ink-3",
  },
  decision: {
    dot: "before:rounded-full before:bg-bg before:inset-ring-2 before:inset-ring-ink",
    label: "text-ink",
  },
  result: {
    dot: "before:rounded-full before:bg-bg before:inset-ring-2 before:inset-ring-accent",
    label: "text-accent",
  },
  cost: {
    dot: "before:rounded-xs before:bg-bg before:inset-ring-2 before:inset-ring-cost",
    label: "text-cost",
  },
} as const;

type Step = {
  key: string;
  tone: keyof typeof tone;
  copy: Challenge["problem"];
};

const card =
  "rounded-lg bg-surface p-7 inset-ring-1 inset-ring-line max-md:p-5";

/** Un desafío contado como problema → decisión → resultado (y costo, si lo hubo). */
function ChallengeBlock({
  challenge,
  index,
}: {
  challenge: Challenge;
  index: number;
}) {
  const steps: Step[] = [
    { key: "Problema", tone: "problem", copy: challenge.problem },
    { key: "Decisión", tone: "decision", copy: challenge.decision },
    { key: "Resultado", tone: "result", copy: challenge.result },
  ];
  if (challenge.cost) {
    steps.push({ key: "Costo", tone: "cost", copy: challenge.cost });
  }

  return (
    <div
      data-reveal
      style={{ "--i": index } as CSSProperties}
      className={cn("flex flex-col gap-6", card)}
    >
      <div className="flex flex-col gap-1.5">
        <Label>{challenge.id}</Label>
        <h4 className="text-h3 max-md:text-h3-m">{challenge.title}</h4>
      </div>
      <ol className="relative flex flex-col gap-[22px] before:absolute before:top-3 before:bottom-3 before:left-[5px] before:w-px before:bg-line-strong before:content-['']">
        {steps.map((step) => (
          <li key={step.key} className={cn(stepBase, tone[step.tone].dot)}>
            <span
              className={cn(
                "pt-0.5 font-mono text-label uppercase",
                tone[step.tone].label,
              )}
            >
              {step.key}
            </span>
            <p className="text-[16px] leading-[1.55] text-ink max-md:text-[15px]">
              <CopyText copy={step.copy} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Challenges({ data }: { data: CaseStudyData["challenges"] }) {
  const { items, aside } = data;

  return (
    <div
      className={cn(
        "grid items-start gap-6 max-lg:grid-cols-[minmax(0,1fr)]",
        aside ? "grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "grid-cols-2",
      )}
    >
      {items.map((challenge, index) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} index={index} />
      ))}
      {aside ? (
        <aside
          aria-label="También en el proyecto"
          data-reveal
          style={{ "--i": items.length } as CSSProperties}
          className={cn("flex flex-col gap-3.5", card)}
        >
          <p className={labelClass.ink}>{aside.label}</p>
          <ul>
            {aside.items.map((item) => (
              <li
                key={item.title}
                className="border-b border-line pb-3 text-[15px] leading-[1.5] text-ink-2"
              >
                <b className="block font-medium text-ink">{item.title}</b>
                <RichText text={item.text} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
