import { Vec3 } from "./math/math";
import { RigidBody } from "./rigidbody";
import { Joint } from "./joint";

export interface WorldParameter {
  timestep?: number;
  iterations?: number;
  broadphase?: number; // 1: brute force, 2: sweep & prune, 3: volume tree
  worldscale?: number;
  random?: boolean;
  info?: boolean; // display statistique
  gravity?: number[];
}

export interface WorldAddParameter {
  type: string; // type of shape : sphere, box, cylinder
  name?: string;
  size?: number[]; // size of shape
  pos?: number[];
  rot?: number[]; // start rotation in degree
  move?: boolean; // dynamic or statique
  density?: number;
  friction?: number;
  restitution?: number;
  belongsTo?: number; // The bits of the collision groups to which the shape belongs.
  collidesWith?: number; // The bits of the collision groups with which the shape collides.

  body1?: string;
  body2?: string;
  pos1?: number[];
  pos2?: number[];
  axe1?: number[];
  axe2?: number[];
  min?: number;
  max?: number;
  collision?: boolean;
  spring?: boolean;
}

export class World {
  constructor(parameters?: WorldParameter);
  play(): void;
  stop(): void;
  setGravity(ar: Vec3): void;
  getInfo(): string;
  clear(): void;
  step(): void;
  addRigidBody(rigidBody: RigidBody): void;
  removeRigidBody(rigidBody: RigidBody): void;
  add(paramater?: WorldAddParameter): Joint | RigidBody;
}
