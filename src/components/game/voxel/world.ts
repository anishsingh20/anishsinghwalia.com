import * as THREE from "three";
import type { Station } from "@data/game";
import type { Atlas, BlockId } from "./textures";

/**
 * Block coordinates: block (x, y, z) fills [x, x+1] on every axis.
 * The cabin floor is y = 0, so the avatar stands at y = 1.
 */

export type Side = "north" | "south" | "east" | "west";
export type WallGroup = Side | "fixed";

export type AABB = { x1: number; z1: number; x2: number; z2: number };

export const CABIN = {
  minX: 0,
  maxX: 13,
  minZ: 0,
  maxZ: 10,
  height: 4,
  door: [6, 7],
};

type Block = { id: BlockId; group: WallGroup; top?: BlockId };

export class BlockMap {
  blocks = new Map<string, Block>();

  key(x: number, y: number, z: number) {
    return `${x},${y},${z}`;
  }

  set(x: number, y: number, z: number, id: BlockId, group: WallGroup = "fixed", top?: BlockId) {
    this.blocks.set(this.key(x, y, z), { id, group, top });
  }

  get(x: number, y: number, z: number) {
    return this.blocks.get(this.key(x, y, z));
  }

  delete(x: number, y: number, z: number) {
    this.blocks.delete(this.key(x, y, z));
  }
}

const FACES: { dir: [number, number, number]; corners: [number, number, number][]; uv: [number, number][] }[] = [
  { dir: [1, 0, 0], corners: [[1, 0, 1], [1, 0, 0], [1, 1, 1], [1, 1, 0]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { dir: [-1, 0, 0], corners: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { dir: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 1]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { dir: [0, 0, 1], corners: [[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { dir: [0, 0, -1], corners: [[1, 0, 0], [0, 0, 0], [1, 1, 0], [0, 1, 0]], uv: [[0, 0], [1, 0], [0, 1], [1, 1]] },
];

type Buffers = { positions: number[]; normals: number[]; uvs: number[]; indices: number[] };

function buffers(): Buffers {
  return { positions: [], normals: [], uvs: [], indices: [] };
}

/** Build one mesh per texture and wall group, with hidden faces removed. */
export function meshBlocks(map: BlockMap, atlas: Atlas) {
  const byKey = new Map<string, Buffers>();
  const materialFor = new Map<string, THREE.MeshLambertMaterial>();

  for (const [key, block] of map.blocks) {
    const [x, y, z] = key.split(",").map(Number);
    for (const face of FACES) {
      const neighbor = map.get(x + face.dir[0], y + face.dir[1], z + face.dir[2]);
      if (neighbor && !(neighbor.id === "glass" && block.id !== "glass")) continue;
      const textureId = face.dir[1] !== 0 && block.top ? block.top : block.id;
      const groupKey = `${block.group}:${textureId}`;
      let buf = byKey.get(groupKey);
      if (!buf) {
        buf = buffers();
        byKey.set(groupKey, buf);
      }
      const start = buf.positions.length / 3;
      face.corners.forEach((corner, index) => {
        buf!.positions.push(x + corner[0], y + corner[1], z + corner[2]);
        buf!.normals.push(...face.dir);
        buf!.uvs.push(...face.uv[index]);
      });
      buf.indices.push(start, start + 1, start + 2, start + 2, start + 1, start + 3);
    }
  }

  const meshes: { mesh: THREE.Mesh; group: WallGroup; material: THREE.MeshLambertMaterial }[] = [];
  for (const [groupKey, buf] of byKey) {
    const [group, textureId] = groupKey.split(":") as [WallGroup, BlockId];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(buf.positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(buf.normals, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(buf.uvs, 2));
    geometry.setIndex(buf.indices);
    let material = materialFor.get(groupKey);
    if (!material) {
      material = new THREE.MeshLambertMaterial({
        map: atlas[textureId],
        transparent: textureId === "glass" || group !== "fixed",
        opacity: 1,
        side: textureId === "glass" ? THREE.DoubleSide : THREE.FrontSide,
        depthWrite: textureId !== "glass",
      });
      materialFor.set(groupKey, material);
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = textureId !== "glass";
    mesh.receiveShadow = true;
    meshes.push({ mesh, group, material });
  }
  return meshes;
}

/** A textured box that is not on the block grid, for furniture. */
export function box(
  atlas: Atlas,
  id: BlockId,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number,
  options: { emissive?: string; emissiveIntensity?: number } = {},
) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshLambertMaterial({
    map: atlas[id],
    emissive: options.emissive ? new THREE.Color(options.emissive) : undefined,
    emissiveIntensity: options.emissiveIntensity ?? 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x + w / 2, y + h / 2, z + d / 2);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export type World = {
  group: THREE.Group;
  walls: Record<Side, THREE.MeshLambertMaterial[]>;
  colliders: AABB[];
  fire: THREE.Vector3;
  markers: Map<string, THREE.Object3D>;
};

export function buildWorld(atlas: Atlas, stations: Station[]): World {
  const map = new BlockMap();
  const group = new THREE.Group();
  const colliders: AABB[] = [];
  const markers = new Map<string, THREE.Object3D>();
  const { minX, maxX, minZ, maxZ, height, door } = CABIN;

  for (let x = minX; x <= maxX; x += 1) {
    for (let z = minZ; z <= maxZ; z += 1) {
      map.set(x, 0, z, "planks");
    }
  }

  const wallSide = (x: number, z: number): Side => {
    if (z === minZ) return "north";
    if (z === maxZ) return "south";
    if (x === minX) return "west";
    return "east";
  };

  for (let y = 1; y <= height; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      for (let z = minZ; z <= maxZ; z += 1) {
        const edge = x === minX || x === maxX || z === minZ || z === maxZ;
        if (!edge) continue;
        const isDoor = z === maxZ && door.includes(x) && y <= 2;
        if (isDoor) continue;
        const corner = (x === minX || x === maxX) && (z === minZ || z === maxZ);
        const id: BlockId = y === height || corner ? "log" : "log";
        map.set(x, y, z, id, wallSide(x, z), y === height ? "logTop" : undefined);
      }
    }
  }

  const windows: [number, number][] = [
    [4, minZ], [5, minZ], [9, minZ], [10, minZ],
    [minX, 2], [minX, 3],
    [maxX, 7], [maxX, 8],
    [3, maxZ], [10, maxZ],
  ];
  for (const [x, z] of windows) {
    for (const y of [2, 3]) map.set(x, y, z, "glass", wallSide(x, z));
  }

  for (let z = 7; z <= 8; z += 1) {
    for (const y of [2, 3]) map.set(minX, y, z, "paper", "west");
  }

  for (let z = 3; z <= 5; z += 1) {
    for (let y = 1; y <= height; y += 1) map.set(maxX, y, z, "cobble", "east");
  }
  map.set(maxX - 1, 1, 3, "cobble");
  map.set(maxX - 1, 1, 5, "cobble");
  map.set(maxX - 1, 2, 3, "cobble");
  map.set(maxX - 1, 2, 5, "cobble");
  map.set(maxX - 1, 3, 3, "cobble");
  map.set(maxX - 1, 3, 4, "cobble");
  map.set(maxX - 1, 3, 5, "cobble");
  colliders.push({ x1: maxX - 1, z1: 3, x2: maxX, z2: 6 });

  for (const x of [6, 7, 8]) {
    for (const y of [2, 3]) map.set(x, y, minZ, "cream", "north");
  }

  for (let x = minX; x <= maxX; x += 1) {
    colliders.push({ x1: x, z1: minZ, x2: x + 1, z2: minZ + 1 });
    if (!door.includes(x)) colliders.push({ x1: x, z1: maxZ, x2: x + 1, z2: maxZ + 1 });
  }
  for (let z = minZ; z <= maxZ; z += 1) {
    colliders.push({ x1: minX, z1: z, x2: minX + 1, z2: z + 1 });
    colliders.push({ x1: maxX, z1: z, x2: maxX + 1, z2: z + 1 });
  }

  const meshes = meshBlocks(map, atlas);
  const walls: Record<Side, THREE.MeshLambertMaterial[]> = { north: [], south: [], east: [], west: [] };
  for (const entry of meshes) {
    group.add(entry.mesh);
    if (entry.group !== "fixed") walls[entry.group].push(entry.material);
  }

  const rug = box(atlas, "rug", 4.5, 1, 3.5, 5, 0.06, 3);
  rug.castShadow = false;
  group.add(rug);

  const outside = buildOutside(atlas);
  group.add(outside);

  for (const station of stations) {
    const marker = furniture(atlas, station, colliders);
    group.add(marker.object);
    markers.set(station.id, marker.anchor);
  }

  return { group, walls, colliders, fire: new THREE.Vector3(maxX - 0.5, 1.6, 4.5), markers };
}

function furniture(atlas: Atlas, station: Station, colliders: AABB[]) {
  const object = new THREE.Group();
  const anchor = new THREE.Object3D();
  const { x, z } = station;

  switch (station.kind) {
    case "desk": {
      object.add(box(atlas, "darkWood", x - 1.5, 1.75, z - 1, 3, 0.15, 1.3));
      for (const [dx, dz] of [[-1.4, -0.9], [1.1, -0.9], [-1.4, 0.05], [1.1, 0.05]]) {
        object.add(box(atlas, "darkWood", x + dx, 1, z + dz, 0.25, 0.75, 0.25));
      }
      object.add(box(atlas, "iron", x - 0.6, 1.9, z - 0.85, 1.2, 0.1, 0.5));
      object.add(box(atlas, "iron", x - 0.05, 2, z - 0.65, 0.1, 0.3, 0.1));
      object.add(box(atlas, "screen", x - 0.75, 2.3, z - 0.7, 1.5, 0.9, 0.12, { emissive: "#ffb088", emissiveIntensity: 0.6 }));
      object.add(box(atlas, "cream", x - 0.5, 1.9, z - 0.2, 1, 0.08, 0.35));
      object.add(box(atlas, "paper", x + 0.7, 1.9, z - 0.5, 0.5, 0.04, 0.6));
      object.add(box(atlas, "darkWood", x - 1.2, 1, z + 0.6, 0.6, 0.5, 0.6));
      colliders.push({ x1: x - 1.5, z1: z - 1, x2: x + 1.5, z2: z + 0.3 });
      anchor.position.set(x, 3.4, z - 0.6);
      break;
    }
    case "bookshelf": {
      object.add(box(atlas, "books", x - 1, 1, z - 1, 2, 3, 0.9));
      object.add(box(atlas, "darkWood", x - 1.05, 3.95, z - 1.05, 2.1, 0.12, 1));
      colliders.push({ x1: x - 1, z1: z - 1, x2: x + 1, z2: z });
      anchor.position.set(x, 4.4, z - 0.5);
      break;
    }
    case "pager": {
      object.add(box(atlas, "darkWood", x - 0.4, 1, z - 0.4, 0.8, 0.9, 0.8));
      object.add(box(atlas, "iron", x - 0.2, 1.9, z - 0.15, 0.4, 0.14, 0.3));
      object.add(box(atlas, "screen", x - 0.14, 2.04, z - 0.1, 0.28, 0.02, 0.2, { emissive: "#7ad67a", emissiveIntensity: 0.8 }));
      colliders.push({ x1: x - 0.4, z1: z - 0.4, x2: x + 0.4, z2: z + 0.4 });
      anchor.position.set(x, 2.8, z);
      break;
    }
    case "kettlebell": {
      object.add(box(atlas, "iron", x - 0.3, 1, z - 0.3, 0.6, 0.55, 0.6));
      object.add(box(atlas, "iron", x - 0.25, 1.55, z - 0.06, 0.5, 0.12, 0.12));
      object.add(box(atlas, "iron", x - 0.25, 1.4, z - 0.06, 0.12, 0.2, 0.12));
      object.add(box(atlas, "iron", x + 0.13, 1.4, z - 0.06, 0.12, 0.2, 0.12));
      object.add(box(atlas, "iron", x - 1.2, 1, z + 0.9, 0.12, 2.6, 0.12));
      object.add(box(atlas, "iron", x + 0.6, 1, z + 0.9, 0.12, 2.6, 0.12));
      object.add(box(atlas, "iron", x - 1.2, 3.5, z + 0.9, 1.92, 0.1, 0.12));
      object.add(box(atlas, "cream", x - 1.1, 1, z + 1.2, 1.7, 0.08, 0.9));
      colliders.push({ x1: x - 0.3, z1: z - 0.3, x2: x + 0.3, z2: z + 0.3 });
      anchor.position.set(x, 2.4, z);
      break;
    }
    case "badges": {
      const colors: BlockId[] = ["orange", "iron", "cream", "orange", "cream"];
      colors.forEach((id, index) => {
        object.add(box(atlas, id, x - 1.35 + index * 0.56, 2.25, z + 0.5, 0.42, 0.42, 0.08));
      });
      object.add(box(atlas, "darkWood", x - 1.5, 2.95, z + 0.5, 3, 0.12, 0.16));
      anchor.position.set(x, 3.6, z + 0.8);
      break;
    }
    case "map": {
      object.add(box(atlas, "orange", x + 0.5, 2.3, z - 0.6, 0.06, 0.12, 0.5));
      object.add(box(atlas, "orange", x + 0.5, 2.9, z + 0.1, 0.06, 0.12, 0.5));
      object.add(box(atlas, "orange", x + 0.5, 2.3, z + 0.6, 0.06, 0.5, 0.12));
      object.add(box(atlas, "darkWood", x + 0.5, 1.95, z - 1, 0.1, 0.1, 2));
      object.add(box(atlas, "darkWood", x + 0.5, 3.95, z - 1, 0.1, 0.1, 2));
      anchor.position.set(x + 0.9, 4.4, z);
      break;
    }
    case "fireplace": {
      object.add(box(atlas, "fire", x - 0.4, 1.02, z + 0.15, 0.8, 0.8, 0.7, { emissive: "#ff7a1f", emissiveIntensity: 1 }));
      object.add(box(atlas, "darkWood", x - 0.45, 1, z, 0.9, 0.18, 0.18));
      object.add(box(atlas, "darkWood", x - 0.45, 1, z + 0.8, 0.9, 0.18, 0.18));
      object.add(box(atlas, "planks", x - 1.6, 1, z - 2.2, 0.8, 0.6, 0.8));
      object.add(box(atlas, "darkWood", x - 1.6, 1.6, z - 2.2, 0.8, 0.2, 0.8));
      colliders.push({ x1: x - 1.6, z1: z - 2.2, x2: x - 0.8, z2: z - 1.4 });
      anchor.position.set(x - 1, 2.6, z);
      break;
    }
    case "mailbox": {
      object.add(box(atlas, "darkWood", x - 0.08, 1, z - 0.08, 0.16, 1.1, 0.16));
      object.add(box(atlas, "orange", x - 0.3, 2.1, z - 0.45, 0.6, 0.5, 0.9));
      object.add(box(atlas, "cream", x + 0.3, 2.3, z - 0.1, 0.06, 0.3, 0.1));
      object.add(box(atlas, "paper", x - 0.25, 2.62, z - 0.3, 0.5, 0.02, 0.6));
      colliders.push({ x1: x - 0.3, z1: z - 0.45, x2: x + 0.3, z2: z + 0.45 });
      anchor.position.set(x, 3.2, z);
      break;
    }
  }

  object.add(anchor);
  return { object, anchor };
}

function buildOutside(atlas: Atlas) {
  const group = new THREE.Group();

  const grassTexture = atlas.grass.clone();
  grassTexture.repeat.set(60, 60);
  grassTexture.needsUpdate = true;
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshLambertMaterial({ map: grassTexture }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(6.5, 0.94, 5);
  ground.receiveShadow = true;
  group.add(ground);

  const pathTexture = atlas.path.clone();
  pathTexture.repeat.set(2, 8);
  pathTexture.needsUpdate = true;
  const path = new THREE.Mesh(new THREE.PlaneGeometry(2, 9), new THREE.MeshLambertMaterial({ map: pathTexture }));
  path.rotation.x = -Math.PI / 2;
  path.position.set(7, 0.95, 15.5);
  path.receiveShadow = true;
  group.add(path);

  const porch = box(atlas, "planks", 4, 0.88, 11, 6, 0.12, 1.6);
  group.add(porch);
  const foundation = box(atlas, "cobble", -0.1, 0.6, -0.1, 14.2, 0.4, 11.2);
  group.add(foundation);

  const trees: [number, number, number][] = [
    [-4, 3, 4], [-6, 12, 5], [18, 2, 5], [20, 12, 4], [-2, 17, 4], [16, 18, 5], [10, 20, 4], [-8, -4, 5], [22, -3, 4], [3, -5, 4], [11, -6, 5],
  ];
  for (const [tx, tz, h] of trees) {
    for (let y = 1; y <= h; y += 1) group.add(box(atlas, "log", tx, y, tz, 1, 1, 1));
    const crown = new THREE.Group();
    for (let dx = -2; dx <= 2; dx += 1) {
      for (let dz = -2; dz <= 2; dz += 1) {
        for (let dy = 0; dy <= 2; dy += 1) {
          const edge = Math.abs(dx) === 2 && Math.abs(dz) === 2;
          const topLayer = dy === 2 && (Math.abs(dx) === 2 || Math.abs(dz) === 2);
          if (edge || topLayer) continue;
          crown.add(box(atlas, "leaves", tx + dx, h + dy, tz + dz, 1, 1, 1));
        }
      }
    }
    crown.add(box(atlas, "leaves", tx, h + 3, tz, 1, 1, 1));
    group.add(crown);
  }

  const peaks: [number, number, number, number][] = [
    [-30, -34, 14, 18], [-12, -40, 20, 24], [8, -44, 26, 30], [28, -38, 18, 22], [44, -30, 12, 16], [-44, -24, 10, 12],
  ];
  for (const [px, pz, h, w] of peaks) {
    const stone = atlas.stone.clone();
    stone.repeat.set(w / 2, h / 2);
    stone.needsUpdate = true;
    const layers = 4;
    for (let i = 0; i < layers; i += 1) {
      const t = i / layers;
      const lw = w * (1 - t * 0.75);
      const lh = h / layers;
      const id: BlockId = i === layers - 1 ? "snow" : "stone";
      const tex = atlas[id].clone();
      tex.repeat.set(Math.max(1, lw / 3), Math.max(1, lh / 3));
      tex.needsUpdate = true;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(lw, lh, lw), new THREE.MeshLambertMaterial({ map: tex }));
      mesh.position.set(px, 1 + lh * i + lh / 2, pz);
      group.add(mesh);
    }
  }

  const water = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshLambertMaterial({ map: atlas.water, transparent: true, opacity: 0.85 }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(-12, 0.96, 22);
  group.add(water);

  return group;
}
