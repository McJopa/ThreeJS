import * as THREE from "three";
import { createGround } from "./world";
import { createCube } from "./objects";
import { Queue } from "./queue";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeJSQueue } from "./queueVisuals";


document.getElementById("enqueue")?.addEventListener("click", queueCube, false);


const scene = new THREE.Scene();
const colors = [
  "red",
  "green",
  "blue"
]
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

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

function queueCube() {
  queue.enqueueAnimate(`${queue.getLength()}`, createCube(1, colors[Math.round(Math.random() * 2)]), new THREE.Vector3(1, 1, 1));
}


