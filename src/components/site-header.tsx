"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@data/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex items-center gap-2 rounded-md">
          <span className="font-mono text-xs text-orange">asw</span>
          <span className="font-display text-sm tracking-tight text-cream group-hover:text-ember">
            Anish Singh Walia
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted hover:text-cream">
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Work with me</Link>
          </Button>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-cream hover:bg-panel"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="mt-2 block rounded-full bg-orange px-3 py-2 text-center font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                Work with me
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
