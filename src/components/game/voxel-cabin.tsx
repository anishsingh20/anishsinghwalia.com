"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { spawn, stations, type Station } from "@data/game";
import { buildAvatar } from "./voxel/avatar";
import { buildAtlas } from "./voxel/textures";
import { buildWorld, CABIN, type AABB } from "./voxel/world";

type Keys = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  turnLeft: boolean;
  turnRight: boolean;
};

const PLAYER_HALF = 0.3;
const SPEED = 3.6;
const REACH = 2.1;

function collide(x: number, z: number, colliders: AABB[]) {
  for (const c of colliders) {
    if (x + PLAYER_HALF > c.x1 && x - PLAYER_HALF < c.x2 && z + PLAYER_HALF > c.z1 && z - PLAYER_HALF < c.z2) return true;
  }
  return false;
}

export function VoxelCabin() {
  const mountRef = useRef<HTMLDivElement>(null);
  const keys = useRef<Keys>({ forward: false, back: false, left: false, right: false, turnLeft: false, turnRight: false });
  const stick = useRef({ x: 0, y: 0 });
  const camera = useRef({ yaw: 0, pitch: 0.62, distance: 8.5 });
  const openRef = useRef<Station | null>(null);
  const nearRef = useRef<string | null>(null);
  const interactRef = useRef(false);
  const resetRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [near, setNear] = useState<Station | null>(null);
  const [open, setOpen] = useState<Station | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const apply = () => setCoarse(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    document.body.dataset.suppressEggs = "true";
    return () => {
      delete document.body.dataset.suppressEggs;
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    const lowQuality = new URLSearchParams(window.location.search).get("quality") === "low";
    renderer.setPixelRatio(lowQuality ? 1 : Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = !lowQuality;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-label", "Anish's voxel cabin. Walk with W A S D, open things with E.");
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.tabIndex = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#8fc1ea");
    scene.fog = new THREE.Fog("#b9d7ef", 38, 85);

    const cam = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 160);

    const hemi = new THREE.HemisphereLight("#dff0ff", "#5a4a3a", 0.85);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight("#fff3df", 1.6);
    sun.position.set(18, 26, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -22;
    sun.shadow.camera.right = 22;
    sun.shadow.camera.top = 22;
    sun.shadow.camera.bottom = -22;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 80;
    sun.shadow.bias = -0.0008;
    sun.target.position.set(6.5, 1, 5);
    scene.add(sun, sun.target);

    const atlas = buildAtlas();
    const world = buildWorld(atlas, stations);
    scene.add(world.group);

    const fire = new THREE.PointLight("#ff8a3a", 2.4, 9, 1.6);
    fire.position.copy(world.fire);
    scene.add(fire);
    const screenGlow = new THREE.PointLight("#ffb088", 0.9, 4, 1.8);
    screenGlow.position.set(2.5, 2.6, 1.4);
    scene.add(screenGlow);

    const avatar = buildAvatar();
    avatar.root.position.set(spawn.x, 1, spawn.z);
    avatar.root.rotation.y = Math.PI;
    scene.add(avatar.root);

    const markerGeometry = new THREE.OctahedronGeometry(0.16);
    const markerMaterial = new THREE.MeshLambertMaterial({ color: "#e8611f", emissive: "#e8611f", emissiveIntensity: 0.55 });
    const markerActive = new THREE.MeshLambertMaterial({ color: "#ffb088", emissive: "#ffb088", emissiveIntensity: 1 });
    const markers = new Map<string, THREE.Mesh>();
    for (const station of stations) {
      const anchor = world.markers.get(station.id);
      if (!anchor) continue;
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(anchor.position);
      marker.castShadow = false;
      scene.add(marker);
      markers.set(station.id, marker);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      cam.aspect = width / height;
      cam.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const onKey = (event: KeyboardEvent, down: boolean) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
      const key = event.key.toLowerCase();
      const handled = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "q", "r", "e", "enter", " "];
      if (!handled.includes(key)) return;
      if (openRef.current && key !== "enter" && key !== " ") {
        return;
      }
      if (key === "w" || key === "arrowup") keys.current.forward = down;
      if (key === "s" || key === "arrowdown") keys.current.back = down;
      if (key === "a") keys.current.left = down;
      if (key === "d") keys.current.right = down;
      if (key === "arrowleft" || key === "q") keys.current.turnLeft = down;
      if (key === "arrowright" || key === "r") keys.current.turnRight = down;
      if ((key === "e" || key === "enter" || key === " ") && down && !openRef.current) {
        interactRef.current = true;
      }
      if (document.activeElement === renderer.domElement || key.startsWith("arrow") || key === " ") event.preventDefault();
    };
    const keyDown = (event: KeyboardEvent) => onKey(event, true);
    const keyUp = (event: KeyboardEvent) => onKey(event, false);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let moved = 0;
    const canvas = renderer.domElement;
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.focus({ preventScroll: true });
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      lastX = event.clientX;
      lastY = event.clientY;
      camera.current.yaw -= dx * 0.0065;
      camera.current.pitch = Math.max(0.18, Math.min(1.25, camera.current.pitch + dy * 0.004));
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvas.releasePointerCapture(event.pointerId);
      if (moved < 6 && nearRef.current && !openRef.current) interactRef.current = true;
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.current.distance = Math.max(3.5, Math.min(14, camera.current.distance + event.deltaY * 0.01));
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const found = new Set<string>();
    const position = new THREE.Vector3(spawn.x, 1, spawn.z);
    const lookTarget = new THREE.Vector3();
    const camPos = new THREE.Vector3();
    const smoothCam = new THREE.Vector3(spawn.x, 6, spawn.z + 7);
    let facing = Math.PI;
    let last = performance.now();
    let frame = 0;
    let running = true;
    let time = 0;

    const stationList = stations.map((station) => ({ station, marker: markers.get(station.id) }));

    // Slow devices lose shadows and the extra pixel density after a short sample.
    let sampled = 0;
    let slowFrames = 0;
    let degraded = lowQuality;
    const degrade = () => {
      degraded = true;
      renderer.shadowMap.enabled = false;
      renderer.setPixelRatio(1);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) material.needsUpdate = true;
        }
      });
      resize();
    };

    const loop = (now: number) => {
      if (!running) return;
      frame = requestAnimationFrame(loop);
      const raw = (now - last) / 1000;
      const dt = Math.min(0.12, raw);
      last = now;
      time += dt;
      if (!degraded && sampled < 90) {
        sampled += 1;
        if (raw > 0.045) slowFrames += 1;
        if (sampled === 90 && slowFrames > 45) degrade();
      }

      if (resetRef.current) {
        resetRef.current = false;
        camera.current.yaw = 0;
        camera.current.pitch = 0.62;
        camera.current.distance = 8.5;
        position.set(spawn.x, 1, spawn.z);
      }

      const turn = (keys.current.turnLeft ? 1 : 0) - (keys.current.turnRight ? 1 : 0);
      camera.current.yaw += turn * 1.9 * dt;

      let ix = (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0) + stick.current.x;
      let iz = (keys.current.back ? 1 : 0) - (keys.current.forward ? 1 : 0) + stick.current.y;
      if (openRef.current) {
        ix = 0;
        iz = 0;
      }
      const magnitude = Math.hypot(ix, iz);
      let speed = 0;
      if (magnitude > 0.05) {
        const scale = Math.min(1, magnitude) / magnitude;
        ix *= scale;
        iz *= scale;
        const yaw = camera.current.yaw;
        const dx = ix * Math.cos(yaw) + iz * Math.sin(yaw);
        const dz = -ix * Math.sin(yaw) + iz * Math.cos(yaw);
        const stepX = dx * SPEED * dt;
        const stepZ = dz * SPEED * dt;
        if (!collide(position.x + stepX, position.z, world.colliders)) position.x += stepX;
        if (!collide(position.x, position.z + stepZ, world.colliders)) position.z += stepZ;
        position.x = Math.max(-40, Math.min(52, position.x));
        position.z = Math.max(-30, Math.min(45, position.z));
        facing = Math.atan2(dx, dz);
        speed = Math.hypot(dx, dz) * SPEED;
      }
      avatar.root.position.copy(position);
      let delta = facing - avatar.root.rotation.y;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      avatar.root.rotation.y += delta * Math.min(1, dt * 14);
      avatar.animate(time, speed);

      let nearest: Station | null = null;
      let nearestDistance = REACH;
      for (const { station, marker } of stationList) {
        const distance = Math.hypot(station.x - position.x, station.z - position.z);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = station;
        }
        if (marker) {
          const anchor = world.markers.get(station.id)!;
          marker.position.y = anchor.position.y + (reduceMotion ? 0 : Math.sin(time * 2.2 + station.x) * 0.08);
          marker.rotation.y = reduceMotion ? 0 : time * 1.2;
          marker.material = nearest?.id === station.id ? markerActive : markerMaterial;
          marker.visible = !found.has(station.id) || nearest?.id === station.id;
        }
      }
      if ((nearest?.id ?? null) !== nearRef.current) {
        nearRef.current = nearest?.id ?? null;
        setNear(nearest);
      }
      if (interactRef.current) {
        interactRef.current = false;
        if (nearest) {
          found.add(nearest.id);
          setVisited([...found]);
          setOpen(nearest);
        }
      }

      lookTarget.set(position.x, position.y + 1.1, position.z);
      const { yaw, pitch, distance } = camera.current;
      camPos.set(
        lookTarget.x + Math.sin(yaw) * Math.cos(pitch) * distance,
        lookTarget.y + Math.sin(pitch) * distance,
        lookTarget.z + Math.cos(yaw) * Math.cos(pitch) * distance,
      );
      smoothCam.lerp(camPos, Math.min(1, dt * 7));
      cam.position.copy(smoothCam);
      cam.lookAt(lookTarget);

      const fade = (materials: THREE.MeshLambertMaterial[], hidden: boolean) => {
        const target = hidden ? 0.12 : 1;
        for (const material of materials) {
          material.opacity += (target - material.opacity) * Math.min(1, dt * 9);
          material.depthWrite = material.opacity > 0.5;
        }
      };
      const inside = position.x > CABIN.minX && position.x < CABIN.maxX + 1 && position.z > CABIN.minZ && position.z < CABIN.maxZ + 1;
      fade(world.walls.north, inside && smoothCam.z < CABIN.minZ + 1.2);
      fade(world.walls.south, inside && smoothCam.z > CABIN.maxZ - 0.2);
      fade(world.walls.west, inside && smoothCam.x < CABIN.minX + 1.2);
      fade(world.walls.east, inside && smoothCam.x > CABIN.maxX - 0.2);

      fire.intensity = 2.2 + (reduceMotion ? 0 : Math.sin(time * 11) * 0.25 + Math.sin(time * 23) * 0.15);

      renderer.render(scene, cam);
    };
    frame = requestAnimationFrame(loop);
    setReady(true);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) material.dispose();
        }
      });
      Object.values(atlas).forEach((texture) => texture.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (failed) {
    return (
      <div className="rounded-2xl border border-line bg-panel p-6">
        <p className="text-cream">This browser can&apos;t start WebGL, so the cabin won&apos;t load here. Everything in it is listed below.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-[#8fc1ea]">
        <div ref={mountRef} className="aspect-[4/3] w-full touch-none sm:aspect-[16/9] [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:outline-none" />
        {!ready ? (
          <div className="absolute inset-0 grid place-items-center bg-ink/80 text-sm text-muted">Building the cabin…</div>
        ) : null}

        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 font-mono text-[11px] text-cream backdrop-blur">
          <span className="text-ember">Cabin</span>
          <span aria-live="polite">{visited.length}/{stations.length} opened</span>
        </div>

        <button
          type="button"
          onClick={() => {
            resetRef.current = true;
          }}
          className="absolute right-3 top-3 rounded-full bg-ink/75 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur hover:text-cream"
        >
          Reset view
        </button>

        {near && !open ? (
          <div className="absolute inset-x-0 bottom-3 flex justify-center px-3">
            <button
              type="button"
              onClick={() => {
                interactRef.current = true;
              }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-orange/60 bg-ink/85 px-4 py-2 text-sm text-cream shadow-lg backdrop-blur hover:border-orange"
            >
              <kbd className="rounded bg-orange px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink">E</kbd>
              Open {near.name.toLowerCase()}
            </button>
          </div>
        ) : null}

        {coarse ? <Joystick onChange={(x, y) => (stick.current = { x, y })} /> : null}

        {open ? (
          <div className="absolute inset-0 flex items-end justify-center bg-ink/55 p-3 sm:items-center" role="presentation" onClick={() => setOpen(null)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="station-title"
              className="w-full max-w-md rounded-2xl border border-orange/40 bg-ink p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">In the cabin</p>
              <h2 id="station-title" className="mt-2 font-display text-2xl text-cream">{open.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/90">{open.blurb}</p>
              <ul className="mt-3 grid gap-1 text-sm text-muted">
                {open.facts.map((fact) => (
                  <li key={fact} className="flex gap-2"><span className="text-orange">·</span>{fact}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={open.href} className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-ink hover:bg-ember">
                  {open.cta}
                </Link>
                <button type="button" autoFocus className="rounded-full border border-line px-4 py-2 text-sm text-cream hover:border-ember" onClick={() => setOpen(null)}>
                  Keep walking
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3 text-sm text-muted">
        <p className="max-w-xl">
          <span className="text-cream">Walk</span> with W A S D or the arrow keys. <span className="text-cream">Look</span> by dragging, or with Q and R. Scroll to zoom. <span className="text-cream">Open</span> something with E, Enter, or a tap when you&apos;re next to it.
        </p>
        <p className="font-mono text-xs text-faint">{stations.length} things to find</p>
      </div>

      {visited.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Opened so far">
          {visited.map((id) => {
            const station = stations.find((item) => item.id === id)!;
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
    </div>
  );
}

function Joystick({ onChange }: { onChange: (x: number, y: number) => void }) {
  const base = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const active = useRef<number | null>(null);

  const update = (event: React.PointerEvent) => {
    const rect = base.current?.getBoundingClientRect();
    if (!rect) return;
    const radius = rect.width / 2;
    let dx = event.clientX - (rect.left + radius);
    let dy = event.clientY - (rect.top + radius);
    const length = Math.hypot(dx, dy);
    if (length > radius) {
      dx = (dx / length) * radius;
      dy = (dy / length) * radius;
    }
    setKnob({ x: dx, y: dy });
    onChange(dx / radius, dy / radius);
  };

  const end = () => {
    active.current = null;
    setKnob({ x: 0, y: 0 });
    onChange(0, 0);
  };

  return (
    <div
      ref={base}
      role="presentation"
      className="absolute bottom-4 left-4 h-28 w-28 touch-none rounded-full border border-cream/40 bg-ink/50 backdrop-blur"
      onPointerDown={(event) => {
        active.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        update(event);
      }}
      onPointerMove={(event) => {
        if (active.current === event.pointerId) update(event);
      }}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <div
        className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full bg-orange/90 shadow"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
    </div>
  );
}
