import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { createLight, createAmbientLight } from "./components/lights";

import { HemisphereLight } from "three";

import { EXRLoader } from "three/addons/loaders/EXRLoader"

import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

import { AmbientLight, DirectionalLightHelper, type PerspectiveCamera, type Scene, type WebGLRenderer } from "three";

class World {
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer
  private loop: Loop
  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    container.appendChild(this.renderer.domElement);

    const light = createLight();
    const light2 = createLight();
    light2.position.set(0, 0, 10);
    const helper = new DirectionalLightHelper(light, 10);
    const ambientLight = createAmbientLight();
    const cube = createCube();

    this.loop.updatables.push(cube);
    const envMap = new EXRLoader().load('/assets/textures/envMap.exr');

    this.scene.add(cube, light, light2, helper, ambientLight);

    const hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    console.log('added ambient Light');

    this.scene.background = envMap;
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