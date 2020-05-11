import "./assets/main.css";

import * as THREE from "three";

import { controller } from "./controller";
import { Dough } from "./dough";
import { uiController } from "./ui";

export class App {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  clock = new THREE.Clock();
  needResize = false;
  state = 0;
  dough: Dough;
  size = { width: 0, height: 0 };
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("main-scene") as HTMLCanvasElement,
    });
    this.renderer.setClearColor(0x2f3c29, 1.0);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, undefined, 0.3, 1000);
    this.camera.position.set(0, 4, -3);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // light
    const light = new THREE.DirectionalLight(0xebd6c8, 1.1);
    light.position.set(-5, 3, -3);
    const ambientLight = new THREE.AmbientLight(0xa2a8b6, 1.1);
    this.scene.add(light);
    this.scene.add(ambientLight);

    // object
    this.dough = new Dough(this.scene);
  }

  async init(): Promise<void> {
    this.windowResize();
    controller.init();
    uiController.init();
    await Promise.all([this.dough.init()]);
    uiController.hideLoading();
  }
  render(): void {
    const deltaTime = this.clock.getDelta();
    if (this.needResize) {
      this.windowResize();
      this.needResize = false;
    }

    this.mainloop(deltaTime);
    this.scene.children.forEach((item) => {
      switch (item.userData["tag"]) {
        case "dough":
          this.dough.update(deltaTime);
          break;
      }
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  windowResize(): void {
    const width = document.getElementById("canvas-frame").clientWidth;
    const height = document.getElementById("canvas-frame").clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    uiController.setSize(height, width);
  }
  bindWindowEvent(window: Window): void {
    window.addEventListener("resize", () => {
      this.needResize = true;
    });
  }
  setFullScreenInstall(): void {
    const eventName = "ontouchstart" in window ? "touchstart" : "click";
    document
      .getElementById("install")
      .removeEventListener(eventName, uiController.installClick, false);

    controller.clickHandler = (): void => {
      uiController.installClick();
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mainloop(deltaTime: number): void {
    switch (this.state) {
      case 0:
        break;
    }
    return;
  }

  resizeRequest(width: number, height: number): void {
    this.size = { width, height };
    this.needResize = true;
  }
  run(): void {
    this.render();
  }
}
