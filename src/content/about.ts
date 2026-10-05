/** Contenido de "Sobre mí". */

export const about = {
  lead: "Soy Analista de Sistemas por la UADER y estoy cursando 4.º año de la Licenciatura en Sistemas de Información.",
  body: "Desde noviembre de 2024 llevo adelante Fertal, mi emprendimiento gastronómico: desarrollé su plataforma web y también me ocupo de la operación diaria y de negociar con proveedores.",
  // PENDIENTE (opcional): en tus palabras, qué te dejó operar un negocio real como
  // desarrollador. Una o dos líneas. Sin dato, el bloque no se muestra.
  reflection: undefined as string | undefined,
  groups: [
    {
      title: "Formación",
      items: [
        {
          when: "2023 — 2025",
          what: "Analista de Sistemas",
          where: "UADER · Facultad de Ciencia y Tecnología",
        },
        {
          when: "En curso · 4.º año",
          what: "Licenciatura en Sistemas de Información",
          where: "UADER · Facultad de Ciencia y Tecnología",
        },
        {
          when: "Certificación",
          what: "Ethical Hacker",
          where: "Cisco Networking Academy",
        },
      ],
    },
    {
      title: "Experiencia emprendedora",
      items: [
        {
          when: "Nov. 2024 — hoy",
          what: "Fundador de Fertal",
          where:
            "Emprendimiento gastronómico. Desarrollo de la plataforma web, operación diaria y negociación con proveedores.",
        },
      ],
    },
    {
      title: "Intereses",
      items: [
        {
          when: "Seguridad",
          what: "Seguridad ofensiva",
          where: "En línea con la certificación Ethical Hacker de Cisco.",
        },
        {
          when: "Espacio",
          what: "Astronomía, seguimiento satelital y tecnologías espaciales",
          where: "De ahí las órbitas y la telemetría de este sitio.",
        },
      ],
    },
  ],
};
