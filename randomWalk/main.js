import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.posititon = (200, 500, 300);
scene.add(directionalLight);

scene.background = new THREE.Color("lightblue")
// camera setup
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const scale = 14
// const camera = new THREE.OrthographicCamera(
//   cameraWidth / -scale, // left
//   cameraWidth / scale, // right
//   cameraHeight / scale, // top
//   cameraHeight / -scale, // bottom
//   0, // near plane
//   10000 // far plane
// );

const camera = new THREE.PerspectiveCamera(
  50,
  aspectRatio,
  0.1,
  100000
)


camera.position.set(7.5, 20, 7.5);
camera.lookAt(8, 1, 7.5);

// set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

const tileWidth = 1;
const tileHeight = 1;

function createTile(color) {
  const geometry = new THREE.BoxGeometry(tileWidth, tileHeight, tileWidth);
  const material = new THREE.MeshBasicMaterial({ color });
  const tile = new THREE.Mesh(geometry, material);
  return tile;
}

const sphereRadius = .3
function createSphere(color, opacity) {
  const geometry = new THREE.SphereGeometry(sphereRadius);
  const material = new THREE.MeshPhongMaterial({ color: color ? color : 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

function createGhostSphere(color, opacity) {
  const geometry = new THREE.BoxGeometry(.2, .2, .2);
  const material = new THREE.MeshLambertMaterial({ color: "red", opacity: .01, transparent: true });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

function createGrid(width, height) {
  let grid = new THREE.Group();
  let color = "white";
  for (let y = 0; y < height * tileWidth; y += tileWidth) {
    for (let x = 0; x < width * tileWidth; x += tileWidth) {
      color = color == "white" ? 0xEEEEEE : "white";
      let tile = createTile(color);
      tile.position.x = x;
      tile.position.z = y;
      grid.add(tile);
    }
  }
  return grid;
}


// function getCarFrontTexture() {
//   const canvas = document.createElement("canvas");
//   canvas.width = 64;
//   canvas.height = 32;
//   const context = canvas.getContext("2d");

//   context.fillStyle = "#ffffff";
//   context.fillRect(0, 0, 64, 32);

//   context.fillStyle = "#666666";
//   context.fillRect(8, 8, 48, 24);

//   return new THREE.CanvasTexture(canvas);
// }

const grid = createGrid(51, 51);
grid.position.x = -15
grid.position.z = -15

scene.add(grid)

const sphere = createSphere("blue");
sphere.position.y = tileHeight
scene.add(sphere);

let spherePosition = new THREE.Vector3(1, sphere.y, 1);

let destination = new THREE.Vector3(1, sphere.position.y, 1);
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
  console.log(camera.position);

  if (roundFloat(sphere.position.x, destination.x) && roundFloat(sphere.position.z, destination.z)) {
    destination.x = Math.round(Math.random() * 15);
    destination.z = Math.round(Math.random() * 15);
    if (destination.x < 0) {
      destination.x = 1;
    }
    if (destination.z < 0) {
      destination.z = 1;
    }
    if (destination.x >= 14) {
      destination.x = 14
    }
    if (destination.z >= 14) {
      destination.z = 14
    }
    console.log("Moving to:", destination.x, destination.z)
  }
  // console.log(sphere.position.x, sphere.position.z);
  spherePosition.lerp(new THREE.Vector3(destination.x, spherePosition.y, destination.z), .01);
  const ghostSphere = createGhostSphere("green", 0.001);
  ghostSphere.position.x = sphere.position.x;
  ghostSphere.position.y = sphere.position.y;
  ghostSphere.position.z = sphere.position.z;
  scene.add(ghostSphere)
  // let cameraPos = camera.position;
  // cameraPos.y = 10
  // cameraPos.lerp(sphere.position, 0.001);
  // camera.position.x = cameraPos.x;
  // camera.position.z = cameraPos.z;
  // camera.lookAt(sphere.position)
  MoveWhileLookingAt(camera, new THREE.Vector3(sphere.position.x - 10, 10, sphere.position.z), sphere.position);
  ghostSphere.position.x = sphere.position.x;
  sphere.position.x = Math.round(spherePosition.x)
  sphere.position.z = Math.round(spherePosition.z)
}
animate();

function roundFloat(desired, actual) {
  if (Math.abs(desired - actual) < 0.1) {
    return true;
  }
}

function MoveWhileLookingAt(object, destination, lookAt) {
  const fromPosition = object.position.clone();
  const fromLookAt = new THREE.Vector3(
    0,
    .001, // To avoid initial camera flip on certain starting points (like top down view)
    -object.position.distanceTo(lookAt) // THREE.Camera looks down negative Z. Remove the minus if working with a regular object.
  );
  object.localToWorld(fromLookAt);
  const tempTarget = fromLookAt.clone();
  function LookAtLerp(alpha) {
    // This goes in your render loop
    object.position.lerpVectors(fromPosition, destination, alpha);
    tempTarget.lerpVectors(fromLookAt, lookAt, alpha);
    object.lookAt(tempTarget);
  }
  LookAtLerp(.01);
}