import {
  mateUnico,
  mateUnicoArchitecture,
  stugo,
  stugoArchitecture,
} from "@/content/projects";
import {
  MateUnicoArchitecture,
  StugoArchitecture,
} from "@/components/case/Architecture";
import { CaseStudy } from "@/components/case/CaseStudy";
import { Section, SectionHeader } from "@/components/ui/Section";

/** Proyectos destacados: STUGO y Mate Único, contados como casos. */
export function FeaturedProjects() {
  return (
    <>
      <Section id="proyectos">
        <SectionHeader
          index="01 / 05"
          tag="2 casos"
          title="Proyectos destacados"
          lede="Dos proyectos contados como casos: qué problema había, qué decidí y qué resultó."
        />
        <CaseStudy
          data={stugo}
          architecture={<StugoArchitecture data={stugoArchitecture} />}
        />
      </Section>

      <Section
        id="mate-unico"
        continuation
        ariaLabel="Proyectos destacados, caso 02"
      >
        <CaseStudy
          reverse
          data={mateUnico}
          architecture={<MateUnicoArchitecture data={mateUnicoArchitecture} />}
        />
      </Section>
    </>
  );
}
