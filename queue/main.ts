import * as THREE from "three";
import { createGround } from "./world";
import { createCube } from "./cube";
import { Queue } from "./queue";
import { ThreeJSQueue } from "./queueVisuals";
import { createControls } from "./controls";
import { Interface } from "./interface";

var colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

// document.getElementById("enqueue")?.addEventListener("click", queueCube, false);
// document
//   .getElementById("dequeue")
//   ?.addEventListener("click", dequeueCube, false);

const clock = new THREE.Clock(true);
clock.start();
let clockElapsedTime = 0;

const scene = new THREE.Scene();

// LIGHTING SETUP
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(25, 30, -15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 20000;
directionalLight.shadow.mapSize.height = 20000;
let d = 100;
directionalLight.shadow.camera.left = -d;
directionalLight.shadow.camera.right = d;
directionalLight.shadow.camera.top = d;
directionalLight.shadow.camera.bottom = -d;

directionalLight.shadow.radius = 1;
scene.add(directionalLight);
scene.background = new THREE.Color("white");

// CAMERA SETUP
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 100000);
camera.position.set(20, 20, 20);
// camera.rotation.set(0, 7.62, 0.00);
camera.lookAt(-4, 1, -2);

// WORLD SETUP
const plane = createGround(200, 10, "white");
plane.receiveShadow = true;
scene.add(plane);

// RENDER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// QUEUE SETUP
let queueInitialLength = 15;
const queue = new ThreeJSQueue(queueInitialLength, scene, 0);

// const controls = new OrbitControls(camera, renderer.domElement);
const controls = createControls(camera, renderer);
controls.enableDamping = true;
controls.enablePan = false;

// ANINMATE LOOP
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  autoRun();
  clockElapsedTime = Math.round(clock.getElapsedTime());
  queue.animateMovements();
  camera.updateProjectionMatrix();
}
animate();

// ONCLICK CALLBACKS
function queueCube() {
  queue.enqueueAnimate(
    `${queue.getLength()}`,
    createCube(1, colorArray[Math.round(Math.random() * colorArray.length)]),
    new THREE.Vector3(1, 1, 1)
  );
}
function dequeueCube() {
  queue.dequeueAnimate();
}
addEventListener("resize", (event) => {});
onresize = (event) => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  // console.log(event);
  // console.log(aspectRatio)
  camera.aspect = aspectRatio;
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const queueControls = {
  enqueue: queueCube,
  dequeue: dequeueCube,
  maxLength: queueInitialLength,
};

const gui = new Interface(camera, queueControls, queue);

// const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

// randomly queue and dequeue objects
function autoRun() {
  if (clockElapsedTime != Math.round(clock.getElapsedTime())) {
    if (Math.random() > 0.3) {
      if (!queue.isFull()) {
        queueCube();
      }
    } else {
      if (!queue.isEmpty()) {
        dequeueCube();
      }
    }
  }
}
