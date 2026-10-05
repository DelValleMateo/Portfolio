/** Datos generales del sitio: identidad, links, navegación y telemetría del hero. */

export const site = {
  name: "Mateo del Valle",
  role: "Desarrollador full-stack",
  degree: "Analista de Sistemas",
  value:
    "Construyo productos web y mobile de punta a punta: del relevamiento y el modelo de datos a la interfaz. Y puedo explicar por qué decidí cada cosa.",
  description:
    "Portfolio de Mateo del Valle, desarrollador full-stack y Analista de Sistemas en Concepción del Uruguay, Entre Ríos. Proyectos web y mobile contados como casos: problema, decisión y resultado.",
  location: {
    city: "Concepción del Uruguay",
    region: "Entre Ríos",
    country: "Argentina",
    /** Coordenadas de la ciudad, para la telemetría y la grilla del hero. */
    lat: "32°29'S",
    lon: "58°14'O",
    timeZone: "America/Argentina/Buenos_Aires",
  },
  links: {
    github: "https://github.com/DelValleMateo",
    linkedin: "https://www.linkedin.com/in/mateo-del-valle-03aa40359/",
    email: "mateodelvalle100@gmail.com",
    phone: "+54 9 3446 52-0649",
    phoneHref: "tel:+5493446520649",
  },
  /** Cada id es el de una sección de la página. */
  nav: [
    { id: "proyectos", label: "Proyectos" },
    { id: "stack", label: "Stack" },
    { id: "sobre-mi", label: "Sobre mí" },
    { id: "contacto", label: "Contacto" },
  ],
  /** Qué ítem del menú se enciende para cada sección de la página. */
  navForSection: {
    top: null,
    proyectos: "proyectos",
    "mate-unico": "proyectos",
    otros: "proyectos",
    stack: "stack",
    "sobre-mi": "sobre-mi",
    contacto: "contacto",
  } as Record<string, string | null>,
  telemetry: {
    searching: "Rol full-stack / mobile",
    mode: "Argentina · Remoto",
  },
};
