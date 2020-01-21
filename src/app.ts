import * as THREE from "three";

export default class App {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  clock = new THREE.Clock();
  cube: THREE.Object3D;
  needResize: boolean;
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("main-scene") as HTMLCanvasElement
    });
    this.renderer.setClearColor(0x2f3c29, 1.0);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, undefined, 1, 1000);
    this.camera.position.set(0, 15, -12);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(new THREE.Vector3());

    //light
    const light = new THREE.DirectionalLight(0xebd6c8, 2.5);
    light.position.set(-2, 3, -3);
    const ambientLight = new THREE.AmbientLight(0xa2a8b6, 1.25);
    this.scene.add(light);
    this.scene.add(ambientLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    const cube = new THREE.Mesh(geometry, material);
    this.cube = cube;
    this.scene.add(cube);
  }

  init(): void {
    this.windowResize();
  }
  render(): void {
    const deltaTime = this.clock.getDelta();
    if (this.needResize) this.windowResize();
    this.cube.rotateY(deltaTime * 1);
    this.cube.rotateX(deltaTime * 0.5);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  windowResize(): void {
    const width = document.getElementById("canvas-frame").clientWidth;
    const height = document.getElementById("canvas-frame").clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  bindWindowEvent(window: Window): void {
    window.addEventListener("resize", () => {
      this.needResize = true;
    });
  }

  run(): void {
    this.render();
  }
}
