import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { Ticker } from "../types/updatabale";

function createMeshGroup(): Group & Ticker {
  const group: Group & Ticker = new Group();
  const geometry = new SphereGeometry(0.25, 16, 16);
  const material = new MeshStandardMaterial({ color: "indigo" });

  const protoSphere = new Mesh(geometry, material);
  group.add(protoSphere);

  group.tick = (delta) => {};

  return group;
}

export { createMeshGroup };
