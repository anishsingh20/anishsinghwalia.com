export function PageHeader({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
