import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Albert_Sans, Martian_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-albert-sans",
  display: "swap",
});

// Solo para metadatos: labels, coordenadas, chips.
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-martian-mono",
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
      className={`${albertSans.variable} ${martianMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
