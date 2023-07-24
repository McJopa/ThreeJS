import { Group, MathUtils } from "three";
import { TrainMeshes, createMeshes } from "./meshes";

const wheelSpeed = MathUtils.degToRad(90);
class Train extends Group {
  meshes: TrainMeshes;
  constructor() {
    super();

    this.meshes = createMeshes();
    this.add(
      this.meshes.bigWheel,
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.nose,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.smallWheelRear
    );
  }

  tick(delta) {
    this.meshes.bigWheel.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta;
  }
}

export { Train };
