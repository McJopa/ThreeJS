import * as THREE from "three"
export function createCube(length: number, color: string = "black"): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(length, length, length);
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  console.log(cube);
  return cube;
}