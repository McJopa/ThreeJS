import { AmbientLight, DirectionalLight, Light } from "three"

function createLight() {
  const light = new DirectionalLight('white', 5);

  light.position.set(0, 10, 0);
  return light;
}

function createAmbientLight() {
  const ambientLight = new AmbientLight(0x404040, 1);
  return ambientLight;
}

export { createLight, createAmbientLight };