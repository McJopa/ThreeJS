import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";
import { createLight } from "./components/lights";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";

class World {
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer
  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    container.appendChild(this.renderer.domElement);

    const light = createLight();
    const cube = createCube();
    this.scene.add(cube, light);

    const resizer = new Resizer(container, this.camera, this.renderer);
    resizer.onResize = () => {
      this.render();
    }
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };