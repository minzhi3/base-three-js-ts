import Ammo from "ammo.js";
import * as THREE from "three";

export class Physics {
  readonly gravityConstant = -9.8;
  // Physics configuration
  collisionConfiguration: Ammo.btSoftBodyRigidBodyCollisionConfiguration;
  physicsWorld: Ammo.btSoftRigidDynamicsWorld;
  transformAux1: Ammo.btTransform;
  rigidBodies: THREE.Object3D[] = [];
  init(): Promise<void> {
    return new Promise((resolve) => {
      Ammo(Ammo).then(() => {
        this.collisionConfiguration =
          new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
        const dispatcher = new Ammo.btCollisionDispatcher(
          this.collisionConfiguration
        );
        const broadphase = new Ammo.btDbvtBroadphase();
        const solver = new Ammo.btSequentialImpulseConstraintSolver();
        const softBodySolver = new Ammo.btDefaultSoftBodySolver();
        this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
          dispatcher,
          broadphase,
          solver,
          this.collisionConfiguration,
          softBodySolver
        );
        this.transformAux1 = new Ammo.btTransform();
        this.physicsWorld.setGravity(
          new Ammo.btVector3(0, this.gravityConstant, 0)
        );
        this.physicsWorld
          .getWorldInfo()
          .set_m_gravity(new Ammo.btVector3(0, this.gravityConstant, 0));
        resolve();
      });
    });
  }
  createRigidBody(
    threeObject: THREE.Object3D,
    physicsShape: Ammo.btCollisionShape,
    mass: number,
    pos: THREE.Vector3,
    quat: THREE.Quaternion
  ): Ammo.btRigidBody {
    threeObject.position.copy(pos);
    threeObject.quaternion.copy(quat);

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(
      new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
    );
    const motionState = new Ammo.btDefaultMotionState(transform);

    const localInertia = new Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      physicsShape,
      localInertia
    );
    const body = new Ammo.btRigidBody(rbInfo);

    threeObject.userData.physicsBody = body;

    if (mass > 0) {
      this.rigidBodies.push(threeObject);

      // Disable deactivation
      body.setActivationState(4);
    }

    this.physicsWorld.addRigidBody(body);
    return body;
  }

  updatePhysics(deltaTime: number): void {
    // Step world
    this.physicsWorld.stepSimulation(deltaTime, 10);

    // Update rigid bodies
    for (let i = 0, il = this.rigidBodies.length; i < il; i++) {
      const objThree = this.rigidBodies[i];
      const objPhys = objThree.userData.physicsBody as Ammo.btRigidBody;
      const ms = objPhys.getMotionState();
      if (ms) {
        ms.getWorldTransform(this.transformAux1);
        const p = this.transformAux1.getOrigin();
        const q = this.transformAux1.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}
