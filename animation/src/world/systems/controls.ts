import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createControls(camera: THREE.Camera, canvas: THREE.WebGLRenderer) {
  const controls: OrbitControls = new OrbitControls(camera, canvas);
  controls.
  return controls;
}