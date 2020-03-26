import { Quat, Vec3, Mat33 } from "./math/math";

export class MassInfo {}

/**
 * The class of rigid body.
 * Rigid body has the shape of a single or multiple collision processing,
 * I can set the parameters individually.
 * @author saharan
 * @author lo-th
 */
export class RigidBody {
  constructor(Position: Vec3, Rotation: Vec3);
  position: Vec3;
  orientation: Quat;

  scale: number;
  invScale: number;

  // possible link to three Mesh;
  mesh;

  id: number;
  name: string;

  prev;
  next;

  // I represent the kind of rigid body.
  // Please do not change from the outside this variable.
  // If you want to change the type of rigid body, always
  // Please specify the type you want to set the arguments of setupMass method.
  type: number;

  massInfo: MassInfo;

  newPosition: Vec3;
  controlPos: boolean;
  newOrientation: Quat;
  newRotation: Vec3;
  currentRotation: Vec3;
  controlRot: boolean;
  controlRotInTime: boolean;

  quaternion: Quat;
  pos: Vec3;

  // Is the translational velocity.
  linearVelocity: Vec3;
  // Is the angular velocity.
  angularVelocity: Vec3;

  //--------------------------------------------
  //  Please do not change from the outside this variables.
  //--------------------------------------------

  // It is a world that rigid body has been added.
  parent;
  contactLink;
  numContacts: number;

  // An array of shapes that are included in the rigid body.
  shapes;
  // The number of shapes that are included in the rigid body.
  numShapes: number;

  // It is the link array of joint that is connected to the rigid body.
  jointLink;
  // The number of joints that are connected to the rigid body.
  numJoints: number;

  // It is the world coordinate of the center of gravity in the sleep just before.
  sleepPosition: Vec3;
  // It is a quaternion that represents the attitude of sleep just before.
  sleepOrientation: Quat;
  // I will show this rigid body to determine whether it is a rigid body static.
  isStatic: boolean;
  // I indicates that this rigid body to determine whether it is a rigid body dynamic.
  isDynamic: boolean;

  isKinematic: boolean;

  // It is a rotation matrix representing the orientation.
  rotation: Mat33;

  //--------------------------------------------
  // It will be recalculated automatically from the shape, which is included.
  //--------------------------------------------

  // This is the weight.
  mass: number;
  // It is the reciprocal of the mass.
  inverseMass: number;
  // It is the inverse of the inertia tensor in the world system.
  inverseInertia: Mat33;
  // It is the inertia tensor in the initial state.
  localInertia: Mat33;
  // It is the inverse of the inertia tensor in the initial state.
  inverseLocalInertia: Mat33;

  tmpInertia: Mat33;

  // I indicates rigid body whether it has been added to the simulation Island.
  addedToIsland: boolean;
  // It shows how to sleep rigid body.
  allowSleep: boolean;
  // This is the time from when the rigid body at rest.
  sleepTime: number;
  // I shows rigid body to determine whether it is a sleep state.
  sleeping: boolean;

  setParent(world): void;

  /**
   * I'll add a shape to rigid body.
   * If you add a shape, please call the setupMass method to step up to the start of the next.
   * @param shape shape to Add
   */
  addShape(shape): void;
  /**
   * I will delete the shape from the rigid body.
   * If you delete a shape, please call the setupMass method to step up to the start of the next.
   * @param shape {Shape} to delete
   * @return void
   */
  removeShape(shape): void;

  remove(): void;

  dispose(): void;

  /**
   * Calulates mass datas(center of gravity, mass, moment inertia, etc...).
   * If the parameter type is set to BODY_STATIC, the rigid body will be fixed to the space.
   * If the parameter adjustPosition is set to true, the shapes' relative positions and
   * the rigid body's position will be adjusted to the center of gravity.
   * @param type
   * @param adjustPosition
   * @return void
   */
  setupMass(type: number, AdjustPosition: boolean): void;
  /**
   * Awake the rigid body.
   */
  awake(): void;
  /**
   * Sleep the rigid body.
   */
  sleep(): void;

  testWakeUp(): void;

  /**
   * Get whether the rigid body has not any connection with others.
   * @return {boolean}
   */
  isLonely(): boolean;

  /**
   * The time integration of the motion of a rigid body, you can update the information such as the shape.
   * This method is invoked automatically when calling the step of the World,
   * There is no need to call from outside usually.
   * @param  timeStep time
   * @return {void}
   */
  updatePosition(timeStep: number): void;

  getAxis(): Vec3;

  syncShapes(): void;

  //---------------------------------------------
  // APPLY IMPULSE FORCE
  //---------------------------------------------

  applyImpulse(position: Vec3, force: Vec3): void;

  //---------------------------------------------
  // SET DYNAMIQUE POSITION AND ROTATION
  //---------------------------------------------

  setPosition(pos: Vec3): void;

  setQuaternion(q: Quat): void;

  setRotation(rot: Vec3): void;

  //---------------------------------------------
  // RESET DYNAMIQUE POSITION AND ROTATION
  //---------------------------------------------

  resetPosition(): void;

  resetQuaternion(): void;

  resetRotation(): void;

  //---------------------------------------------
  // GET POSITION AND ROTATION
  //---------------------------------------------

  getPosition(): Vec3;
  getQuaternion(): Quat;
}
