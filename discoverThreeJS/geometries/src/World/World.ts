import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { createLights } from "./components/lights";

import { createAxesHelper, createGridHelper } from "./systems/helpers";

import { createControls } from "./systems/controls";

import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.appendChild(this.renderer.domElement);
    const controls = createControls(this.camera, this.renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    const gridHelper = createGridHelper();
    const axesHelper = createAxesHelper();
    this.loop.updatables.push(controls);

    this.scene.add(mainLight, ambientLight, gridHelper, axesHelper);

    const resizer = new Resizer(container, this.camera, this.renderer);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };
