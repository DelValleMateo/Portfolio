import type {
  CaseStudyData,
  MateUnicoArchitectureData,
  OtherProjectData,
  StugoArchitectureData,
} from "./types";

/* ==========================================================================
   DATOS PENDIENTES
   Descomentá y completá cada línea cuando tengas el dato.
   Mientras falte, `npm run dev` lo muestra como recuadro punteado y
   `npm run build` lo omite: nunca sale un placeholder al público.
   ========================================================================== */

const datos: {
  stugoTeam?: string;
  stugoDuration?: string;
  mateUnicoMode?: string;
  tiendaUrl?: string;
  cmsUrl?: string;
  ctiUrl?: string;
} = {
  stugoTeam: "Equipo de 4 personas",
  stugoDuration: "Sigue en desarrollo",
  mateUnicoMode: "equipo de 3 personas",
  ctiUrl: "https://centroterapeuticointegral.com.ar",
  // tiendaUrl: "tienda.ejemplo.com",                    // dominio, sin https://
  // cmsUrl: "cms.ejemplo.com",                       // dominio del panel de Strapi, sin https://
};

/* ---------- Caso 01 · STUGO ---------- */

export const stugo: CaseStudyData = {
  id: "stugo",
  number: "01",
  kind: "App móvil",
  format: "Proyecto en equipo",
  title: "STUGO",
  context:
    "App hiperlocal para Concepción del Uruguay: conecta a vecinos y visitantes con comercios, servicios, agenda, transporte y vivienda.",
  facts: [
    {
      label: "Rol",
      value:
        "Líder y owner full-stack del módulo «¿Qué necesito hoy?» (descubrimiento de lugares) y del portal de proveedores para dueños de comercios.",
    },
    {
      label: "Equipo",
      value: datos.stugoTeam
        ? `${datos.stugoTeam} · sprints quincenales`
        : "Sprints quincenales",
      todo: datos.stugoTeam ? undefined : "tamaño del equipo",
    },
    {
      label: "Duración",
      value: datos.stugoDuration,
      todo: datos.stugoDuration ? undefined : "duración",
    },
  ],
  stack: [
    "FastAPI",
    "Pydantic",
    "SQLAlchemy",
    "Alembic",
    "Neon Postgres",
    "React Native",
    "Expo",
    "OAuth 2.0 + PKCE",
    "Jest",
    "RN Testing Library",
  ],
  shots: {
    kind: "phone",
    swipeHint: "Deslizá para ver las {n} capturas",
    // Capturas de celular (739 × 1600) sin barra de estado, en /public/projects/stugo/.
    items: [
      {
        title: "Mapa y filtros",
        caption: "Mapa y filtros",
        src: "/projects/stugo/mapa.webp",
        alt: "Mapa de Concepción del Uruguay en STUGO, con buscador, filtros y puntos agrupados por zona (174 resultados)",
      },
      {
        title: "Inicio",
        caption: "Inicio",
        src: "/projects/stugo/inicio.webp",
        alt: "Inicio de STUGO: consulta al asistente, banner de promoción y accesos a «¿Qué quiero hacer?», «Buscar viaje» y «¿Qué necesito hoy?»",
      },
      {
        title: "Asistente STUGO",
        caption: "Asistente con IA",
        src: "/projects/stugo/asistente.webp",
        alt: "Asistente de STUGO: saludo, consultas rápidas (actividades de hoy, planes de la noche, viajes y lugares para comer) y campo para escribir o hablar",
      },
      {
        title: "¿Qué quiero hacer?",
        caption: "Actividades",
        src: "/projects/stugo/actividades.webp",
        alt: "«¿Qué quiero hacer?» en STUGO: filtros por fecha y categoría y tarjetas de actividades (146 planes)",
      },
    ],
  },
  architecture: {
    hint: "Contratos compartidos entre mobile y API; backend en capas.",
  },
  challenges: {
    label: "Desafíos",
    hint: "Problema → decisión → resultado.",
    items: [
      {
        id: "D.01",
        title: "Mobile y backend en paralelo",
        problem: {
          text: "Mobile y backend avanzaban en paralelo: sin un acuerdo previo, cada lado dependía de que el otro terminara.",
        },
        decision: {
          text: "Contratos de API tipados y compartidos en `API_CONTRACTS.md`, acordados antes de implementar.",
        },
        result: {
          text: "Mobile y backend avanzaron en paralelo sin bloquearse entre sí.",
        },
      },
      {
        id: "D.02",
        title: "Favoritos en la vía pública",
        problem: {
          text: "La app se usa en la calle, donde la conexión se corta. Marcar un favorito no puede depender de que la red responda.",
        },
        decision: {
          text: "Actualización optimista: la interfaz refleja el cambio al instante.",
          // PENDIENTE: qué hace la app ante pérdida de conexión. Escribilo como oración completa,
          // p. ej. "Ante pérdida de conexión, el cambio queda en una cola local y se reintenta."
          extra: undefined,
          todo: "mecanismo concreto ante pérdida de conexión",
        },
        result: {
          text: "El favorito responde al toque, con o sin señal.",
          // PENDIENTE: qué pasa al volver la conexión. Confirmá también que "con o sin señal" es cierto.
          extra: undefined,
          todo: "qué pasa al volver la conexión",
        },
      },
    ],
  },
};

export const stugoArchitecture: StugoArchitectureData = {
  nodes: [
    {
      kind: "Cliente",
      title: "App móvil",
      subtitle: "React Native + Expo",
      points: [
        "Mapa con implementación nativa y web",
        "Filtros multi-criterio",
        "Favoritos y perfiles de comercio",
        "Google Sign-In · OAuth 2.0 con PKCE",
      ],
    },
    {
      kind: "API",
      title: "FastAPI",
      layers: ["router", "service", "repository"],
      points: [
        "Pydantic para validación y esquemas",
        "SQLAlchemy como capa de acceso a datos",
      ],
    },
    {
      kind: "Datos",
      title: "Neon Postgres",
      points: ["Un branch por entorno", "Migraciones con Alembic"],
    },
  ],
  contractLabel: "API_CONTRACTS.md",
  notes: [
    { label: "Testing", value: "Jest + React Native Testing Library" },
    { label: "Proceso", value: "Sprints quincenales" },
  ],
};

/* ---------- Caso 02 · Mate Único ---------- */


export const mateUnico: CaseStudyData = {
  id: "mate-unico",
  number: "02",
  kind: "E-commerce headless",
  format: "Proyecto de facultad",
  title: "Mate Único",
  context:
    "Tienda online de mates artesanales con el contenido desacoplado de la presentación.",
  facts: [
    {
      label: "Formato",
      value: datos.mateUnicoMode
        ? `Proyecto de facultad · ${datos.mateUnicoMode}`
        : "Proyecto de facultad",
      todo: datos.mateUnicoMode ? undefined : "individual / en equipo",
      todoAfter: true,
    },
    {
      label: "Repo",
      prefix: "github.com/",
      value: "DelValleMateo/mate-unico",
      href: "https://github.com/DelValleMateo/mate-unico",
    },
    { label: "Ramas", value: "Flujo de trabajo con rama `develop`" },
  ],
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Strapi 5",
    "PostgreSQL",
    "Resend",
    "Nodemailer",
  ],
  shots: {
    kind: "browser",
    items: [
      {
        title: "Tienda · catálogo de mates",
        caption: "La tienda",
        src: "/projects/mate-unico/tienda.png",
        alt: "Catálogo de productos de Mate Único con filtros por tipo de mate y combos",
        url: datos.tiendaUrl,
        urlTodo: "dominio de la tienda",
      },
      {
        title: "Panel de Strapi",
        caption: "El dueño edita catálogo y contenido",
        src: "/projects/mate-unico/strapi.png",
        alt: "Panel de Strapi con la lista de productos de Mate Único",
        url: datos.cmsUrl ? `${datos.cmsUrl}/admin` : undefined,
        urlTodo: "dominio del CMS/admin",
      },
    ],
  },
  architecture: { hint: "Contenido y presentación en deploys separados." },
  challenges: {
    label: "Desafío",
    hint: "Un trade-off elegido a conciencia.",
    items: [
      {
        id: "D.01",
        title: "¿Por qué headless?",
        problem: {
          text: "El negocio necesita actualizar catálogo y contenido sin depender de alguien que toque código.",
        },
        decision: {
          text: "Strapi 5 como CMS headless sobre PostgreSQL, desacoplado del frontend en Next.js.",
        },
        result: {
          text: "El dueño administra catálogo y contenido por su cuenta, sin tocar código.",
        },
        cost: {
          text: "Dos deploys para mantener (frontend y CMS) en lugar de uno. Lo acepté porque la autonomía del dueño pesaba más.",
        },
      },
    ],
    aside: {
      label: "También",
      items: [
        { title: "Emails transaccionales", text: "Con Resend / Nodemailer." },
        { title: "Flujo de ramas", text: "Integración sobre `develop`." },
      ],
    },
  },
};

export const mateUnicoArchitecture: MateUnicoArchitectureData = {
  deploys: [
    {
      label: "Deploy 1 · Frontend",
      actor: "Cliente: navega la tienda",
      node: { title: "Next.js 16", subtitle: "React 19 · TypeScript · Tailwind CSS" },
    },
    {
      label: "Deploy 2 · CMS",
      actor: "Dueño: edita catálogo",
      node: { title: "Strapi 5", subtitle: "CMS headless" },
    },
  ],
  apiLabel: "contenido vía API",
  data: { kind: "Datos", title: "PostgreSQL" },
};

/* ---------- Otros proyectos ---------- */


export const otherProjects: OtherProjectData[] = [
  {
    id: "cti-web",
    index: "02.1",
    category: "Web",
    title: "CTI-WEB",
    summary: {
      text: "Plataforma y portal de autogestión para un centro terapéutico en Gualeguaychú.",
    },
    status: "En producción",
    points: [
      "Server Actions de Next.js 16",
      "JWT con jose",
      "Compresión de imágenes a WebP en el cliente",
    ],
    stack: ["Next.js 16", "Server Actions", "Neon", "jose", "WebP"],
    site: { url: datos.ctiUrl, todo: "url del sitio" },
    wide: true,
  },
  {
    id: "fertal",
    index: "02.2",
    category: "Sistema interno",
    title: "Fertal",
    summary: {
      text: "Sistema interno de pedidos y logística para mi emprendimiento gastronómico.",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
    contextLink: { label: "En Sobre mí", href: "#sobre-mi" },
  },
  {
    id: "ptah",
    index: "02.3",
    category: "Android",
    title: "PTAH",
    summary: {
      text: "Asistente conversacional para Android, con reconocimiento y síntesis de voz.",
    },
    stack: ["Kotlin", "Jetpack Compose", "Retrofit", "STT / TTS"],
  },
  {
    id: "aws",
    index: "02.4",
    category: "Datos",
    title: "Integración de datos en AWS",
    summary: {
      text: "Scripts en Python para manipular y cruzar datos entre servicios. Credenciales gestionadas con sesiones de AWS CLI.",
    },
    stack: ["Python", "Boto3", "Pandas", "AWS CLI"],
  },
  {
    id: "inmobiliaria-dure",
    index: "02.5",
    category: "Web",
    title: "Inmobiliaria Dure",
    summary: {
      text: "Sitio web para la inmobiliaria.",
      // PENDIENTE: qué resolvía, en una línea.
      extra: undefined,
      todo: "qué resolvía, en una línea",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Neon"],
    site: { url: "https://andreadure.com" },
  },
];
