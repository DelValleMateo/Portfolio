import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const { city, region, lat, lon } = site.location;
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-7 pb-9 font-mono text-[12px] leading-[18px] text-ink-3 max-md:flex-col max-md:items-start max-md:gap-1.5 max-md:pt-6 max-md:pb-8">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          {city}, {region} · {lat} {lon}
        </span>
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 rounded-xs text-ink focus-ring max-md:mt-2.5"
        >
          Volver arriba <Icon name="up" size={14} />
        </a>
      </div>
    </footer>
  );
}
