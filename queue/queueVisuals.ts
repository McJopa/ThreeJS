import { Queue } from "./queue";
import { Mesh, Vector3, Scene, Vector } from "three"
import { createCube } from "./objects";

type queueData = {
  name: string
  objectRef: Mesh
  dimensions: Vector3
}

export class ThreeJSQueue extends Queue<queueData> {
  scene: Scene
  cubeLength: number;
  groundPos: number;
  queuePosLength: number;
  posOffset: number;

  constructor(maxLength, scene, groundPos) {
    super(maxLength);
    this.scene = scene;
    this.groundPos = groundPos;
    this.queuePosLength = 0;
    this.posOffset = 1;
  }
  /**
   * 
   * @param data 
   * @param mesh 
   * @param dimensions 
   */
  enqueueAnimate(data: string, mesh: Mesh, dimensions: Vector3): void {
    throw new Error("method not implemeneted");
  }

  dequeueAnimate(): void {
    throw new Error("method not implemeneted");
  }
}

ThreeJSQueue.prototype.enqueueAnimate = function (this: ThreeJSQueue, name: string, objectRef: Mesh, dimensions: Vector3): void {
  const pos = new Vector3(-this.queuePosLength + this.posOffset, this.groundPos + dimensions.y / 2, 0);
  this.queuePosLength += this.posOffset + dimensions.x;

  objectRef.position.x = pos.x;
  objectRef.position.y = pos.y;
  objectRef.position.z = pos.z;

  const data: queueData = {
    name,
    objectRef: objectRef,
    dimensions
  }

  if (this.enqueue<queueData>(data) == -1) {
    throw new Error("error inserting into the queue");
  };
  this.scene.add(objectRef);
}

ThreeJSQueue.prototype.dequeueAnimate = function (this: ThreeJSQueue): void {

}