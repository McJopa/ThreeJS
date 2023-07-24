import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { PerspectiveCamera } from "three";
import { Ticker } from "../types/updatabale";

function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLElement
): OrbitControls & Ticker {
  const controls: OrbitControls & Ticker = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
