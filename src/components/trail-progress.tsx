"use client";

import { useEffect, useState } from "react";

export function TrailProgress() {
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduce(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1.5 bg-line/70"
      role="progressbar"
      aria-label="Page trail"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div
        className="relative h-full bg-orange"
        style={{ width: `${percent}%`, transition: reduce ? "none" : "width 80ms linear" }}
      >
        <span className="absolute -right-1 -top-1 h-3 w-3 rotate-45 border-r-2 border-t-2 border-ember bg-orange" aria-hidden="true" />
      </div>
    </div>
  );
}
