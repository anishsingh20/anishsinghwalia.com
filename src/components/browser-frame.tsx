import Image from "next/image";
import { SmartLink } from "@/components/smart-link";

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
    <SmartLink href={href} className="block transition hover:border-orange/50">
      {frame}
    </SmartLink>
  );
}

export function ArtifactFallback({
  company,
  title,
  meta,
  quote,
}: {
  company: string;
  title: string;
  meta: string;
  quote?: string;
}) {
  return (
    <figure className="flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{company}</p>
      {quote ? (
        <blockquote className="font-display text-xl leading-snug text-cream">“{quote}”</blockquote>
      ) : (
        <p className="font-display text-2xl leading-tight text-cream">{title}</p>
      )}
      <p className="text-sm text-muted">{meta}</p>
    </figure>
  );
}
