import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Off the trail</p>
      <h1 className="mt-3 font-display text-4xl">This page is not on the map.</h1>
      <p className="mt-3 text-muted">The route you tried is not one of the camps.</p>
      <Link href="/" className="mt-6 inline-block text-ember hover:underline">Back to the trailhead</Link>
    </main>
  );
}
