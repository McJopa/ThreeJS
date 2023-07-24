import { World } from "./World/World";
console.log("loaded main");

function main() {
  console.log("running main")
  const container = document.querySelector('#scene-container');
  if (!container) {
    throw new Error("failed to find scene container");
  }

  const world = new World(container);
  const startButton = document.querySelector('#startButton');
  const stopButton = document.querySelector('#stopButton');
  if (!stopButton) {
    console.log("could not find stop button");
  }
  if (!startButton) {
    console.log("could not find start button");
  }
  stopButton?.addEventListener("click", () => {
    world.stop();
  })
  startButton?.addEventListener("click", () => {
    world.start();
  })

  world.start();
}


main();