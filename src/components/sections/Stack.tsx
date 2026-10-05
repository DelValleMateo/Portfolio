import { stackGroups } from "@/content/stack";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Label } from "@/components/ui/Text";

/** Stack agrupado por área, con el proyecto donde se usó. Sin barras ni porcentajes. */
export function Stack() {
  return (
    <Section id="stack">
      <SectionHeader
        index="03 / 05"
        tag={`${stackGroups.length} áreas`}
        title="Stack"
        lede="Agrupado por área y con el proyecto donde lo usé. Sin barras ni porcentajes: el nivel se ve en los proyectos."
      />

      <div className="border-t border-ink">
        {stackGroups.map((group) => (
          <div
            key={group.index}
            className="grid grid-cols-12 gap-x-6 border-b border-line pt-8 pb-7 max-md:grid-cols-1 max-md:gap-y-3 max-md:pt-6 max-md:pb-[18px]"
          >
            <div className="col-[1/span_3] flex flex-col gap-1.5 max-md:col-1 max-md:flex-row max-md:items-baseline max-md:gap-3">
              <Label>{group.index}</Label>
              <h3 className="text-h3 max-md:text-h3-m">{group.title}</h3>
            </div>
            <ul className="col-[4/span_9] grid grid-cols-2 gap-x-12 max-lg:grid-cols-[minmax(0,1fr)] max-md:col-1">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex min-w-0 items-baseline gap-3 py-[9px] max-md:py-[7px]"
                >
                  <span className="text-[17px] leading-[1.4] font-medium whitespace-nowrap text-ink max-md:text-[16px] max-md:whitespace-normal">
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
                  {item.where ? (
                    <>
                      <i className="min-w-3 flex-1 -translate-y-1 border-b border-dotted border-line-control" />
                      <span className="font-mono text-[12px] leading-4 whitespace-nowrap text-ink-3">
                        {item.where}
                      </span>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
