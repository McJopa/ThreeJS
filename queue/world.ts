import * as THREE from "three";

export function createGround(length: number, width: number, color: string) {
  const geometry = new THREE.PlaneGeometry(length, width);
  const material = new THREE.MeshLambertMaterial({ color });
  const ground = new THREE.Mesh(geometry, material);
  ground.receiveShadow = true;
  ground.castShadow = true;
  ground.rotateX(-1 * Math.PI / 2);
  console.log(ground)
  return ground;
}