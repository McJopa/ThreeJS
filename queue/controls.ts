import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { PerspectiveCamera, Renderer } from "three";

function createControls(
  camera: PerspectiveCamera,
  renderer: Renderer
): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  return controls;
}

export { createControls };
