import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { createLights } from "./components/lights";
import { loadRobot } from "./components/robot/robot";

import { createAxesHelper, createGridHelper } from "./systems/helpers";

import { createControls } from "./systems/controls";

import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.appendChild(this.renderer.domElement);

    this.controls = createControls(this.camera, this.renderer.domElement);
    const { ambientLight, mainLight } = createLights();

    this.scene.add(mainLight, ambientLight);

    const resizer = new Resizer(container, this.camera, this.renderer);
    resizer.onResize = () => {
      console.log("Window resized!");
    };
    // this.scene.add(createAxesHelper(), createGridHelper());
  }
  async init() {
    const { robot } = await loadRobot();
    this.scene.add(robot);
    this.controls.target.copy(robot.position);
    this.loop.updatables.push(this.controls, robot);
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
