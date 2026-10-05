import type { Challenge, CaseStudyData } from "@/content/types";
import { cn } from "@/lib/cn";
import { CopyText, Label, RichText, labelClass } from "@/components/ui/Text";

const stepBase =
  "relative grid grid-cols-[112px_1fr] gap-x-4 pl-[30px] before:absolute before:top-1 before:left-0 before:size-[11px] before:content-[''] max-md:grid-cols-[minmax(0,1fr)] max-md:gap-y-1 max-md:pl-7";

const dot = {
  step: "before:rounded-full before:bg-bg before:inset-ring-1 before:inset-ring-ink-3",
  decision: "before:rounded-full before:bg-accent",
  cost: "before:rounded-xs before:bg-bg before:inset-ring-1 before:inset-ring-ink-3",
} as const;

type Step = {
  key: string;
  tone: keyof typeof dot;
  copy: Challenge["problem"];
};

/** Un desafío contado como problema → decisión → resultado (y costo, si lo hubo). */
function ChallengeBlock({ challenge }: { challenge: Challenge }) {
  const steps: Step[] = [
    { key: "Problema", tone: "step", copy: challenge.problem },
    { key: "Decisión", tone: "decision", copy: challenge.decision },
    { key: "Resultado", tone: "step", copy: challenge.result },
  ];
  if (challenge.cost) {
    steps.push({ key: "Costo", tone: "cost", copy: challenge.cost });
  }

  return (
    <div className="flex flex-col gap-6 border-t border-ink pt-5">
      <div className="flex flex-col gap-1.5">
        <Label>{challenge.id}</Label>
        <h4 className="text-h3 max-md:text-h3-m">{challenge.title}</h4>
      </div>
      <ol className="relative flex flex-col gap-[22px] before:absolute before:top-3 before:bottom-3 before:left-[5px] before:w-px before:bg-line-strong before:content-['']">
        {steps.map((step) => (
          <li key={step.key} className={cn(stepBase, dot[step.tone])}>
            <span
              className={cn(
                "pt-0.5 font-mono text-label uppercase",
                step.tone === "decision" ? "text-accent" : "text-ink-3",
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
        "grid items-start gap-12 max-lg:grid-cols-[minmax(0,1fr)]",
        aside ? "grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "grid-cols-2",
      )}
    >
      {items.map((challenge) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} />
      ))}
      {aside ? (
        <aside
          aria-label="También en el proyecto"
          className="flex flex-col gap-3.5 border-t border-line pt-5"
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
