import { AmbientLight, DirectionalLight, HemisphereLight, Light } from "three";

function createLights() {
  const ambientLight = new HemisphereLight("white", "darkslategray", 5);

  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(10, 10, 10);
  return { ambientLight, mainLight };
}

export { createLights };
