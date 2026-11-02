import * as THREE from "three";
import { faceTexture, torsoTexture } from "./textures";

/**
 * A blocky Anish: blond hair, dark beard, dark tee with an orange sun, jeans.
 * Proportions follow the classic 8-wide, 32-tall voxel skin, scaled to 1.8 blocks.
 */

const U = 1.8 / 32;

function part(w: number, h: number, d: number, color: string, map?: THREE.Texture) {
  const geometry = new THREE.BoxGeometry(w * U, h * U, d * U);
  const material = map
    ? new THREE.MeshLambertMaterial({ map })
    : new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function nearest(color: string) {
  return new THREE.MeshLambertMaterial({ color });
}

export type Avatar = {
  root: THREE.Group;
  animate: (time: number, speed: number) => void;
};

export function buildAvatar(): Avatar {
  const root = new THREE.Group();

  const skin = "#c98a5b";
  const hair = "#e9c25a";
  const tee = "#1f2430";
  const jeans = "#2a2f3a";
  const shoe = "#111111";

  const face = faceTexture();
  const headMaterials = [
    nearest(skin),
    nearest(skin),
    nearest(hair),
    nearest("#3a2a1e"),
    new THREE.MeshLambertMaterial({ map: face }),
    nearest(hair),
  ];
  const head = new THREE.Mesh(new THREE.BoxGeometry(8 * U, 8 * U, 8 * U), headMaterials);
  head.castShadow = true;
  head.position.y = 28 * U;
  const hairCap = part(8.4, 2.6, 8.4, hair);
  hairCap.position.set(0, 3 * U, 0);
  head.add(hairCap);
  const hairBack = part(8.2, 5, 1.2, hair);
  hairBack.position.set(0, 1.6 * U, -3.7 * U);
  head.add(hairBack);
  const ringLeft = part(1, 1, 1, "#d9d9d9");
  ringLeft.position.set(-4.3 * U, -0.5 * U, 0);
  head.add(ringLeft);
  const ringRight = ringLeft.clone();
  ringRight.position.x = 4.3 * U;
  head.add(ringRight);
  root.add(head);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(8 * U, 12 * U, 4 * U), [
    nearest(tee),
    nearest(tee),
    nearest(tee),
    nearest(jeans),
    new THREE.MeshLambertMaterial({ map: torsoTexture() }),
    nearest(tee),
  ]);
  torso.castShadow = true;
  torso.position.y = 18 * U;
  root.add(torso);

  const armGeometry = new THREE.BoxGeometry(4 * U, 12 * U, 4 * U);
  armGeometry.translate(0, -5 * U, 0);
  const makeArm = () => {
    const sleeve = new THREE.Mesh(armGeometry, [nearest(skin), nearest(skin), nearest(tee), nearest(skin), nearest(skin), nearest(skin)]);
    sleeve.castShadow = true;
    const cuff = part(4.2, 3, 4.2, tee);
    cuff.position.y = -1 * U;
    sleeve.add(cuff);
    return sleeve;
  };
  const leftArm = makeArm();
  leftArm.position.set(-6 * U, 23 * U, 0);
  const rightArm = makeArm();
  rightArm.position.set(6 * U, 23 * U, 0);
  root.add(leftArm, rightArm);

  const legGeometry = new THREE.BoxGeometry(4 * U, 12 * U, 4 * U);
  legGeometry.translate(0, -6 * U, 0);
  const makeLeg = () => {
    const leg = new THREE.Mesh(legGeometry, nearest(jeans));
    leg.castShadow = true;
    const boot = part(4.2, 2.5, 4.4, shoe);
    boot.position.set(0, -11 * U, 0.1 * U);
    leg.add(boot);
    return leg;
  };
  const leftLeg = makeLeg();
  leftLeg.position.set(-2 * U, 12 * U, 0);
  const rightLeg = makeLeg();
  rightLeg.position.set(2 * U, 12 * U, 0);
  root.add(leftLeg, rightLeg);

  const animate = (time: number, speed: number) => {
    const walking = Math.min(1, speed / 3.2);
    const swing = Math.sin(time * 9) * 0.75 * walking;
    leftArm.rotation.x = -swing;
    rightArm.rotation.x = swing;
    leftLeg.rotation.x = swing;
    rightLeg.rotation.x = -swing;
    const idle = Math.sin(time * 1.6) * 0.02 * (1 - walking);
    torso.position.y = 18 * U + idle;
    head.position.y = 28 * U + idle + Math.abs(Math.sin(time * 9)) * 0.035 * walking;
    leftArm.position.y = 23 * U + idle;
    rightArm.position.y = 23 * U + idle;
    leftArm.rotation.z = 0.06 - Math.sin(time * 1.6) * 0.015 * (1 - walking);
    rightArm.rotation.z = -0.06 + Math.sin(time * 1.6) * 0.015 * (1 - walking);
  };

  return { root, animate };
}
