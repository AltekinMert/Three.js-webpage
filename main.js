import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(39);
renderer.render( scene , camera);

const geometry = new THREE.TorusGeometry(10 ,3 ,16,100);
const material = new THREE.MeshStandardMaterial({ color : 0xFF6347 });
const torus = new THREE.Mesh(geometry,material);

// scene.add(torus);


// Global variable to store the loaded object
let loadedObject = null;
// Load .mtl and .obj files
const mtlLoader = new MTLLoader();
mtlLoader.load('./public/lastry.mtl', (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  
  objLoader.load('./public/lastry.obj', (object) => {
    loadedObject = object; // Assign the loaded object to the global variable
    loadedObject.scale.set(5,5,5);
    scene.add(loadedObject);
    loadedObject.position.set(0, 0, 0); // Set the initial position
  });
});





const pointLight = new THREE.PointLight(0xffffff,100);
pointLight.position.set(4,0,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper , gridHelper);

const controls = new OrbitControls(camera , renderer.domElement);


function animate (){
  requestAnimationFrame( animate );


  torus.rotation.y += 0.005;
  if (loadedObject) {
    loadedObject.rotation.y += 0.01;  // Rotate the loaded object
  }
  
  controls.update();

  renderer.render( scene, camera);
}
animate();