import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { createLights } from "./components/lights";

import { createAxesHelper, createGridHelper } from "./systems/helpers";

import { createControls } from "./systems/controls";

import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Train } from "./components/Train/Train";

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
    const train = new Train();

    this.scene.add(mainLight, ambientLight, train);

    this.loop.updatables.push(controls, train);
    const resizer = new Resizer(container, this.camera, this.renderer);

    this.scene.add(createAxesHelper(), createGridHelper());
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
