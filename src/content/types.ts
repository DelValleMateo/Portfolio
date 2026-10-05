/**
 * Tipos del contenido del sitio.
 *
 * Convención de pendientes: lo que todavía no confirmaste queda en `undefined`
 * y lleva un campo `todo` con la pista de qué falta. En `npm run dev` ese hueco
 * se ve como un recuadro punteado; en producción (`npm run build`) el dato
 * simplemente no se muestra. Nunca sale un placeholder al público.
 */

/** Texto con un tramo opcional que todavía hay que confirmar. */
export type Copy = {
  /** Texto ya confirmado. Los `backticks` se muestran como código. */
  text: string;
  /** Continuación del texto, cuando tengas el dato. */
  extra?: string;
  /** Pista de lo que falta (solo se ve en desarrollo). */
  todo?: string;
};

/** Fila de la tabla de datos de un caso (Rol, Equipo, Repo…). */
export type Fact = {
  label: string;
  value?: string;
  /** Si está, el valor es un link. */
  href?: string;
  /** Parte del link que se oculta en mobile (por ejemplo `github.com/`). */
  prefix?: string;
  /** Pista de lo que falta (solo se ve en desarrollo). */
  todo?: string;
  /** Por defecto el pendiente va antes del valor; con `true`, después. */
  todoAfter?: boolean;
};

/** Una captura dentro de un marco de celular o de navegador. */
export type Shot = {
  /** Título del placeholder (solo se ve en desarrollo). */
  title: string;
  /** Epígrafe debajo de la captura. */
  caption: string;
  /** Ruta dentro de /public, p. ej. `/projects/stugo/01.png`. Sin `src`, la captura no se muestra en producción. */
  src?: string;
  alt?: string;
  /** Solo marcos de navegador: dominio que se muestra en la barra. */
  url?: string;
  urlTodo?: string;
};

export type Challenge = {
  id: string;
  title: string;
  problem: Copy;
  decision: Copy;
  result: Copy;
  /** Costo o trade-off aceptado (opcional). */
  cost?: Copy;
};

export type CaseStudyData = {
  /** Se usa para ids y aria-labelledby. */
  id: string;
  number: string;
  kind: string;
  format: string;
  title: string;
  context: string;
  facts: Fact[];
  stack: string[];
  shots: {
    kind: "phone" | "browser";
    items: Shot[];
    /** Ayuda en mobile (la tira de capturas se desliza). `{n}` se reemplaza por la cantidad de capturas. */
    swipeHint?: string;
  };
  architecture: { hint: string };
  challenges: {
    label: string;
    hint: string;
    items: Challenge[];
    aside?: { label: string; items: { title: string; text: string }[] };
  };
};

export type ArchNodeData = {
  kind?: string;
  title: string;
  subtitle?: string;
  layers?: string[];
  points?: string[];
};

export type StugoArchitectureData = {
  nodes: [ArchNodeData, ArchNodeData, ArchNodeData];
  contractLabel: string;
  notes: { label: string; value: string }[];
};

export type MateUnicoArchitectureData = {
  deploys: [
    { label: string; actor: string; node: { title: string; subtitle: string } },
    { label: string; actor: string; node: { title: string; subtitle: string } },
  ];
  apiLabel: string;
  data: { kind: string; title: string };
};

export type OtherProjectData = {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: Copy;
  status?: string;
  points?: string[];
  stack: string[];
  stackTodo?: string;
  /** Muestra el pie con el link al sitio. Sin `url`, en producción el pie no se muestra. */
  site?: { url?: string; todo?: string };
  /** Pie alternativo: link interno (se usa en Fertal). */
  contextLink?: { label: string; href: string };
  wide?: boolean;
};

export type StackGroup = {
  index: string;
  title: string;
  items: { name: string; detail?: string; where?: string }[];
};
