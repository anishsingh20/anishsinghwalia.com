import { clientGets, processSteps } from "@data/services";

export function HowWeWork() {
  return (
    <section>
        <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How we work together</p>
        <h2 className="mt-2 font-display text-4xl">Brief, plan, draft, publish.</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs text-ember">0{index + 1}</p>
              <h3 className="mt-2 font-display text-xl text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-8 font-display text-2xl">What you get</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {clientGets.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-ink p-5">
              <p className="font-medium text-cream">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
