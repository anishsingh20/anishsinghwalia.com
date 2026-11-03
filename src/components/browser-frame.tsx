import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  href,
  caption,
}: {
  src: string;
  alt: string;
  href?: string;
  caption?: string;
}) {
  const frame = (
    <figure className="overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex items-center gap-1.5 border-b border-line bg-ink px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        {href ? <span className="ml-2 truncate font-mono text-[10px] text-faint">{href.replace(/^https?:\/\//, "")}</span> : null}
      </div>
      <div className="relative aspect-[16/10] bg-ink">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 560px, 100vw" />
      </div>
      {caption ? <figcaption className="px-4 py-2 text-xs text-faint">{caption}</figcaption> : null}
    </figure>
  );
  if (!href) return frame;
  if (href.startsWith("/")) {
    return frame;
  }
  return (
    <a href={href} className="block transition hover:border-orange/50">
      {frame}
    </a>
  );
}

export function ArtifactFallback({
  company,
  title,
  meta,
}: {
  company: string;
  title: string;
  meta: string;
}) {
  return (
    <figure className="flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-2xl border border-line bg-[linear-gradient(160deg,#211c18,rgba(232,97,31,0.18),#0c0b0a)] p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{company}</p>
      <p className="mt-2 font-display text-2xl leading-tight text-cream">{title}</p>
      <p className="mt-2 text-sm text-muted">{meta}</p>
    </figure>
  );
}
