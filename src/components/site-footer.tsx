import Link from "next/link";
import { site, socials } from "@data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl">Anish Singh Walia</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Technical content for SaaS, AI-native, developer-tool, and cloud companies. Based in {site.location.label}.
          </p>
          <a className="mt-3 inline-block text-sm text-ember hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">Profiles</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">On this site</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            <li><Link href="/work" className="hover:text-cream">Work</Link></li>
            <li><Link href="/game" className="hover:text-cream">Game Room</Link></li>
            <li><Link href="/ask" className="hover:text-cream">Ask me anything</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Work with me</Link></li>
          </ul>
          <p className="mt-4 font-mono text-xs text-faint">
            Eggs: <span className="text-muted">kubectl get all -n anish</span>
            <span className="mx-1">·</span>
            Konami code
          </p>
        </div>
      </div>
    </footer>
  );
}
