import { about } from "@/content/about";
import { GroundTrack } from "@/components/graphics/GroundTrack";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Label } from "@/components/ui/Text";

/** Sobre mí: formación, Fertal e intereses. A la izquierda queda fija la presentación. */
export function About() {
  return (
    <Section id="sobre-mi">
      <SectionHeader
        index="04 / 05"
        tag="Formación · Fertal · Intereses"
        title="Sobre mí"
      />

      <div className="grid grid-cols-12 items-start gap-x-6 max-lg:grid-cols-1 max-lg:gap-y-14">
        <div className="col-[1/span_5] flex flex-col gap-6 lg:sticky lg:top-24 max-lg:col-1">
          <p className="text-lead text-ink max-md:text-lead-m">{about.lead}</p>
          <p className="text-body text-ink-2 max-md:text-body-m">{about.body}</p>
          {about.reflection ? (
            <p className="text-body text-ink-2 max-md:text-body-m">
              {about.reflection}
            </p>
          ) : null}
          <figure
            aria-label="Ilustración de una traza terrestre satelital"
            data-reveal
            className="mt-2 overflow-hidden rounded-lg bg-surface inset-ring-1 inset-ring-line"
          >
            <GroundTrack />
            <figcaption className="flex justify-between border-t border-line px-5 py-3 font-mono text-[11px] leading-4 text-ink-3">
              <span>Traza terrestre ilustrativa</span>
              <span>CDU · i = 51,6°</span>
            </figcaption>
          </figure>
        </div>

        <div className="col-[7/span_6] flex flex-col gap-12 max-lg:col-1">
          {about.groups.map((group) => (
            <div key={group.title} data-reveal className="flex flex-col gap-5">
              <Label>{group.title}</Label>
              {/* Línea de tiempo: un punto de acento por ítem sobre un hilo vertical. */}
              <ul className="relative flex flex-col gap-6 pl-7 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-line-strong before:content-['']">
                {group.items.map((item) => (
                  <li
                    key={item.what}
                    className="relative flex flex-col gap-1.5 before:absolute before:top-[3px] before:-left-7 before:size-[11px] before:rounded-full before:bg-bg before:inset-ring-2 before:inset-ring-accent before:content-['']"
                  >
                    <span className="font-mono text-label uppercase text-accent">
                      {item.when}
                    </span>
                    <h4 className="text-[20px] leading-[1.25] font-semibold tracking-[-.015em] text-ink max-md:text-[18px]">
                      {item.what}
                    </h4>
                    <p className="text-small text-ink-2">{item.where}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
