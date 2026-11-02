"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stations } from "@data/game";

type Rect = { x: number; y: number; w: number; h: number; label?: string; item?: string };
type Input = { left: boolean; right: boolean; jump: boolean };

const WORLD_H = 2100;
const VIEW_W = 960;
const VIEW_H = 540;

const platforms: Rect[] = [
  { x: 40, y: 1980, w: 360, h: 18, label: "trailhead" },
  { x: 520, y: 1860, w: 300, h: 16 },
  { x: 120, y: 1740, w: 280, h: 16, label: "#10", item: "pager" },
  { x: 500, y: 1620, w: 320, h: 16 },
  { x: 80, y: 1500, w: 300, h: 16, label: "switchback", item: "kettlebell" },
  { x: 480, y: 1380, w: 340, h: 16 },
  { x: 140, y: 1260, w: 280, h: 16, item: "keyword" },
  { x: 500, y: 1140, w: 340, h: 16, label: "fog line" },
  { x: 100, y: 1020, w: 300, h: 16, item: "badge" },
  { x: 460, y: 900, w: 320, h: 16 },
  { x: 160, y: 760, w: 520, h: 18, label: "summit ridge", item: "flag" },
];

const stationById = Object.fromEntries(stations.map((station) => [station.id, station]));
const itemStation: Record<string, string> = {
  pager: "pager",
  kettlebell: "kettlebell",
  keyword: "keyword",
  badge: "badge",
  flag: "flag",
};

export function SerpSummit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const input = useRef<Input>({ left: false, right: false, jump: false });
  const [reduce, setReduce] = useState(false);
  const [play, setPlay] = useState(false);
  const [found, setFound] = useState<string[]>([]);
  const [note, setNote] = useState("Trailhead. Climb toward position #1.");
  const [won, setWon] = useState(false);
  const foundRef = useRef<string[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const active = !reduce || play;

  useEffect(() => {
    if (!active) return;
    document.body.dataset.suppressEggs = "true";
    return () => {
      delete document.body.dataset.suppressEggs;
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const player = { x: 80, y: 1940, w: 26, h: 40, vx: 0, vy: 0, grounded: false, coyote: 0, buffer: 0 };
    const fog = { x: 520, y: 1104, w: 54, h: 28, dir: 1 };
    let hurt = 0;
    let camera = 1500;
    let last = performance.now();
    let frame = 0;
    let running = true;

    const onKey = (event: KeyboardEvent, down: boolean) => {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", " ", "a", "d", "w", "e"].includes(key)) event.preventDefault();
      if (key === "arrowleft" || key === "a") input.current.left = down;
      if (key === "arrowright" || key === "d") input.current.right = down;
      if ((key === "arrowup" || key === "w" || key === " ") && down) input.current.jump = true;
    };
    const down = (event: KeyboardEvent) => onKey(event, true);
    const up = (event: KeyboardEvent) => onKey(event, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      frame = requestAnimationFrame(loop);

      const accel = player.grounded ? 1800 : 1100;
      if (input.current.left) player.vx -= accel * dt;
      if (input.current.right) player.vx += accel * dt;
      if (!input.current.left && !input.current.right) player.vx *= player.grounded ? 0.78 : 0.92;
      player.vx = Math.max(-250, Math.min(250, player.vx));
      player.x += player.vx * dt;
      player.x = Math.max(8, Math.min(VIEW_W - player.w - 8, player.x));

      player.vy += 1650 * dt;
      if (player.buffer > 0) player.buffer -= dt;
      if (input.current.jump) {
        player.buffer = 0.14;
        input.current.jump = false;
      }
      if (player.grounded) player.coyote = 0.12;
      else player.coyote -= dt;
      if (player.buffer > 0 && player.coyote > 0) {
        player.vy = -720;
        player.grounded = false;
        player.coyote = 0;
        player.buffer = 0;
      }

      const nextY = player.y + player.vy * dt;
      player.grounded = false;
      for (const platform of platforms) {
        const xOverlap = player.x + player.w > platform.x + 4 && player.x < platform.x + platform.w - 4;
        const falling = player.vy >= 0;
        const wasAbove = player.y + player.h <= platform.y + 6;
        const lands = nextY + player.h >= platform.y && player.y + player.h <= platform.y + 24;
        if (falling && xOverlap && wasAbove && lands) {
          player.y = platform.y - player.h;
          player.vy = 0;
          player.grounded = true;
        }
      }
      if (!player.grounded) player.y = nextY;
      if (player.y > WORLD_H) {
        player.x = 80;
        player.y = 1940;
        player.vy = 0;
      }

      fog.x += fog.dir * 70 * dt;
      if (fog.x < 500 || fog.x > 760) fog.dir *= -1;
      const body = { x: player.x, y: player.y, w: player.w, h: player.h };
      if (hurt > 0) hurt -= dt;
      if (hurt <= 0 && overlap(body, fog)) {
        player.vy = 180;
        player.y += 18;
        hurt = 0.8;
      }

      for (const platform of platforms) {
        if (!platform.item || foundRef.current.includes(platform.item)) continue;
        const token = { x: platform.x + platform.w / 2 - 12, y: platform.y - 36, w: 24, h: 24 };
        if (overlap(body, token)) {
          foundRef.current = [...foundRef.current, platform.item];
          const station = stationById[itemStation[platform.item]];
          setFound(foundRef.current);
          setNote(`${station.name}. ${station.blurb}`);
          if (platform.item === "flag") setWon(true);
        }
      }

      const climbed = (1940 - player.y) / (1940 - 720);
      const rank = Math.max(1, Math.min(40, Math.round(40 - climbed * 39)));
      camera += (player.y - 240 - camera) * 0.12;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cssW = canvas.clientWidth || VIEW_W;
      const cssH = canvas.clientHeight || VIEW_H;
      if (canvas.width !== Math.floor(cssW * dpr) || canvas.height !== Math.floor(cssH * dpr)) {
        canvas.width = Math.floor(cssW * dpr);
        canvas.height = Math.floor(cssH * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = cssW / VIEW_W;
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.save();
      ctx.scale(scale, scale);
      drawWorld(ctx, camera, player, fog, rank, foundRef.current);
      ctx.restore();
    };
    frame = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [active]);

  function hold(partial: Partial<Input>, down: boolean) {
    if (partial.left !== undefined) input.current.left = down;
    if (partial.right !== undefined) input.current.right = down;
    if (partial.jump && down) input.current.jump = true;
  }

  return (
    <div>
      {reduce && !play ? (
        <div className="rounded-2xl border border-line bg-panel p-6">
          <p className="text-cream">Motion is reduced, so the climb stays on the paper map below.</p>
          <button type="button" className="mt-4 rounded-full bg-orange px-4 py-2 text-sm font-medium text-ink" onClick={() => setPlay(true)}>
            Play the climb anyway
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-black">
          <canvas ref={canvasRef} className="aspect-[16/9] w-full touch-none" aria-label="Climb the SERP, a short platform trek" role="img" />
          <div className="flex gap-2 border-t border-line bg-ink p-3">
            <Touch label="Left" onDown={() => hold({ left: true }, true)} onUp={() => hold({ left: true }, false)} />
            <Touch label="Right" onDown={() => hold({ right: true }, true)} onUp={() => hold({ right: true }, false)} />
            <Touch label="Jump" onDown={() => hold({ jump: true }, true)} onUp={() => undefined} />
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-xl text-sm text-muted" aria-live="polite">{note}</p>
        <p className="font-mono text-xs text-faint">{found.length}/5 camps</p>
      </div>
      <p className="mt-2 text-xs text-faint">Hold Left or Right, then Jump. A, D, and the arrow keys do the same when this page is focused. W or space jumps.</p>
      {found.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {found.map((id) => {
            const station = stationById[itemStation[id]];
            return (
              <li key={id}>
                <Link href={station.href} className="rounded-full border border-line px-3 py-1 text-xs text-ember hover:border-ember">
                  {station.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      {won ? (
        <div className="mt-4 rounded-2xl border border-orange/50 bg-panel p-5">
          <p className="font-display text-2xl">Position #1.</p>
          <p className="mt-2 text-sm text-muted">The flag is the contact page. The other camps are still on the map.</p>
          <Link href="/contact" className="mt-3 inline-block text-sm text-ember hover:underline">Work with Anish</Link>
        </div>
      ) : null}
    </div>
  );
}

function Touch({ label, onDown, onUp }: { label: string; onDown: () => void; onUp: () => void }) {
  return (
    <button
      type="button"
      className="h-12 flex-1 rounded-xl border border-line bg-panel text-sm"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        onDown();
      }}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {label}
    </button>
  );
}

function overlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function drawWorld(
  ctx: CanvasRenderingContext2D,
  camera: number,
  player: { x: number; y: number; w: number; h: number; vx: number },
  fog: Rect,
  rank: number,
  collected: string[],
) {
  const sky = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  sky.addColorStop(0, "#1a0d08");
  sky.addColorStop(1, "#070605");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.fillStyle = "#e8611f";
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(780, 70 + camera * 0.02, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#241812";
  ridge(ctx, 80 + (camera % 40), 360, 1);
  ctx.fillStyle = "#1a120e";
  ridge(ctx, 20, 430, 1.2);

  const toScreen = (y: number) => y - camera;
  for (const platform of platforms) {
    const y = toScreen(platform.y);
    if (y < -40 || y > VIEW_H + 40) continue;
    ctx.fillStyle = "#2a211c";
    ctx.fillRect(platform.x, y, platform.w, platform.h);
    ctx.fillStyle = "#e8611f";
    ctx.fillRect(platform.x, y, platform.w, 3);
    if (platform.label) {
      ctx.fillStyle = "#9a8f84";
      ctx.font = "12px ui-monospace, monospace";
      ctx.fillText(platform.label, platform.x + 8, y - 8);
    }
    if (platform.item && !collected.includes(platform.item)) {
      ctx.fillStyle = "#ffb088";
      ctx.beginPath();
      ctx.arc(platform.x + platform.w / 2, y - 18, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const fy = toScreen(fog.y);
  ctx.fillStyle = "rgba(180, 170, 160, 0.35)";
  ctx.fillRect(fog.x, fy, fog.w, fog.h);

  const py = toScreen(player.y);
  ctx.strokeStyle = "#f4efe6";
  ctx.fillStyle = "#f4efe6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x + player.w / 2, py + 8, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(player.x + player.w / 2, py + 14);
  ctx.lineTo(player.x + player.w / 2, py + 28);
  ctx.moveTo(player.x + 4, py + 20);
  ctx.lineTo(player.x + player.w - 4, py + 22);
  const leg = Math.sin(player.x / 8) * 4;
  ctx.moveTo(player.x + player.w / 2, py + 28);
  ctx.lineTo(player.x + 6, py + 40 + leg);
  ctx.moveTo(player.x + player.w / 2, py + 28);
  ctx.lineTo(player.x + player.w - 6, py + 40 - leg);
  ctx.stroke();
  ctx.fillStyle = "#e8611f";
  ctx.fillRect(player.x + player.w / 2 + 2, py + 16, 8, 10);

  ctx.fillStyle = "#f4efe6";
  ctx.font = "14px ui-monospace, monospace";
  ctx.fillText(`rank #${rank}`, 24, 36);
}

function ridge(ctx: CanvasRenderingContext2D, offset: number, base: number, scale: number) {
  ctx.beginPath();
  ctx.moveTo(0, base);
  for (let x = 0; x <= VIEW_W; x += 40) {
    const y = base - Math.abs(Math.sin((x + offset) / 90) * 48 * scale);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(VIEW_W, VIEW_H);
  ctx.lineTo(0, VIEW_H);
  ctx.fill();
}
