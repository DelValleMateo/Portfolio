import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { labelClass } from "@/components/ui/Text";

const miniButton =
  "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-mono text-label whitespace-nowrap text-ink uppercase inset-ring-1 inset-ring-line-control transition-shadow duration-150 hover:inset-ring-ink focus-ring";

const linkedinHandle = site.links.linkedin
  .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
  .replace(/\/$/, "");
const githubHandle = site.links.github.replace(/^https?:\/\/github\.com\//, "");

const rowValue =
  "rounded-xs text-[18px] leading-[1.35] font-medium tracking-[-.01em] text-ink [overflow-wrap:anywhere] max-md:text-[16px] focus-ring";

/** Contacto: llamado a escribir un mail y lista de canales. */
export function Contact() {
  const mailto = `mailto:${site.links.email}`;

  return (
    <Section id="contacto">
      <SectionHeader index="05 / 05" tag="Contacto" />

      <div
        data-reveal
        className="grid grid-cols-12 items-start gap-x-6 rounded-xl bg-surface p-14 inset-ring-1 inset-ring-line-strong max-lg:grid-cols-1 max-lg:gap-y-12 max-lg:p-10 max-md:p-6"
      >
        <div className="col-[1/span_6] flex flex-col items-start gap-7 max-lg:col-1">
          <h2 className="text-h2 max-md:text-h2-m">
            ¿Buscás a alguien <span className="whitespace-nowrap">full-stack</span> o
            mobile? <span className="text-accent">Hablemos.</span>
          </h2>
          <p className="max-w-[460px] text-body text-ink-2 max-md:text-body-m">
            Busco roles full-stack o mobile, en Argentina o remoto. Lo más rápido
            es un mail.
          </p>
          <Button href={mailto} className="max-md:w-full">
            Escribime un mail <Icon name="ne" />
          </Button>
        </div>

        <ul className="col-[8/span_5] border-t border-line-strong max-lg:col-1">
          <ContactRow
            label="Email"
            value={
              <a href={mailto} className={rowValue}>
                {site.links.email}
              </a>
            }
            action={<CopyEmailButton email={site.links.email} />}
          />
          <ContactRow
            label="Teléfono"
            value={
              <a href={site.links.phoneHref} className={rowValue}>
                {site.links.phone}
              </a>
            }
            action={
              <a
                href={site.links.phoneHref}
                aria-label="Llamar por teléfono"
                className={miniButton}
              >
                Llamar
                <Icon name="ne" size={14} />
              </a>
            }
          />
          <ContactRow
            label="LinkedIn"
            value={
              <a href={site.links.linkedin} className={rowValue}>
                {linkedinHandle}
              </a>
            }
            action={
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir LinkedIn"
                className={miniButton}
              >
                Abrir
                <Icon name="ne" size={14} />
              </a>
            }
          />
          <ContactRow
            label="GitHub"
            value={
              <a href={site.links.github} className={rowValue}>
                {githubHandle}
              </a>
            }
            action={
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir GitHub"
                className={miniButton}
              >
                Abrir
                <Icon name="ne" size={14} />
              </a>
            }
          />
        </ul>
      </div>
    </Section>
  );
}

function ContactRow({
  label,
  value,
  action,
}: {
  label: string;
  value: ReactNode;
  action: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line py-[22px] max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-y-1.5 max-md:py-[18px]">
      <span className={cn(labelClass.muted, "max-md:col-[1/-1]")}>{label}</span>
      {value}
      <span className="flex gap-2">{action}</span>
    </li>
  );
}
