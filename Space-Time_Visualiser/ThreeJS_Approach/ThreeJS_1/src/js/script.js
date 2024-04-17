import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui';


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const BoxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry,BoxMaterial);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(4, 100, 100);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);  
sphere.position.set(-10, 10, 0);

//const ambientLight = new THREE.AmbientLight(0x333333);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
//scene.add(directionalLight);
//directionalLight.position.set(-30, 50, 0);

//const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add(dLightHelper);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gui = new dat.GUI();

const option = {
    sphereColor: '#ffea00', 
    wireframe: false,
    speed: 0.01
};

gui.addColor(option,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
});

gui.add(option, 'wireframe').onChange(function(e){
    sphere.material.wireframe= e;
});

gui.add(option, 'speed', 0, 0.1);

let step = 0;

const gridHelper = new THREE.GridHelper(30,70);
scene.add(gridHelper);

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    step += option.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

//install npm parcel -g
//delete parcel Cache and dist
//If cache remains the try to look at the documentation stored at D/Soham