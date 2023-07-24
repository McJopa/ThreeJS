import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

function setupModel(data: GLTF) {
  const model = data.scene.children[0];

  const danceClip = data.animations[0];
  const runningClip = data.animations[6];

  const mixer = new AnimationMixer(model);

  // const danceAction = mixer.clipAction(danceClip);
  // danceAction.play();

  const runningAction = mixer.clipAction(runningClip);
  runningAction.play();

  model.tick = (delta) => {
    mixer.update(delta);
  };

  return model;
}

export { setupModel };
