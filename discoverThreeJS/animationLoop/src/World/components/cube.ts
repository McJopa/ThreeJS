import { Mesh, BoxGeometry, MeshStandardMaterial, MathUtils, TextureLoader, Material, SphereGeometry } from "three"
import { EXRLoader } from "three/addons/loaders/EXRLoader"

interface Cube extends Mesh {
  tick?: Function
}

function createMaterial() {
  const textureLoader = new TextureLoader();

  const colorTexture = textureLoader.load('/assets/textures/stainless-steel/albedo.png')
  const heightTexture = textureLoader.load('/assets/textures/stainless-steel/height.png')
  const normalTexture = textureLoader.load('/assets/textures/stainless-steel/normal.png')
  const metalnessTexture = textureLoader.load('/assets/textures/stainless-steel/metallic.png')
  const ambientOcclusionTexture = textureLoader.load('/assets/textures/stainless-steel/ao.png')
  const roughnessTexture = textureLoader.load('/assets/textures/stainless-steel/roughness.png')

  const envMap = new EXRLoader().load('/assets/textures/envMap.exr');

  const material = new MeshStandardMaterial({
    map: colorTexture,
    roughnessMap: roughnessTexture,
    normalMap: normalTexture,
    metalnessMap: metalnessTexture,
    envMap: envMap,
    metalness: 0.9,
    aoMap: ambientOcclusionTexture,
  });

  material.envMapIntensity = 1;
  return material;
}

function createCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = createMaterial();

  const cube: Cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  cube.tick = (delta: number) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  }

  return cube;
}

export { createCube };