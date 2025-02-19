// viewer/static/js/panorama.js
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    const canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Initial size
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100); // Initial aspect ratio
    camera.position.set(0, 0, 0.1);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.rotateSpeed = -0.3;

    // Modify pan speed based on FOV
    controls.getPanSpeed = function() {
        return 0.1 * camera.fov / 75;
    };

    /* Compute the target for a 95° left rotation.
    The default forward direction is (0, 0, -1).
    So, rotating by an angle φ about the Y-axis gives:
    x = -sin(φ)
    z = -cos(φ)
    Here φ is 95° converted to radians.
    */
    const phi = THREE.MathUtils.degToRad(140);
    // newTarget is a unit vector in the desired direction
    const newTarget = new THREE.Vector3(-Math.sin(phi), 0, -Math.cos(phi));
    // Set the camera to look at the new target.
    camera.lookAt(newTarget);
    // Also update the OrbitControls target.
    controls.target.copy(newTarget);
    controls.update();

    canvas.addEventListener('wheel', function(event) {
        event.preventDefault();
        const zoomSpeed = 0.05;
        camera.fov += event.deltaY * zoomSpeed;
        camera.fov = THREE.MathUtils.clamp(camera.fov, 10, 75);
        camera.updateProjectionMatrix();
    }, { passive: false });

    const textureLoader = new THREE.TextureLoader();
    // Use the globally defined variable for the image URL
    textureLoader.load(window.panoImageUrl, function(texture) {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        animate();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);
    // Adjust the rotation speed relative to the current FOV.
    const baseFov = 75;
    const baseSpeed = -0.3;
    controls.rotateSpeed = (camera.fov / baseFov) * baseSpeed;
    controls.update();
    renderer.render(scene, camera);
}

init();
