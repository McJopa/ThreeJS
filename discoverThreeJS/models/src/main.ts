import { World } from "./World/World";
console.log("loaded main");

async function main() {
  console.log("running main");
  const container = document.querySelector("#scene-container");
  if (!container) {
    throw new Error("failed to find scene container");
  }

  const world = new World(container);
  world.init();

  world.start();
}

main().catch((err: Error) => {
  console.log(err);
});
