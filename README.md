# Portfolio · Mateo del Valle

Sitio personal de una sola página. Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4.

Diseño: oscuro por defecto, con modo claro; estilo «centro de control», con guiños al espacio (órbitas, radar, grilla de coordenadas, telemetría). Un solo acento ámbar (el coral queda solo para el «Costo» de los desafíos), tarjetas de 24 px y controles en píldora. Tipografías: Bricolage Grotesque para texto y JetBrains Mono solo para metadatos.

## Cómo correrlo

Requiere Node 20.9 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # chequeo de tipos
npm run build && npm start   # versión de producción
```

Las fuentes se descargan de Google Fonts durante `dev` y `build` (las maneja `next/font`), así que hace falta conexión la primera vez.

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx          fuentes, metadatos y script del tema (sin destello al cargar)
│  ├─ page.tsx            arma la página: Header, secciones, Footer
│  ├─ globals.css         tokens por tema + escala tipográfica → utilidades de Tailwind
│  ├─ components.css      las pocas piezas que no se expresan bien con utilidades
│  └─ icon.svg            favicon
├─ content/               TODO el texto del sitio, tipado
│  ├─ site.ts             nombre, links, navegación, telemetría
│  ├─ projects.ts         STUGO, Mate Único y otros proyectos  ← acá van los pendientes
│  ├─ stack.ts            stack por área
│  ├─ about.ts            formación, Fertal, intereses
│  └─ types.ts
├─ components/
│  ├─ layout/             Header, Footer, ThemeToggle, reloj de Buenos Aires
│  ├─ sections/           Hero, FeaturedProjects, OtherProjects, Stack, About, Contact
│  ├─ case/               CaseStudy, capturas, arquitectura, desafíos
│  ├─ graphics/           OrbitDiagram, OrbitSatellites (animados) y GroundTrack (SVG con código)
│  └─ ui/                 Button, Chip, TextLink, Icon, Section, Text, Pending
└─ lib/cn.ts
```

## Cómo completar el contenido

Todo el texto vive en `src/content/`. Los componentes solo lo muestran.

**Datos pendientes.** Lo que todavía no confirmaste está en `undefined`. En `npm run dev` se ve como un recuadro punteado para que sepas qué falta; en producción (`npm run build`) ese dato directamente no se muestra, así que nunca sale un placeholder al público. Arriba de `src/content/projects.ts` hay un objeto `datos` con las líneas para descomentar:

| Dato | Dónde |
| --- | --- |
| Repo de STUGO (link o «repo privado de equipo») | `datos` en `projects.ts` |
| Individual o en equipo (Mate Único) | `datos` en `projects.ts` |
| Dominio de la tienda y del panel de Strapi | `datos` en `projects.ts` |
| URL de CTI-WEB | `datos` en `projects.ts` |
| Mecanismo offline de favoritos y qué pasa al volver la conexión | `extra` del desafío D.02 en `projects.ts` |
| Stack de Fertal y de Perfumería Alexis, y qué resolvía el sitio de la perfumería | `otherProjects` en `projects.ts` |
| Reflexión sobre Fertal (opcional) | `reflection` en `about.ts` |

Antes de publicar, confirmá también la frase «con o sin señal» del resultado de D.02: afirma que los favoritos funcionan sin conexión.

**Capturas.** Las de STUGO ya están cargadas (mapa, inicio, asistente y actividades) en `public/projects/stugo/`, en WebP y sin la barra de estado del celular. Para cambiar una o sumar otra, poné la imagen en esa carpeta y completá `src`, `alt` y `caption` en `shots.items` de `src/content/projects.ts`:

```ts
{ title: "Mapa y filtros", caption: "Mapa y filtros",
  src: "/projects/stugo/mapa.webp", alt: "Mapa de Concepción del Uruguay en STUGO…" }
```

Para STUGO usá capturas de celular en proporción 390 × 844 (las actuales son 739 × 1600 sin la barra de estado). Para Mate Único, capturas de escritorio (16:10, por ejemplo 1440 × 900); van en `public/projects/mate-unico/`. Mientras un caso no tenga ninguna captura, se ve a una sola columna; con la primera ya aparece el marco.

Con hasta 3 capturas de celular el caso usa columnas 5 + 6; con 4 pasa a 4 + 8 para que entren en una fila. Por debajo de 1280 px el texto y las capturas se apilan, y en mobile las capturas son una tira que se desliza con el dedo.

**Hover en los celulares.** Desde 768 px y con mouse, al pasar por encima un celular se agranda un 10 %, sube unos píxeles y proyecta sombra; el borde se aclara y el número del pie se pone en acento. Está todo en `PhoneShots` (`Shots.tsx`): el tamaño es `md:hover:scale-110` y la altura `md:hover:-translate-y-1.5` en el `<figure>`, la sombra es `shadow-lift` (token `--elevation` en `globals.css`, uno por tema). En pantallas táctiles no hay hover, y en mobile tampoco se aplica porque la tira que se desliza recortaría el celular agrandado. Con `prefers-reduced-motion` el cambio es instantáneo, sin transición (ver la nota de Windows en «Animación de las órbitas»).

## Tema claro y oscuro

Los colores son variables CSS (`--bg`, `--ink`, `--accent`…) definidas en `globals.css` para `[data-theme="dark"]` y `[data-theme="light"]`. Tailwind las expone como `bg-surface`, `text-ink-2`, `border-line`, `inset-ring-line-control`, etc. No hay valores de color sueltos: si necesitás un color nuevo, agregalo como token. Lo mismo vale para la sombra de elevación (`--elevation` → `shadow-lift`), que cambia de intensidad según el tema.

El tema se aplica antes de pintar (script en `layout.tsx`): usa lo que guardó el visitante en `localStorage`, si no el del sistema, y si no oscuro. El botón del header lo alterna.

La escala tipográfica también son tokens (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label`, `text-meta`, `text-chip`, más las variantes mobile `-m`). Cada una trae tamaño, interlineado, tracking y peso.

## Decisiones respecto de los artboards

El sitio coincide con los artboards de 1440 y 390 px. Estas cosas no estaban dibujadas y las resolví así:

- **Header fijo** arriba, con el ítem de la sección visible resaltado. La columna izquierda de «Sobre mí» queda fija debajo del header.
- **Menú mobile**: el botón «Menú» abre un panel con los cuatro links; se cierra con Escape, al elegir un link o al pasar a desktop.
- **Anchos intermedios**: de 1280 px para arriba, el hero es el del artboard. Entre 768 y 1279, el panel de telemetría pasa a la columna y las órbitas se recortan contra el borde. Por debajo de 1024 px, los casos, los diagramas y los desafíos se apilan (el caso de STUGO, con sus cuatro celulares, ya se apila por debajo de 1280 px). Por debajo de 768 px, es el layout mobile.
- **Footer en mobile**: en el artboard quedaba pegado al borde de la pantalla; acá tiene el margen lateral de 20 px.
- **Link del repo de Mate Único**: se ve como `github.com/DelValleMateo/mate-unico`, sin el espacio que tenía en el artboard.
- **Hora de la telemetría**: es la hora real de Argentina (UTC-3), actualizada en el cliente.
- **Satélites en movimiento**: el artboard era estático; ahora giran (ver «Animación de las órbitas»). El primer cuadro coincide con el dibujo original.
- **Accesibilidad**: link «Saltar al contenido», foco visible con anillo de acento, `prefers-reduced-motion` respetado (los satélites quedan quietos y el hover de los celulares cambia sin transición).

## Animación de las órbitas

En el hero, los tres satélites (STUGO, Mate Único y el tercero) giran alrededor de CDU. El anillo, las órbitas y la estación son SVG de servidor (`OrbitDiagram.tsx`); solo los satélites son un componente de cliente (`OrbitSatellites.tsx`), que mueve el `transform` de cada uno con `requestAnimationFrame` y sin renders de React por cuadro. La geometría de las órbitas está en `orbit-geometry.ts`.

**Se pueden tocar.** Uno de los tres está encendido (naranja); al tocar otro se enciende y el anterior se apaga. Es solo un énfasis visual (el diagrama sigue siendo `aria-hidden`; la información está en las secciones de abajo). El tercero muestra su etiqueta («03 OTROS PROYECTOS») solo mientras está encendido. El toque no usa eventos del SVG (el copy del hero está por encima del diagrama y los taparía): `OrbitSatellites` escucha el clic en el hero y lo compara con la posición actual de cada satélite, así que funciona aunque el satélite pase detrás del texto. No pisa links ni botones. En desktop, al pasar el mouse por un satélite apagado aparece un halo tenue y el cursor cambia a mano.

Lo que se ajusta, todo arriba de `OrbitSatellites.tsx`:

| Qué | Dónde |
| --- | --- |
| Velocidad (segundos por vuelta) | `period` de cada satélite en `SATELLITES`. Hoy 48 / 33 / 18 s, aproximando la tercera ley de Kepler: cuanto más grande la órbita, más lenta |
| Posición de arranque | `phi0` (grados). Con JS apagado o con `prefers-reduced-motion` el diagrama queda quieto ahí |
| Sentido de giro | `DIRECTION`: `1` horario, `-1` antihorario |
| Cuál arranca encendido | `INITIAL_ACTIVE` (0, 1 o 2) |
| Textos de las etiquetas | `label` de cada satélite |

**Movimiento reducido.** Con `prefers-reduced-motion: reduce` los satélites no se mueven (se pueden tocar igual). En Windows ese valor sale de *Configuración → Accesibilidad → Efectos visuales → Efectos de animación*: si está desactivado, el navegador reporta movimiento reducido y no vas a ver girar nada. Para probar sin tocar Windows: en Chrome, DevTools → ⋮ → Más herramientas → Renderización → «Emular la función multimedia CSS prefers-reduced-motion» → `no-preference`.

Otros comportamientos: se detiene cuando el diagrama sale de pantalla y no da saltos al volver de una pestaña en segundo plano. Las etiquetas acompañan a cada satélite y se atenúan al pasar cerca del texto del hero (los bloques marcados con `data-orbit-avoid`, hoy la columna del copy en `Hero.tsx`); cuando dos etiquetas se cruzan, cede la del satélite que no está encendido. En mobile las etiquetas están ocultas, así que ahí solo se ven los puntos girando.

## Animaciones de la interfaz

Todas respetan `prefers-reduced-motion` (con movimiento reducido no se mueve nada) y ninguna esconde información sin JavaScript.

| Qué | Dónde | Detalle |
| --- | --- | --- |
| Radar del hero | `OrbitDiagram.tsx` + `components.css` (`.radar-sweep`, `.cdu-ping`) | Un sector gira alrededor de CDU (10 s por vuelta) y la estación emite un pulso cada 3,6 s. Sin movimiento no se dibuja el barrido |
| Nombre «decodificado» | `ScrambleText.tsx` (usado en `Hero.tsx`) | Las letras pasan por símbolos y se fijan de izquierda a derecha en 0,9 s. Una sola vez por sesión (`sessionStorage`) |
| Aparición al scroll | `RevealOnScroll.tsx` + `[data-reveal]` en `components.css` | Cualquier elemento con `data-reveal` aparece al entrar en pantalla; `--i` escalona la entrada de a 70 ms |
| Stack interactivo | `StackGrid.tsx` | Al pasar el mouse por una tecnología se enciende, en todas las tarjetas, el nombre de sus proyectos |
| Puntos «en vivo» | `Telemetry.tsx`, `OtherProjects.tsx` | `motion-safe:animate-pulse` |

## Estilos: cómo está armado

Los componentes usan utilidades de Tailwind directamente en el JSX. Lo repetido está abstraído en componentes de React (`Button`, `Chip`, `TextLink`, `Section`…), no en `@apply`. `components.css` guarda solo lo que se lee mejor como CSS: la grilla del hero con su máscara, el placeholder de captura y las flechas de los diagramas de arquitectura.

Dos reglas para sumar clases: escribirlas completas en el código (nada de armar nombres con variables, Tailwind no las detectaría) y combinarlas con `cn()` de `src/lib/cn.ts`.

## Deploy

Funciona tal cual en Vercel: importás el repo y no hace falta configurar nada. Antes de publicar, revisá `title` y `description` en `src/content/site.ts`, y si querés una imagen para compartir en redes, sumá `openGraph.images` en `layout.tsx`.
