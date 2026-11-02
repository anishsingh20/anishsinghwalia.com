import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Off the trail</p>
      <h1 className="mt-3 font-display text-4xl">This page isn&apos;t on the map.</h1>
      <p className="mt-3 text-muted">The link is old or the address has a typo. Everything that exists is linked from the home page.</p>
      <Link href="/" className="mt-6 inline-block text-ember hover:underline">Back to the trailhead</Link>
    </main>
  );
}
