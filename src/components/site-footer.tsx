import Link from "next/link";
import { footerNav, site, socials } from "@data/site";
import { AwardBadge } from "@/components/award-badge";
import { SocialIcon } from "@/components/social-icon";

export function SiteFooter() {
  return (
    <footer className="section-ridge relative z-10 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl">Anish Singh Walia</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Technical content for B2B SaaS, developer-tool, cloud and AI-native companies. Based in {site.location.label}.
          </p>
          <a className="mt-3 inline-block text-sm text-ember hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="mt-5">
            <AwardBadge />
          </div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">Navigate</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">{item.label}</Link>
              </li>
            ))}
            <li><Link href="/game" className="hover:text-cream">Game room</Link></li>
            <li><Link href="/ask" className="hover:text-cream">Ask</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">Elsewhere</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group inline-flex items-center gap-2.5 text-muted hover:text-cream" aria-label={`${item.label} profile`}>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-panel text-cream/80 transition group-hover:border-orange/60 group-hover:text-ember">
                    <SocialIcon id={item.icon} />
                  </span>
                  <span>{item.label} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-faint">There is one hidden thing on this site. It needs ten keys.</p>
        </div>
      </div>
    </footer>
  );
}
