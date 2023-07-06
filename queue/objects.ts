import * as THREE from "three"
export function createCube(length: number, color: string): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(length, length, length);
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}