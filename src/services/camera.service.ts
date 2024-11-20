
import { PerspectiveCamera, Raycaster, Vector3 } from 'three'

export class CameraService {
    constructor(camera: PerspectiveCamera, container: HTMLElement) {
      this.camera = camera
      this.initPointX = 0
      this.initPointY = 0
      this.initPointXRotate = 0
      this.initPointYRotate = 0
      this.raycaster = new Raycaster()
      //@ts-ignore
      this.camera.eulerOrder = "YXZ";
    }
  
  
    public forwardMovementScalar = 0;
    public sideMovementScalar = 0;
    public forwardRotationScalar = 0;
    public sideRotationScalar = 0;
  
    public updateMovement() {
      // this.rotateVertical(this.sideRotationScalar);
      // this.rotate(this.forwardRotationScalar);
      this.cameraFoward(this.forwardMovementScalar);
      this.cameraRight(this.sideMovementScalar);
  
    }
  
  
    setMeshContraint(value: any) {
      this.meshContraint = value;
    }
    
    getMeshContraint() {
      return this.meshContraint;
    }

    dispose(): void {
      //@ts-ignore
      this.controls = null
    }
  
    move(clientX: number, clientY: number): void {
      let deltaX = clientX - this.initPointX
      let deltaY = clientY - this.initPointY
  
      this.controlsFoward(deltaY / 10)
      this.controlsRight(-deltaX / 20)
      if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) == false) {
        this.controlsFoward(-deltaY / 10)
        this.controlsRight(deltaX / 20)
      }
    }
  
    setInitPoint(clientX: number, clientY: number): void {
      this.initPointX = clientX
      this.initPointY = clientY
    }
  
    setInitPointRotate(clientX: number, clientY: number): void {
      this.initPointXRotate = clientX
      this.initPointYRotate = clientY
    }
  
  
    rotate(clientX: number): void {
      // let deltaX = clientX - this.initPointXRotate
  
      this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), (-clientX / 300))
      this.camera.rotation.z = 0
    }
  
    rotateMouse(clientX: number): void {
      let deltaX = clientX - this.initPointXRotate
  
      this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), (-deltaX / 300))
      this.camera.rotation.z = 0
    }
  
    rotateVertical(clientY: number): void {
      let v1 = new Vector3(0, 1, 0)
      let v2 = new Vector3()
      this.camera.getWorldDirection(v2)
  
      let v3 = new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x))
  
      // let deltaY = clientY - this.initPointYRotate
  
      this.initAngle += clientY
      if (this.checkCameraRotationMouse(this.initAngle) == false) {
        this.camera.rotateOnWorldAxis(v3, clientY)
      } else {
        this.initAngle -= clientY
      }
      this.camera.rotation.z = 0
    }
  
    rotateVerticalMouse(clientY: number): void {
      let v1 = new Vector3(0, 1, 0)
      let v2 = new Vector3()
      this.camera.getWorldDirection(v2)
  
      let v3 = new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x))
  
      let deltaY = clientY - this.initPointYRotate
  
      this.initAngle += deltaY
      // if(this.checkCameraRotationMouse(this.initAngle) == false){   
      this.camera.rotateOnWorldAxis(v3, deltaY / 300)
      // }
      this.camera.rotation.z = 0
    }
  
    setInitialRotation(horizontal: number, vertical: number) {
      let v1 = new Vector3(0, 1, 0)
      let v2 = new Vector3()
      this.camera.getWorldDirection(v2)
  
      let v3 = new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x))
      this.camera.rotateOnWorldAxis(v3, vertical)
  
      this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), horizontal)
    }
  
    moveForward(value: number): void {
      let dist
      if (this.initZoomDist > value) {
        dist = value
      } else {
        dist = value * -1
      }
      this.camera.translateZ(dist / 100)
      if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) == false) {
        this.camera.translateZ(-dist / 100)
      }
    }
  
    zoomMouse(value: number, camera?: any): void {
      // 25 si 65
      let internalCamera = this.camera;
      if(camera) internalCamera = camera;
      internalCamera.fov = Math.min(Math.max(internalCamera.fov + value, 30), 65);
      internalCamera.updateProjectionMatrix()
      // if(this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) == false){
      // this.camera.translateZ(-value)
      // }
    }
  
    cameraFoward(distance: number) {
      this.controlsFoward(distance)
      if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) == false) {
        this.controlsFoward(-distance)
  
  
      }
    }
  
    cameraRight(distance: number) {
      this.controlsRight(distance)
      if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) == false) {
        this.controlsRight(-distance)
      }
    }
  
    setInitZoomPoint(dist: number) {
      this.initZoomDist = dist
  
    }
  
    checkLimits(x: number, y: number, z: number): boolean {
      if (!this.meshContraint) return false
      this.raycaster.set(
        new Vector3(x, 100, z),
        new Vector3(0, -1, 0)
      )
      let ints = this.raycaster.intersectObject(this.meshContraint)
      if (ints[0]) {
        this.camera.position.y = ints[0].point.y
        return true
      }
      return false
    }
  
    checkCameraRotationMouse(y: number): boolean {
      if (y < 0.88 && y > -0.36) {
        return false
      }
      return true
    }
  
    controlsFoward(distance: number, v: Vector3 = new Vector3()) {
      v.setFromMatrixColumn(this.camera.matrix, 0);
  
      v.crossVectors(this.camera.up, v);
  
      this.camera.position.addScaledVector(v, distance);
    }
  
    controlsRight(distance: number, v: Vector3 = new Vector3()) {
      v.setFromMatrixColumn(this.camera.matrix, 0);
  
      this.camera.position.addScaledVector(v, distance);
    }
    camera: PerspectiveCamera
    initPointX: number = 0
    initPointY: number = 0
    initPointXRotate: number = 0
    initPointYRotate: number = 0
    initZoomDist: number = 0
    initAngle: number = 0
    meshContraint: any
    raycaster: any
  }