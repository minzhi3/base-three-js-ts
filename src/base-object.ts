import * as THREE from "three";
import { Physics } from "./physics";

export abstract class BaseObject {
  object: THREE.Group;
  mainScene: THREE.Scene;
  physicsWorld: Physics;
  constructor(mainScene: THREE.Scene, world: Physics, name: string) {
    this.mainScene = mainScene;
    this.object = new THREE.Group();
    this.object.name = name;
    this.object.userData["tag"] = name;
    this.physicsWorld = world;
  }
  abstract async init(): Promise<void>;
  abstract update(deltaTime: number);
}
