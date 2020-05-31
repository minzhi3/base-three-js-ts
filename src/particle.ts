import * as THREE from "three";

import { BaseObject } from "./base-object";
import { Physics } from "./physics";
import { MathUtils } from "three";
import particleImage from "./assets/png/confetti.png";
import rotateGlsl from "./assets/rotate-uv.glsl";
import fragGlsl from "./assets/fragshader.glsl";
import vertexGlsl from "./assets/vertexshader.glsl";
import * as loader from "./utils/resource-manager";

export class Particle extends BaseObject {
  object: THREE.Group;
  time = 0;
  materialShader: THREE.Shader;
  material: THREE.PointsMaterial;
  pointList: THREE.Vector3[] = [];
  geometry: THREE.BufferGeometry;
  constructor(mainScene: THREE.Scene, world: Physics) {
    super(mainScene, world, "particle");
  }
  async init(): Promise<void> {
    this.geometry = new THREE.SphereBufferGeometry(1, 8, 8);
    const particleTexture = await loader.loadTexture(particleImage);
    const fragShader = await loader.loadText(fragGlsl);
    const vertexShader = await loader.loadText(vertexGlsl);
    this.material = new THREE.PointsMaterial({
      size: 0.3,
      transparent: true,
      //vertexColors: true,
      map: particleTexture,
    });
    console.log(THREE.ShaderChunk.common);
    this.material.onBeforeCompile = (shader): void => {
      shader.fragmentShader = fragShader;
      shader.vertexShader = vertexShader;
      shader.uniforms.time = { value: 0.0 };
      //console.log(shader.fragmentShader);
      //console.log(shader.uniforms);
      this.materialShader = shader;
    };
    const pos = this.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      this.pointList.push(
        new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
      );
    }
    console.log(pos);
    const colorAttribute = new THREE.BufferAttribute(
      new Float32Array(pos.count),
      1
    );
    for (let i = 0; i < colorAttribute.count; i++) {
      const colorIndex = MathUtils.randInt(0, 8);
      colorAttribute.setX(i, colorIndex);
    }
    this.geometry.setAttribute("type", colorAttribute);

    const sphere = new THREE.Points(this.geometry, this.material);
    this.object.add(sphere);
    this.object.position.setZ(-1);

    this.mainScene.add(this.object);
  }
  update(deltaTime: number): void {
    this.time += deltaTime;
    if (this.materialShader) {
      this.materialShader.uniforms.time.value = this.time;
    }
    //this.pointList.forEach((item) => {
    //  item.y -= deltaTime * (deltaTime * 20);
    //});
    //this.geometry.setFromPoints(this.pointList);

    //this.object.rotateX(0.1 * deltaTime);
    return;
  }
}
