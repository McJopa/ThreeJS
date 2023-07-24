import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Clock,
} from "three";
import { Ticker } from "../types/updatabale";

const clock = new Clock();

function createMeshGroup(): Group & Ticker {
  const group: Group & Ticker = new Group();
  const geometry = new SphereGeometry(0.2, 10, 100);
  const material = new MeshStandardMaterial({ color: "indigo" });

  const protoSphere = new Mesh(geometry, material);
  group.add(protoSphere);

  for (let i = 0; i < 1; i += 0.001) {
    const cloneSphere = protoSphere.clone();

    cloneSphere.position.x = Math.sin(Math.PI * 2 * i);
    cloneSphere.position.y = Math.cos(Math.PI * 2 * i);
    cloneSphere.position.z = -i * 5;

    cloneSphere.scale.multiplyScalar(0.01 + i);

    group.add(cloneSphere);
  }
  // group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);
  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSecond * 10;
    // console.log(clock.getElapsedTime());
    group.scale.set(
      Math.abs(Math.sin(delta * radiansPerSecond + clock.getElapsedTime())) +
        0.2,
      Math.abs(Math.sin(delta * radiansPerSecond + clock.getElapsedTime())) +
        0.2,
      Math.abs(Math.sin(delta * radiansPerSecond + clock.getElapsedTime())) +
        0.2
    );
    console.log(Math.sin(delta * radiansPerSecond + clock.getElapsedTime()));
  };
  return group;
}

export { createMeshGroup };
