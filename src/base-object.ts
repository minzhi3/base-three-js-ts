import * as THREE from "three";
import { World } from "oimo";

export abstract class BaseObject {
  object: THREE.Group;
  mainScene: THREE.Scene;
  physicsWorld: World;
  constructor(mainScene: THREE.Scene, physicsWorld: World, name: string) {
    this.mainScene = mainScene;
    this.physicsWorld = physicsWorld;
    this.object = new THREE.Group();
    this.object.name = name;
    this.object.userData["tag"] = name;
  }
  abstract async init(): Promise<void>;
  abstract update(deltaTime: number);
}
