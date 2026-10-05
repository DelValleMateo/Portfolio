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
            className="mt-2 overflow-hidden rounded-sm inset-ring-1 inset-ring-line"
          >
            <GroundTrack />
            <figcaption className="flex justify-between border-t border-line px-3.5 py-2.5 font-mono text-[11px] leading-4 text-ink-3">
              <span>Traza terrestre ilustrativa</span>
              <span>CDU · i = 51,6°</span>
            </figcaption>
          </figure>
        </div>

        <div className="col-[7/span_6] flex flex-col gap-12 max-lg:col-1">
          {about.groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <Label tone="ink">{group.title}</Label>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item.what}
                    className="grid grid-cols-[152px_1fr] gap-x-6 border-t border-line py-4 max-md:grid-cols-[minmax(0,1fr)] max-md:gap-y-1 max-md:py-3.5"
                  >
                    <span className="pt-[3px] font-mono text-[12px] leading-5 text-ink-3">
                      {item.when}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[17px] leading-[1.4] font-semibold tracking-[-.005em] text-ink">
                        {item.what}
                      </h4>
                      <p className="text-small text-ink-2">{item.where}</p>
                    </div>
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
