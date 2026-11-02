"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <h1 className="font-display text-4xl">Something broke on my side.</h1>
      <p className="mt-3 text-muted">Try again. If it keeps happening, email me and I&apos;ll fix it.</p>
      <button type="button" className="mt-6 rounded-full bg-orange px-4 py-2 text-sm font-medium text-ink" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
