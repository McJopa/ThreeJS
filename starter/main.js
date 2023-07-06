import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("grey");
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
// const camera = new THREE.PerspectiveCamera(1, width / height, 1, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

drawGrid(100, 100, 32, 32);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

camera.position.z = 500;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

function addCube(x, y, width, height, color) {
  const geometry = new THREE.BoxGeometry(width, height, Math.random() * 3);
  // const material = new THREE.MeshBasicMaterial({ color });
  const material = new THREE.MeshBasicMaterial({ color: Math.random() * 9999999 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.set(x, y, 0);
}

function drawGrid(width, height, numRows, numColumns) {
  const cubeWidth = width / numColumns;
  const cubeHeight = height / numRows;
  console.log(cubeWidth, cubeHeight);
  let count = 1;
  for (let y = 0; y < numColumns; y += cubeWidth) {
    for (let x = 0; x < numColumns; x += cubeHeight) {
      let color = count % 2 == 0 ? "white" : "black";
      count += 1;
      addCube(x - window.innerWidth / 60, y - window.innerHeight / 60, cubeWidth, cubeHeight, color);
    }
  }
}