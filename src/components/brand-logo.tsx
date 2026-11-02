import { brandLogos, monogram } from "@data/logos";

type Size = "sm" | "md" | "lg";

const chip: Record<Size, string> = {
  sm: "h-9 w-9 rounded-lg",
  md: "h-12 w-12 rounded-xl",
  lg: "h-14 w-14 rounded-2xl",
};

const mark: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};

/**
 * A company mark on a light chip. Every logo sits at the same height on the
 * same cream background, so brand colours read and dark marks stay visible.
 * Falls back to a two-letter monogram when there is no file for the name.
 */
export function BrandLogo({ name, size = "md", className = "" }: { name: string; size?: Size; className?: string }) {
  const logo = brandLogos[name];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-cream ring-1 ring-cream/20 ${chip[size]} ${className}`}
      title={name}
    >
      {logo ? (
        // Plain img: these are tiny static assets and some are SVG, which next/image won't optimise.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo.src} alt="" className={`${mark[size]} object-contain`} loading="lazy" decoding="async" />
      ) : (
        <span className="font-display text-xs font-semibold tracking-tight text-ink" aria-hidden="true">
          {monogram(name)}
        </span>
      )}
    </span>
  );
}
