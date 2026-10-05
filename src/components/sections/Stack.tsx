import { stackGroups } from "@/content/stack";
import { Section, SectionHeader } from "@/components/ui/Section";
import { StackGrid } from "@/components/sections/StackGrid";

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
      <StackGrid groups={stackGroups} />
    </Section>
  );
}
