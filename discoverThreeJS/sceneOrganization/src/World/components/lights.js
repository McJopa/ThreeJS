import { DirectionalLight, HemisphereLight } from 'https://cdn.skypack.dev/three@0.136.2';

function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategray',
    10,
  );

  const mainLight = new DirectionalLight('white', 5);
  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight };
}

export { createLights };
