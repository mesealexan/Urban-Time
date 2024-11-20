import { ACESFilmicToneMapping, AmbientLight, BoxGeometry, Clock, GridHelper, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, sRGBEncoding } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { LoaderService } from "./services/load.service";
import { EventsService } from "./services/events.service";

let camera: PerspectiveCamera;
let walkCamera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let canvas: HTMLElement
let canvasRect: any;
let orbitControls: OrbitControls;
let loader = new LoaderService();
let eventsService: EventsService;
const clock = new Clock();

function init() {
    /* Canvas */
    canvas = document.getElementById('webGL');
    canvasRect = canvas.getBoundingClientRect();

    /* Cameras */
    camera = new PerspectiveCamera(55, canvasRect.width / canvasRect.height, 0.1, 300);
    camera.position.set(-100, 6, 0);

    /* Scene */
    scene = new Scene();

    /* Renderer */
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRect.width, canvasRect.height);

    renderer.outputEncoding = sRGBEncoding;
    canvas.appendChild(renderer.domElement);
    // renderer.toneMapping = ACESFilmicToneMapping;

    /* Camera Controls */
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, -15, 0);
    orbitControls.update()

    /* Load Scene */
    loadScene().then(_ => {
        animate();
    })

    /* Grid Helper */
    const gridHelper = new GridHelper(10, 10)
    scene.add(gridHelper)

    /* Events */
    eventsService = new EventsService(camera, renderer, scene, canvas);
}

function loadScene() {
    return new Promise((resolve, reject) => {
        const promises = [];

        promises.push(loader.loadGLTF('assets/models/accumoli.glb'));
        promises.push(loader.loadHDR('assets/textures/kloppenheim_05_puresky_1k.hdr', renderer));

        Promise.all(promises).then((result) => {
            const glbScene = result[0];
            const hdrImage = result[1];
            // scene.add(new AmbientLight(0xffffff, 1));
            scene.add(glbScene);
            scene.environment = hdrImage;
            scene.background = hdrImage;
            resolve({});
        })

    })
}



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
