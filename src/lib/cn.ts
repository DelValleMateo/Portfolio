/** Une clases condicionales. Las clases de Tailwind tienen que estar completas en el código (nada de armar nombres con variables). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
