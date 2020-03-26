declare module "oimo" {
  type MassInfo = import("./rigidbody").MassInfo;
  type RigidBody = import("./rigidbody").RigidBody;
  type World = import("./world").World;
  type WorldParameter = import("./world").WorldParameter;
  function World(parameter: WorldParameter): void;
}
