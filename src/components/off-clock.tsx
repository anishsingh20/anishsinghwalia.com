import { alsoOffClock, hobbies, type Hobby } from "@data/hobbies";
import { PullupChallenge } from "@/components/pullup-challenge";

function Art({ kind }: { kind: Hobby["art"] }) {
  if (kind === "rope") {
    return (
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
        <g className="rope">
          <path d="M18 58 Q60 8 102 58" fill="none" stroke="#e8611f" strokeWidth="3" />
        </g>
        <circle cx="60" cy="34" r="6" fill="#f4efe6" />
        <path d="M60 40 V62 M48 50 H72 M52 74 L60 62 L68 74" fill="none" stroke="#f4efe6" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "calisthenics") {
    return (
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
        <path d="M22 18 H98" stroke="#e8611f" strokeWidth="3" />
        <g className="puller">
          <circle cx="60" cy="32" r="5" fill="#f4efe6" />
          <path d="M60 37 V58 M46 28 L60 40 L74 28 M52 72 L60 58 L68 72" fill="none" stroke="#f4efe6" strokeWidth="2" />
        </g>
      </svg>
    );
  }
  if (kind === "run") {
    return (
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
        <path className="dashes" d="M8 62 H112" fill="none" stroke="#e8611f" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="78" cy="40" r="5" fill="#f4efe6" />
        <path d="M78 45 L70 58 M78 48 L90 58 M70 36 L86 42" fill="none" stroke="#f4efe6" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "peak") {
    return (
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
        <path d="M8 68 L40 30 L58 48 L78 16 L112 68 Z" fill="#211c18" stroke="#e8611f" />
        <circle className="peak" cx="78" cy="16" r="4" fill="#ffb088" />
      </svg>
    );
  }
  if (kind === "trek") {
    return (
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
        <path d="M10 64 H40 L55 48 H80 L96 32 H112" fill="none" stroke="#e8611f" strokeWidth="2" />
        <circle className="boot" cx="40" cy="64" r="4" fill="#ffb088" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden="true">
      <path d="M12 66 C30 66 34 40 52 40 C70 40 74 58 96 50" fill="none" stroke="#e8611f" strokeWidth="2" />
      <circle className="boot" cx="52" cy="40" r="4" fill="#ffb088" />
      <path d="M90 66 L104 40 L112 66" fill="#211c18" stroke="#9a8f84" />
    </svg>
  );
}

export function OffClock({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section id="off-hours" className="scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Off the clock</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">The rest of me is outdoors.</h2>
            <p className="mt-3 max-w-xl text-muted">
              Hiking, trekking, calisthenics, skipping, running, and the mountains around Dehradun.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {hobbies.map((hobby) => (
                <li key={hobby.id} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {hobby.title}
                </li>
              ))}
            </ul>
          </div>
          <PullupChallenge />
        </div>
      </section>
    );
  }

  return (
    <section id="off-hours" className="scroll-mt-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Beyond the keyboard</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">Off the clock</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Hiking, trekking, calisthenics, skipping, running, and the mountains around Dehradun.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <li key={hobby.id} className="hobby rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-orange/50">
            <Art kind={hobby.art} />
            <h3 className="mt-2 font-display text-xl">{hobby.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{hobby.line}</p>
          </li>
        ))}
      </ul>
      <ul className="mt-6 grid gap-2 text-sm text-muted">
        {alsoOffClock.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="mt-8 max-w-xl">
        <PullupChallenge />
      </div>
    </section>
  );
}
