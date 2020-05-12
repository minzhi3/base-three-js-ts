import Ammo from "ammo.js";

export class Physics {
  gravityConstant = -9.8;
  // Physics configuration
  collisionConfiguration: Ammo.btSoftBodyRigidBodyCollisionConfiguration;
  dispatcher: any;
  broadphase: any;
  solver: any;

  softBodySolver: any;
  physicsWorld: Ammo.btSoftRigidDynamicsWorld;
  transformAux1: any;
  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      Ammo(Ammo).then(() => {
        console.log(Ammo);
        this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(
          this.collisionConfiguration
        );
        this.broadphase = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.softBodySolver = new Ammo.btDefaultSoftBodySolver();
        this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
          this.dispatcher,
          this.broadphase,
          this.solver,
          this.collisionConfiguration,
          this.softBodySolver
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
