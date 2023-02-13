import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// All parameters for light
const parameters = {
    ambientLight:{
        color: 0xffffff,
        intensity: 0.5,
        visible:true,
    },
    directionalLight:{
        color:0x00fffc,
        intensity: 0.3,
        visible:true,
        position:{
            x:1,
            y:0.25,
            z:0
        }
    },
    hemisphereLight: {
        color: 0xff0000,
        groundColor: 0x0000ff,
        intensity: 0.3,
        visible:true,
        
    },
    pointLight: {
        color: 0xff9000,
        intensity: 0.5,
        distance:10,
        decay:2,
        position:{
            x:1,
            y:-0.5,
            z:1
        },
        visible:true
    },
    rectAreaLight: {
        color: 0x4e00ff,
        intensity:2,
        width:3,
        height:1,
        position:{
            x:-1.5,
            y:0,
            z:1.5
        },
        visible:true
    },
    spotLight: {
        color: 0x78ff00,
        intensity: 0.5,
        distance: 10,
        angle: Math.PI * 0.1,
        penumbra: 0.25,
        decay: 1,
        position:{
            x: -0.75
        },
        visible:true
    }
}
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/4.png');


/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font)=>{
    const textGeometry = new TextGeometry(
        'Try Lights - Dhruv',
        {
            font:font,
            size:0.3,
            height:0.1,
            curveSegments:3,
            bevelEnabled:true,
            bevelThickness:0.03,
            bevelSize:0.02,
            bevelOffset:0,
            bevelSegments:10
        }
    );
    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial();
    material.matcap = texture;
    const text = new THREE.Mesh(textGeometry,material);
    text.position.y = 1;
    scene.add(text);
})

/**
 * Base
 */
// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

// Ambient Light -   (color, intensity) -  Every part of the mesh is illuminated the same way
// Good to simulate light bouncing
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(parameters.ambientLight.color);
ambientLight.intensity = parameters.ambientLight.intensity;
scene.add(ambientLight);

//directionalLight(color)
const directionalLight = new THREE.DirectionalLight();
directionalLight.color = new THREE.Color(parameters.directionalLight.color);
directionalLight.intensity = parameters.directionalLight.intensity;
directionalLight.position.set(parameters.directionalLight.position.x, parameters.directionalLight.position.y, parameters.directionalLight.position.z); // (1,0.25,0) coming from the right, distance does not matter for now
scene.add(directionalLight);


// HemiSphereLight - works like ambient light, comes from everywhere -  grass on floor and sky is blue, will look like light is bouncing, cheap interms of performance
const hemisphereLight = new THREE.HemisphereLight();
hemisphereLight.color = new THREE.Color(parameters.hemisphereLight.color); // red at top
hemisphereLight.groundColor = new THREE.Color(parameters.hemisphereLight.groundColor); // blue at bottom
hemisphereLight.intensity = parameters.hemisphereLight.intensity;
scene.add(hemisphereLight);

// Point Light -  its like a lighter (imagine lighter in dark)
const pointLight = new THREE.PointLight();
pointLight.color = new THREE.Color(parameters.pointLight.color);
pointLight.intensity = parameters.pointLight.intensity;
pointLight.distance = parameters.pointLight.distance;
pointLight.decay = parameters.pointLight.decay;
pointLight.position.set(parameters.pointLight.position.x, parameters.pointLight.position.y, parameters.pointLight.position.z);
scene.add(pointLight);
//Distance and decay help in how fast a light fades


//RectAreaLight - Its like a photoshoot light -> only works with MeshStandard Material and Mesh Physical Material
const rectAreaLight = new THREE.RectAreaLight();
rectAreaLight.color = new THREE.Color(parameters.rectAreaLight.color);
rectAreaLight.intensity = parameters.rectAreaLight.intensity;
rectAreaLight.width = parameters.rectAreaLight.width;
rectAreaLight.height = parameters.rectAreaLight.height;
rectAreaLight.position.set(parameters.rectAreaLight.position.x, parameters.rectAreaLight.position.y, parameters.rectAreaLight.position.z);
rectAreaLight.lookAt(new THREE.Vector3()) // do after changing position always // done for centering the light
scene.add(rectAreaLight);

//SpotLight -  its like a flashlight
const spotLight = new THREE.SpotLight();
spotLight.color = new THREE.Color(parameters.spotLight.color);
spotLight.intensity = parameters.spotLight.intensity;
spotLight.distance = parameters.spotLight.distance;
spotLight.angle = parameters.spotLight.angle; // how wide 
spotLight.penumbra = parameters.spotLight.penumbra; // dimness on edges of shape -0 will make it sharp
spotLight.decay = parameters.spotLight.decay; // how it fades
spotLight.target.position.x = parameters.spotLight.position.x;
scene.add(spotLight.target);
scene.add(spotLight);

/**
 * 
 * Lights can cost a lot to performance issues
 * try to put as few as possible
 * try to use that cost less
 * least cost ->ambient, hemisphere
 * medium cost ->point, directional
 * hight cost -> rect, spot
 * 
 * We can bake lights using textures 
 * We do this using 3d softwares like blender
 * make models with lights embeded to models
 * Use Helpers to position Light
 
 */

/**
 * Helpers -  Light
 */

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1); // (light, size_of_helper) // not so useful because light comes fromevery where
// scene.add(hemisphereLightHelper);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2); // useful
// scene.add(directionalLightHelper);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2); // useful
// scene.add(pointLightHelper);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight); // No size
// scene.add(spotLightHelper);
// // Below needs to imported
// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
// scene.add(rectAreaLightHelper);



// Debig UI
//ambientLight

const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('Intensity');
ambientLightFolder.add(ambientLight, 'visible').name('Toggle');
ambientLightFolder.addColor(parameters.ambientLight, 'color').onChange(()=>{
    ambientLight.color.set(parameters.ambientLight.color)
}).name('Color');
ambientLightFolder.close();

//directionalLight
const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('Intensity');
directionalLightFolder.add(directionalLight, 'visible').name('Toggle');
directionalLightFolder.addColor(parameters.directionalLight, 'color').onChange(()=>{
    ambientLight.color.set(parameters.directionalLight.color)
}).name('Color');
directionalLightFolder.close();

//hemisphereLight
const hemisphereLightFolder = gui.addFolder('HemiSphere Light');
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('Intensity');
hemisphereLightFolder.add(hemisphereLight, 'visible').name('Toggle');
hemisphereLightFolder.addColor(parameters.hemisphereLight, 'color').onChange(()=>{
    hemisphereLight.color.set(parameters.hemisphereLight.color)
}).name('Color');
hemisphereLightFolder.addColor(parameters.hemisphereLight, 'groundColor').onChange(()=>{
    hemisphereLight.groundColor.set(parameters.hemisphereLight.groundColor)
}).name('Ground Color');
hemisphereLightFolder.close();

//pointLight
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('Intensity');
pointLightFolder.add(pointLight, 'visible').name('Toggle');
pointLightFolder.addColor(parameters.pointLight, 'color').onChange(()=>{
    pointLight.color.set(parameters.pointLight.color)
}).name('Color');
pointLightFolder.close();

//rectAreaLight
const rectAreaLightFolder = gui.addFolder('Rect Area Light');
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.1).name('Intensity');
rectAreaLightFolder.add(rectAreaLight, 'visible').name('Toggle');
rectAreaLightFolder.addColor(parameters.rectAreaLight, 'color').onChange(()=>{
    rectAreaLight.color.set(parameters.rectAreaLight.color)
}).name('Color');
rectAreaLightFolder.close();

//spotLight
const spotLightFolder = gui.addFolder('Spot Light');
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.1).name('Intensity');
spotLightFolder.add(spotLight, 'visible').name('Toggle');
spotLightFolder.addColor(parameters.spotLight, 'color').onChange(()=>{
    spotLight.color.set(parameters.spotLight.color)
}).name('Color');
spotLightFolder.close();


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()