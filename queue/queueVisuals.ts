import { Queue } from "./queue";
import { Mesh, Vector3, Scene, Vector } from "three"
import { createCube } from "./objects";

type queueData = {
  name: string
  objectRef: Mesh
  dimensions: Vector3
}

type movementData = {
  curPos: Vector3
  desiredPos: Vector3
  velocity: Vector3
}

export class ThreeJSQueue extends Queue<queueData> {
  scene: Scene
  cubeLength: number;
  groundPos: number;
  queuePosLength: number;
  posOffset: number;
  movementAnimations: Array<movementData>

  constructor(maxLength, scene, groundPos) {
    super(maxLength);
    this.scene = scene;
    this.groundPos = groundPos;
    this.queuePosLength = 0;
    this.posOffset = 1;
    this.movementAnimations = [];
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

  animateMovements(): void {
    throw new Error("method not implemeneted");
  }
}

ThreeJSQueue.prototype.enqueueAnimate = function (this: ThreeJSQueue, name: string, objectRef: Mesh, dimensions: Vector3): void {

  const pos = new Vector3(-this.queuePosLength + this.posOffset, this.groundPos + dimensions.y / 2, 0);

  objectRef.position.x = pos.x;
  objectRef.position.y = 30;
  objectRef.position.z = pos.z;

  const data: queueData = {
    name,
    objectRef: objectRef,
    dimensions
  }

  // console.log(data);
  if (this.enqueue<queueData>(data) == -1) {
    throw new Error("error inserting into the queue");
  };

  this.queuePosLength += this.posOffset + dimensions.x;
  this.scene.add(objectRef);
  const movementData = {
    curPos: objectRef.position,
    desiredPos: pos,
    velocity: new Vector3(0, 0, 0)
  }
  this.movementAnimations.push(movementData);
}

ThreeJSQueue.prototype.dequeueAnimate = function (this: ThreeJSQueue): void {
  // wait for existing animations to finish;
  if (this.movementAnimations.length != 0) {
    return;
  }
  const data = this.dequeue<queueData>();
  setTimeout(() => {
    this.scene.remove(data.objectRef);
  }, 1000)
  this.movementAnimations.push({
    curPos: data.objectRef.position,
    desiredPos: new Vector3(data.objectRef.position.x + 8, data.objectRef.position.y, data.objectRef.position.z),
    velocity: new Vector3(0, 0, 0)
  })
  const queueGapDistance = data.dimensions.x + this.posOffset;
  this.queuePosLength -= queueGapDistance;
  this.queue.forEach((obj: queueData) => {
    const newXPos = obj.objectRef.position.x + queueGapDistance;
    // obj.objectRef.position.x = newPos;
    const movementData = {
      curPos: obj.objectRef.position,
      desiredPos: new Vector3(newXPos, obj.objectRef.position.y, obj.objectRef.position.z),
      velocity: new Vector3(0, 0, 0)
    }
    // move(movementData);
    this.movementAnimations.push(movementData);
  })
}

ThreeJSQueue.prototype.animateMovements = function (this: ThreeJSQueue): void {
  if (this.movementAnimations.length == 0) {
    return;
  }
  console.log("animating")
  const lerpAlpha = .1
  this.movementAnimations.forEach(obj => {
    obj.curPos.lerp(obj.desiredPos, lerpAlpha);
    checkWithinDistanceThreshold(obj);
  });
  this.movementAnimations = this.movementAnimations.filter((obj: movementData) =>
    !obj.curPos.equals(obj.desiredPos)
  )
  console.log(this.movementAnimations);
}

// function move(movementData: movementData) {
//   const curPos = new Vector3(movementData.curPos.x, movementData.curPos.y, movementData.curPos.z);
//   const acceleration = 1;
//   console.log(movementData);
//   const directionVector = curPos.sub(movementData.desiredPos).normalize();
//   console.log(directionVector);
// }

function checkWithinDistanceThreshold(movementData: movementData) {
  const distanceThreshold = 0.01;
  if (Math.abs(movementData.curPos.x - movementData.desiredPos.x) < distanceThreshold
    && Math.abs(movementData.curPos.y - movementData.desiredPos.y) < distanceThreshold
    && Math.abs(movementData.curPos.z - movementData.desiredPos.z) < distanceThreshold
  ) {
    movementData.curPos = movementData.desiredPos;
  }
}