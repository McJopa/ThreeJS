import * as THREE from "three";
import { createGround } from "./world";
import { createCube } from "./objects";
import { Queue } from "./queue";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeJSQueue } from "./queueVisuals";


document.getElementById("enqueue")?.addEventListener("click", queueCube, false);
document.getElementById("dequeue")?.addEventListener("click", dequeueCube, false);

const clock = new THREE.Clock(true);
clock.start();
const scene = new THREE.Scene();

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

// lighting setup 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

scene.background = new THREE.Color("skyblue")

// camera setup
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  50,
  aspectRatio,
  0.1,
  100000
)
camera.position.set(0, 5, 10);
camera.lookAt(0, 2, 0);


// world setup
const plane = createGround(200, 10, "white");
scene.add(plane);

// const cubeLength = 1;
// const cube = createCube(cubeLength, "red");
// cube.position.y += cubeLength / 2
// scene.add(cube);

// renderer setup 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);


const queue = new ThreeJSQueue(100, scene, 0);
let clockElapsedTime = 0;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  autoRun();
  clockElapsedTime = Math.round(clock.getElapsedTime());
}
animate();

function queueCube() {
  queue.enqueueAnimate(`${queue.getLength()}`, createCube(1, colorArray[Math.round(Math.random() * colorArray.length)]), new THREE.Vector3(1, 1, 1));
}

function dequeueCube() {
  queue.dequeueAnimate();
}

function autoRun() {
  if (clockElapsedTime != Math.round(clock.getElapsedTime())) {
    if (Math.random() > 0.25) {
      if (!queue.isFull()) {
        queueCube();
      }
    }
    else {
      if (!queue.isEmpty()) {
        dequeueCube();
      }
    }
  }
}
