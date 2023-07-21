import { GUI } from "dat.gui";
import type { Camera } from "three";
import { ThreeJSQueue } from "./queueVisuals";

type QueueControls = {
  enqueue: Function;
  dequeue: Function;
  maxLength: number;
};
class Interface {
  private gui: GUI;
  constructor(
    camera: Camera,
    queueControls: QueueControls,
    queue: ThreeJSQueue
  ) {
    this.gui = new GUI();
    this.addQueueControls(queueControls);
    // this.addCameraControls(camera);
  }

  addCameraControls(camera) {
    // const cameraFolder = this.gui.addFolder("Camera");
    // cameraFolder.add(camera.position, "x", 0, 10);
    // cameraFolder.add(camera.position, "y", 0, 10);
    // cameraFolder.add(camera.position, "z", 0, 10);
    // cameraFolder.add(camera.rotation, "x", -10, 10);
    // cameraFolder.add(camera.rotation, "y", -10, 10);
    // cameraFolder.add(camera.rotation, "z", -10, 10);
    // cameraFolder.add(camera, "zoom", 0, 10);
    // cameraFolder.open();
  }
  addQueueControls(queueControls) {
    console.log(queueControls);
    const controlsFolder = this.gui.addFolder("Queue Controls");

    controlsFolder.add(queueControls, "maxLength", 1, 30, 1).onChange(() => {
      console.log("max length changed!");
    });

    controlsFolder.add(queueControls, "enqueue");
    controlsFolder.add(queueControls, "dequeue");
    controlsFolder.open();
  }
}

export { Interface };
