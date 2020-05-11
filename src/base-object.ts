import * as THREE from "three";

export abstract class BaseObject {
  object: THREE.Group;
  mainScene: THREE.Scene;
  constructor(mainScene: THREE.Scene, name: string) {
    this.mainScene = mainScene;
    this.object = new THREE.Group();
    this.object.name = name;
    this.object.userData["tag"] = name;
  }
  abstract async init(): Promise<void>;
  abstract update(deltaTime: number);
}
