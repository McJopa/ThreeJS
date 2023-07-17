import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer: WebGLRenderer = new WebGLRenderer();

  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };