import type { StackGroup } from "./types";

/** Stack agrupado por área, con el proyecto donde se usó. Sin niveles ni porcentajes. */
export const stackGroups: StackGroup[] = [
  {
    index: "03.1",
    title: "Frontend web",
    items: [
      { name: "TypeScript", where: "Mate Único" },
      { name: "Next.js", where: "Mate Único · CTI-WEB" },
      { name: "React", where: "Mate Único" },
      { name: "Tailwind CSS", where: "Mate Único" },
    ],
  },
  {
    index: "03.2",
    title: "Mobile",
    items: [
      { name: "React Native + Expo", where: "STUGO" },
      { name: "Kotlin + Jetpack Compose", where: "PTAH" },
      { name: "Jest + RN Testing Library", where: "STUGO" },
      { name: "OAuth 2.0 con PKCE", where: "STUGO" },
    ],
  },
  {
    index: "03.3",
    title: "Backend",
    items: [
      { name: "FastAPI", detail: "(Python)", where: "STUGO" },
      { name: "Strapi", detail: "(headless CMS)", where: "Mate Único" },
      { name: "Node.js" },
      { name: "JWT con jose", where: "CTI-WEB" },
    ],
  },
  {
    index: "03.4",
    title: "Datos",
    items: [
      { name: "PostgreSQL", detail: "(Neon)", where: "STUGO · CTI-WEB" },
      { name: "SQLAlchemy + Alembic", where: "STUGO" },
      { name: "Modelado relacional" },
      { name: "Python: Boto3, Pandas", where: "AWS" },
    ],
  },
  {
    index: "03.5",
    title: "Infra y herramientas",
    items: [
      { name: "Git", where: "Flujo con develop" },
      { name: "Docker" },
      { name: "Neon branching", where: "STUGO" },
      { name: "AWS CLI", where: "AWS" },
    ],
  },
  {
    index: "03.6",
    title: "Análisis y proceso",
    items: [
      { name: "Relevamiento de requisitos", where: "Formación" },
      { name: "Metodologías ágiles", where: "STUGO" },
      { name: "Análisis de sistemas", where: "Formación" },
      { name: "Contratos de API", where: "STUGO" },
    ],
  },
];
