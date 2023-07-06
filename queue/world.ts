import * as THREE from "three";

export function createGround(length: number, width: number, color: string) {
  const geometry = new THREE.PlaneGeometry(length, width);
  const material = new THREE.MeshBasicMaterial({ color });
  const ground = new THREE.Mesh(geometry, material);
  ground.rotateX(-1 * Math.PI / 2);
  return ground;
}