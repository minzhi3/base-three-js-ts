import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new THREE.LoadingManager(
  () => {
    return;
  },
  (item, loaded, total) => {
    console.log(`${loaded} of ${total} - ${item.substr(0, 100)}`);
  },
  (url) => {
    console.error(`${url} error`);
  }
);
const textLoader = new THREE.FileLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

export function loadText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    textLoader.load(
      url,
      (response) => {
        resolve(response as string);
      },
      () => {
        return;
      },
      (event) => {
        reject(event.message);
      }
    );
  });
}

export function loadTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (response) => {
        resolve(response);
      },
      () => {
        return;
      },
      (event) => {
        reject(event.message);
      }
    );
  });
}

export function loadGltf(url: string): Promise<GLTF> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (response) => {
        resolve(response);
      },
      () => {
        return;
      },
      (event) => {
        reject(event.message);
      }
    );
  });
}
