import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
const cameraSwitch = document.getElementById("camera-switch");
let camSwitch = true;
export class EventsService {
    camera: PerspectiveCamera;
    walkCamera: PerspectiveCamera;
    renderer: WebGLRenderer;
    scene: Scene;
    canvas: HTMLElement;
    activeCamera: PerspectiveCamera;

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer, scene: Scene, canvas: HTMLElement) {
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
        this.canvas = canvas;
        this.addEvents();
    }


    private addEvents() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    private onWindowResize() {
        const canvasRect = this.canvas.getBoundingClientRect();

        this.camera.aspect = canvasRect.width / canvasRect.height;
        this.camera.updateProjectionMatrix();

        this.walkCamera.aspect = canvasRect.width / canvasRect.height;
        this.walkCamera.updateProjectionMatrix();

        this.renderer.setSize(canvasRect.width, canvasRect.height)
    }


}