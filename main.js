import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

let scene, camera, renderer;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    document.body.appendChild(renderer.domElement);
    
    document.body.appendChild(VRButton.createButton(renderer));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 3000;

    // Creación del Skybox
    const materialArray = [];
    const textureLoader = new THREE.TextureLoader();
    const texturePaths = [
    'Public/Moon/indigo_ft.jpg',
    'Public/Moon/indigo_bk.jpg',
    'Public/Moon/indigo_up.jpg',
    'Public/Moon/indigo_dn.jpg',
    'Public/Moon/indigo_rt.jpg',
    'Public/Moon/indigo_lf.jpg',
    ];

    texturePaths.forEach((path) => {
    const texture = textureLoader.load(path);
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }));
    });

    const skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skybox = new THREE.Mesh(skyboxGeometry, materialArray);
    scene.add(skybox);

    renderer.setAnimationLoop(() => animate());
}

function animate() {
    renderer.render(scene, camera);
}

init();
