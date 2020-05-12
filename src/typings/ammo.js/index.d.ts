/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/class-name-casing */

declare module "ammo.js" {
  export function Ammo(param?: typeof Ammo): Promise<typeof Ammo>;
  export default Ammo;
  export namespace Ammo {
    class btSoftBodyRigidBodyCollisionConfiguration {}
    class btCollisionDispatcher {
      constructor(config: btSoftBodyRigidBodyCollisionConfiguration);
    }
    class btDbvtBroadphase {}
    class btSequentialImpulseConstraintSolver {}
    class btDefaultSoftBodySolver {}
    class btSoftRigidDynamicsWorld {
      constructor(
        dispatcher: btCollisionDispatcher,
        broadphase: btDbvtBroadphase,
        solver: btSequentialImpulseConstraintSolver,
        collisionConfiguration: btSoftBodyRigidBodyCollisionConfiguration,
        softBodySolver: btDefaultSoftBodySolver
      );
      setGravity(gravity: btVector3): void;
      getWorldInfo(): btSoftBodyWorldInfo;
    }
    class btTransform {}
    class btVector3 {
      constructor(x: number, y: number, z: number);
    }
    class btSoftBodyWorldInfo {
      set_m_gravity(m_gravity: btVector3): void;
    }
  }
}
