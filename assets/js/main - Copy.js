
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
let mesh;
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xeff5555);
scene.add(new THREE.HemisphereLight(0xffffcc, 0x333399, 1.0));
camera.position.set(-2, 2, 10);

new GLTFLoader().load('//cdn.wtlstudio.com/sample.wtlstudio.com/48315172-1012-4127-9e52-ed8738ba5e37.glb', ({ scene: model }, animations) => {
  scene.add(model);
  
  model.scale.setScalar(2.0);
  
  camera.lookAt(model.position);
  
  controls.target.copy(model.position);

  mesh = model;
});

const animate = () => {
  if (mesh) {
    mesh.rotateY(Math.PI / 360);
  }

  renderer.render(scene, camera);
  
  controls.update();

  requestAnimationFrame(animate);
};

animate();

document.body.appendChild(renderer.domElement);
