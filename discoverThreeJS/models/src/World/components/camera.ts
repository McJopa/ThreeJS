import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(-15, 5, 15);

  return camera;
}

export { createCamera };
