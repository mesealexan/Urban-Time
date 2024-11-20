import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { HalfFloatType, LoadingManager, PMREMGenerator, TextureLoader } from 'three'



export class LoaderService {
    manager: LoadingManager;
    glftLoader: GLTFLoader;
    rgbeLoader: RGBELoader;
    textureLoader: TextureLoader;

    constructor() {
        this.manager = new LoadingManager();
        this.glftLoader = new GLTFLoader(this.manager);
        this.rgbeLoader = new RGBELoader(this.manager);
        this.textureLoader = new TextureLoader(this.manager);
        this.textureLoader.setCrossOrigin('anonymous');

        this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
        }
        this.manager.onLoad = function () {
        }
        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log(itemsLoaded, itemsTotal)
            let percentage = (itemsLoaded / itemsTotal * 100).toFixed(1) + '%'
        }
        this.manager.onError = function (url) {
            console.log('There was an error loading ' + url);
        }
    }

    public loadHDR(url: string, renderer: THREE.WebGLRenderer) {
        return new Promise<any>((resolve, reject) => {
            let pmremGenerator = new PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();
            this.rgbeLoader.setDataType(HalfFloatType);
            if (!url) resolve(null);
            this.rgbeLoader.load(url, (res) => {
                const envMap = pmremGenerator.fromEquirectangular(res).texture;
                resolve(envMap);
            })
        })
    }

    public loadGLTF(url: string) {
        return new Promise<any>((resolve, reject) => {
            if (url.length > 0) {
                this.glftLoader.load(url, (gltf) => {
                    resolve(gltf.scene);
                })
            } else {
                resolve(null)
            }


        })
    }

    public loadTexture(url: string) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(url, (img) => {
                resolve(img)
            });
        })
    }

}