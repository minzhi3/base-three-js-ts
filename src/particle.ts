import * as THREE from "three";

import { BaseObject } from "./base-object";
import { Physics } from "./physics";
import { MathUtils } from "three";
import blockImage from "./assets/block.png";
import rotateGlsl from "./assets/rotate-uv.glsl";
import * as loader from "./utils/resource-manager";

export class Paritcle extends BaseObject {
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
    const blockTexture = await loader.loadTexture(blockImage);
    const myMapFragment = await loader.loadText(rotateGlsl);
    console.log(myMapFragment);
    this.material = new THREE.PointsMaterial({
      size: 0.3,
      transparent: true,
      vertexColors: true,
      map: blockTexture,
    });
    this.material.onBeforeCompile = (shader): void => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_particle_fragment>",
        myMapFragment
      );
      shader.fragmentShader = "uniform float time;\n" + shader.fragmentShader;
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
      new Float32Array(pos.count * 3),
      3
    );
    const presetColor = [
      new THREE.Color(0x91f852),
      new THREE.Color(0xeb4d87),
      new THREE.Color(0xea3bf7),
      new THREE.Color(0x5ca8f8),
      new THREE.Color(0x9bfcfd),
      new THREE.Color(0x8942f6),
      new THREE.Color(0xf3b453),
      new THREE.Color(0xfeff66),
      new THREE.Color(0x6ff079),
    ];
    for (let i = 0; i < colorAttribute.count; i++) {
      const colorIndex = MathUtils.randInt(0, 8);
      const c = presetColor[colorIndex];
      colorAttribute.setXYZ(i, c.r, c.g, c.b);
    }
    this.geometry.setAttribute("color", colorAttribute);

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
    this.pointList.forEach((item) => {
      item.y -= deltaTime * (deltaTime * 20);
    });
    this.geometry.setFromPoints(this.pointList);

    //this.object.rotateX(0.1 * deltaTime);
    return;
  }
}
