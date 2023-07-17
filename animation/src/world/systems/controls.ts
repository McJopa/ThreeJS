import { OrbitControls } from 'three-addons';

import type { Camera, WebGLRenderer } from "three"

export function createControls(camera: Camera, canvas: WebGLRenderer) {
  const controls: OrbitControls = new OrbitControls(camera, canvas);
  return controls;
}