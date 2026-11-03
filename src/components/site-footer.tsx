import Link from "next/link";
import { site, socials } from "@data/site";
import { AwardBadge } from "@/components/award-badge";
import { SocialIcon } from "@/components/social-icon";

export function SiteFooter() {
  return (
    <footer className="section-ridge relative z-10 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl">Anish Singh Walia</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Technical content creator. Videos, deep dives, LinkedIn posts, docs, and newsletters for B2B, SaaS, AI-native, and developer-tool companies. Based in {site.location.label}.
          </p>
          <a className="mt-3 inline-block text-sm text-ember hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="mt-5">
            <AwardBadge />
          </div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">Profiles</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group inline-flex items-center gap-2.5 text-muted hover:text-cream" aria-label={`${item.label} profile`}>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-panel text-cream/80 transition group-hover:border-orange/60 group-hover:text-ember">
                    <SocialIcon id={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">On this site</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            <li><Link href="/services" className="hover:text-cream">Services</Link></li>
            <li><Link href="/work" className="hover:text-cream">Work</Link></li>
            <li><Link href="/game" className="hover:text-cream">Game Room</Link></li>
            <li><Link href="/ask" className="hover:text-cream">Ask me anything</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Work with me</Link></li>
          </ul>
          <p className="mt-4 font-mono text-xs text-faint">There is one hidden thing on this site. It needs ten keys.</p>
        </div>
      </div>
    </footer>
  );
}
