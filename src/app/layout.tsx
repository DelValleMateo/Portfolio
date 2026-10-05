import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import "./globals.css";

// Fuente variable (peso 200–800): el eje de tamaño óptico ajusta el trazo en títulos grandes.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

// Solo para metadatos: labels, coordenadas, chips.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  title,
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    title,
    description: site.description,
    type: "website",
    locale: "es_AR",
  },
};

/**
 * Aplica el tema antes de pintar, para que no haya destello al cargar:
 * lo que guardó el visitante, o si no el del sistema, o si no oscuro.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es-AR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Sin JavaScript no corre el observer de aparición: todo queda visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
