import { Queue } from "./queue";
import { Mesh, Vector3, Scene } from "three"
import { createCube } from "./objects";

type queueData = {
  name: string
  objectRef: Mesh
  pos: Vector3
}

type queueInputData = {

}

class ThreeJSQueue extends Queue<queueData> {
  scene: Scene
  cubeLength: number;
  groundPos: number;

  constructor(maxLength, scene, groundPos, cubeLength) {
    super(maxLength);
    this.scene = scene;
    this.cubeLength = cubeLength;
    this.groundPos = groundPos;
  }

  enqueueAnimate(data: string): void {
    throw new Error("method not implemeneted");
  }
}

ThreeJSQueue.prototype.enqueueAnimate = function (name: string): void {
  const cube = createCube(this.cubeLength, "red");
  const cubePos = new Vector3(-this.getLength(), this.groundPos + this.cubeLength / 2, 0);
  const data: queueData = {
    name,
    objectRef: cube,
    pos: cubePos
  }
}