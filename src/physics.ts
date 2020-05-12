import Ammo from "ammo.js";

export class Physics {
  readonly gravityConstant = -9.8;
  // Physics configuration
  collisionConfiguration: Ammo.btSoftBodyRigidBodyCollisionConfiguration;
  physicsWorld: Ammo.btSoftRigidDynamicsWorld;
  transformAux1: Ammo.btTransform;
  init(): Promise<void> {
    return new Promise((resolve) => {
      Ammo(Ammo).then(() => {
        this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
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
}
