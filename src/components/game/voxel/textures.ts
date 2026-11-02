import * as THREE from "three";

/**
 * 16x16 pixel textures drawn on a canvas, so the cabin loads with no image files.
 * Every texture uses nearest filtering to keep the blocky look.
 */

export type BlockId =
  | "planks"
  | "log"
  | "logTop"
  | "cobble"
  | "glass"
  | "grass"
  | "dirt"
  | "stone"
  | "snow"
  | "leaves"
  | "darkWood"
  | "rug"
  | "books"
  | "paper"
  | "screen"
  | "iron"
  | "orange"
  | "cream"
  | "fire"
  | "path"
  | "water";

type Rng = () => number;

function rng(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (n & 255) + amount));
  return `rgb(${r},${g},${b})`;
}

function canvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const element = document.createElement("canvas");
  element.width = 16;
  element.height = 16;
  const ctx = element.getContext("2d")!;
  return [element, ctx];
}

function noiseFill(ctx: CanvasRenderingContext2D, base: string, spread: number, seed: number) {
  const random = rng(seed);
  for (let y = 0; y < 16; y += 1) {
    for (let x = 0; x < 16; x += 1) {
      ctx.fillStyle = shade(base, Math.round((random() - 0.5) * spread));
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function painters(): Record<BlockId, (ctx: CanvasRenderingContext2D) => void> {
  return {
    planks(ctx) {
      noiseFill(ctx, "#b07d4b", 18, 1);
      ctx.fillStyle = "#7a5230";
      for (const y of [3, 7, 11, 15]) ctx.fillRect(0, y, 16, 1);
      ctx.fillRect(4, 0, 1, 4);
      ctx.fillRect(11, 4, 1, 4);
      ctx.fillRect(6, 8, 1, 4);
      ctx.fillRect(13, 12, 1, 4);
    },
    log(ctx) {
      noiseFill(ctx, "#6b4a2b", 16, 2);
      ctx.fillStyle = "#4f351e";
      for (const x of [1, 5, 9, 13]) ctx.fillRect(x, 0, 1, 16);
      ctx.fillStyle = "#86603a";
      for (const x of [3, 7, 11, 15]) ctx.fillRect(x, 0, 1, 16);
    },
    logTop(ctx) {
      noiseFill(ctx, "#c49a66", 14, 3);
      ctx.strokeStyle = "#8a6239";
      for (let r = 2; r < 8; r += 2) {
        ctx.beginPath();
        ctx.arc(8, 8, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
    cobble(ctx) {
      noiseFill(ctx, "#6f6c68", 18, 4);
      const stones = [
        [0, 0, 5, 4], [6, 0, 6, 3], [13, 0, 3, 5], [0, 5, 4, 5], [5, 4, 5, 6], [11, 6, 5, 4],
        [0, 11, 6, 5], [7, 11, 4, 5], [12, 11, 4, 5],
      ];
      const random = rng(44);
      for (const [x, y, w, h] of stones) {
        ctx.fillStyle = shade("#8a8782", Math.round((random() - 0.5) * 30));
        ctx.fillRect(x + 1, y + 1, Math.max(1, w - 2), Math.max(1, h - 2));
      }
    },
    glass(ctx) {
      ctx.fillStyle = "rgba(190, 220, 240, 0.28)";
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = "rgba(240, 250, 255, 0.85)";
      ctx.fillRect(0, 0, 16, 1);
      ctx.fillRect(0, 0, 1, 16);
      ctx.fillRect(15, 0, 1, 16);
      ctx.fillRect(0, 15, 16, 1);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(3, 2, 1, 6);
      ctx.fillRect(4, 2, 1, 3);
    },
    grass(ctx) {
      noiseFill(ctx, "#5f9e3a", 22, 5);
    },
    dirt(ctx) {
      noiseFill(ctx, "#7a5536", 20, 6);
    },
    stone(ctx) {
      noiseFill(ctx, "#8c8c8c", 22, 7);
    },
    snow(ctx) {
      noiseFill(ctx, "#f1f4f8", 8, 8);
    },
    leaves(ctx) {
      noiseFill(ctx, "#3f7d2f", 30, 9);
    },
    darkWood(ctx) {
      noiseFill(ctx, "#4a2f1b", 14, 10);
      ctx.fillStyle = "#331f10";
      for (const y of [5, 10, 15]) ctx.fillRect(0, y, 16, 1);
    },
    rug(ctx) {
      noiseFill(ctx, "#e8611f", 14, 11);
      ctx.fillStyle = "#f4efe6";
      ctx.fillRect(0, 0, 16, 1);
      ctx.fillRect(0, 15, 16, 1);
      ctx.fillRect(0, 0, 1, 16);
      ctx.fillRect(15, 0, 1, 16);
      ctx.fillStyle = "#1a100c";
      ctx.fillRect(4, 4, 8, 1);
      ctx.fillRect(4, 11, 8, 1);
      ctx.fillRect(4, 4, 1, 8);
      ctx.fillRect(11, 4, 1, 8);
    },
    books(ctx) {
      ctx.fillStyle = "#4a2f1b";
      ctx.fillRect(0, 0, 16, 16);
      const colors = ["#e8611f", "#2d5f8a", "#c8b35a", "#7d3a3a", "#3e7a5a", "#f4efe6", "#6a4a8a"];
      const random = rng(12);
      let x = 1;
      for (const row of [1, 9]) {
        x = 1;
        while (x < 15) {
          const w = 1 + Math.floor(random() * 2);
          const h = 5 + Math.floor(random() * 2);
          ctx.fillStyle = colors[Math.floor(random() * colors.length)];
          ctx.fillRect(x, row + (7 - h), w, h);
          x += w + (random() > 0.7 ? 1 : 0);
        }
      }
    },
    paper(ctx) {
      noiseFill(ctx, "#f4efe6", 8, 13);
      ctx.fillStyle = "#9a8f84";
      for (const y of [4, 7, 10]) ctx.fillRect(3, y, 10, 1);
    },
    screen(ctx) {
      ctx.fillStyle = "#0c0b0a";
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = "#ffb088";
      ctx.fillRect(2, 3, 7, 1);
      ctx.fillStyle = "#c4b8aa";
      ctx.fillRect(2, 6, 11, 1);
      ctx.fillRect(2, 8, 9, 1);
      ctx.fillRect(2, 10, 12, 1);
      ctx.fillStyle = "#e8611f";
      ctx.fillRect(2, 13, 2, 1);
    },
    iron(ctx) {
      noiseFill(ctx, "#5a5f66", 12, 14);
    },
    orange(ctx) {
      noiseFill(ctx, "#e8611f", 10, 15);
    },
    cream(ctx) {
      noiseFill(ctx, "#f4efe6", 6, 16);
    },
    fire(ctx) {
      noiseFill(ctx, "#ff7a1f", 40, 17);
      ctx.fillStyle = "#ffd36b";
      ctx.fillRect(6, 8, 4, 6);
    },
    path(ctx) {
      noiseFill(ctx, "#a68b63", 18, 18);
    },
    water(ctx) {
      noiseFill(ctx, "#3d7fb3", 20, 19);
    },
  };
}

export type Atlas = Record<BlockId, THREE.Texture>;

export function buildAtlas(): Atlas {
  const paint = painters();
  const atlas = {} as Atlas;
  (Object.keys(paint) as BlockId[]).forEach((id) => {
    const [element, ctx] = canvas();
    paint[id](ctx);
    const texture = new THREE.CanvasTexture(element);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    atlas[id] = texture;
  });
  return atlas;
}

/** A tiny face texture for the avatar's head. Blond on top, beard below. */
export function faceTexture(): THREE.Texture {
  const element = document.createElement("canvas");
  element.width = 8;
  element.height = 8;
  const ctx = element.getContext("2d")!;
  ctx.fillStyle = "#c98a5b";
  ctx.fillRect(0, 0, 8, 8);
  ctx.fillStyle = "#e9c25a";
  ctx.fillRect(0, 0, 8, 2);
  ctx.fillRect(0, 2, 1, 1);
  ctx.fillRect(7, 2, 1, 1);
  ctx.fillStyle = "#2b1d14";
  ctx.fillRect(1, 3, 2, 1);
  ctx.fillRect(5, 3, 2, 1);
  ctx.fillStyle = "#f4efe6";
  ctx.fillRect(2, 3, 1, 1);
  ctx.fillRect(5, 3, 1, 1);
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(2, 3, 1, 1);
  ctx.fillRect(6, 3, 1, 1);
  ctx.fillStyle = "#3a2a1e";
  ctx.fillRect(1, 6, 6, 2);
  ctx.fillRect(2, 5, 4, 1);
  ctx.fillStyle = "#c98a5b";
  ctx.fillRect(3, 6, 2, 1);
  ctx.fillStyle = "#d9d9d9";
  ctx.fillRect(4, 5, 1, 1);
  const texture = new THREE.CanvasTexture(element);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Chest texture: dark tee with the orange sun from his tattoo. */
export function torsoTexture(): THREE.Texture {
  const element = document.createElement("canvas");
  element.width = 8;
  element.height = 12;
  const ctx = element.getContext("2d")!;
  ctx.fillStyle = "#1f2430";
  ctx.fillRect(0, 0, 8, 12);
  ctx.fillStyle = "#c98a5b";
  ctx.fillRect(3, 0, 2, 1);
  ctx.fillStyle = "#e8611f";
  ctx.fillRect(3, 4, 2, 2);
  ctx.fillRect(2, 5, 1, 1);
  ctx.fillRect(5, 4, 1, 1);
  ctx.fillRect(3, 3, 1, 1);
  ctx.fillRect(4, 6, 1, 1);
  const texture = new THREE.CanvasTexture(element);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
