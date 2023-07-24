import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel";

async function loadRobot() {
  const loader = new GLTFLoader();

  const robotData = await loader.loadAsync("/assets/models/Robot.glb");
  console.log("beep boop!", robotData);

  const robot = setupModel(robotData);
  robot.position.y = -2;

  return { robot };
}

export { loadRobot };
