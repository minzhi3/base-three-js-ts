import { Vector2 } from "three";

class TouchRoute {
  start = new Vector2();
  end = new Vector2();
  get diff(): Vector2 {
    return new Vector2(this.end.x - this.start.x, this.end.y - this.start.y);
  }
}

class Controller {
  isTouch = false;
  route = new TouchRoute();
  vector: Vector2;
  clickHandler: Function = null;
  dragHandler: Function = null;
  dragEndHandler: Function = null;
  private _setStartPoint(x: number, y: number): void {
    this.route.start.x = x;
    this.route.start.y = y;
  }
  private _setEndPoint(x: number, y: number): void {
    this.route.end.x = x;
    this.route.end.y = y;
  }
  get lastTouchPos(): Vector2 {
    return this.route.end;
  }
  initTouch(): void {
    const handleStart = (event: TouchEvent): void => {
      event.preventDefault();
      this._setStartPoint(event.touches[0].clientX, event.touches[0].clientY);
      this._setEndPoint(event.touches[0].clientX, event.touches[0].clientY);
      this.isTouch = true;
      if (this.clickHandler) this.clickHandler();
    };

    const handleEnd = (event: TouchEvent): void => {
      event.preventDefault();
      this._setStartPoint(this.route.end.x, this.route.end.y);
      //this._setEndPoint(event.touches[0].clientX, event.touches[0].clientY);
      this.isTouch = false;
      if (this.dragEndHandler) this.dragEndHandler();
    };
    const handleMove = (event: TouchEvent): void => {
      event.preventDefault();
      if (this.isTouch == false) {
        this._setStartPoint(event.touches[0].clientX, event.touches[0].clientY);
        this.isTouch = true;
      } else {
        this.route.end.x = event.touches[0].clientX;
        this.route.end.y = event.touches[0].clientY;
      }
      if (this.dragHandler) {
        if (this.route.diff.lengthSq() > 25) {
          this._setStartPoint(
            event.touches[0].clientX,
            event.touches[0].clientY
          );
          this.dragHandler();
        }
      }
    };
    const sceneElement = document.getElementById("canvas-frame");
    sceneElement.addEventListener("touchstart", handleStart, false);
    sceneElement.addEventListener("touchend", handleEnd, false);
    sceneElement.addEventListener("touchmove", handleMove, false);
    sceneElement.addEventListener("touchcancel", handleEnd, false);
  }
  initMouse(): void {
    const handleStart = (event: MouseEvent): void => {
      event.preventDefault();
      this._setStartPoint(event.clientX, event.clientY);
      this._setEndPoint(event.clientX, event.clientY);
      this.isTouch = true;
      if (this.clickHandler) this.clickHandler();
    };
    const handleEnd = (event: MouseEvent): void => {
      event.preventDefault();
      this._setStartPoint(event.clientX, event.clientY);
      this._setEndPoint(event.clientX, event.clientY);
      this.isTouch = false;
      if (this.dragHandler) this.dragEndHandler();
    };
    const handleMove = (event: MouseEvent): void => {
      event.preventDefault();
      if (this.isTouch) {
        this.route.end.x = event.clientX;
        this.route.end.y = event.clientY;
        if (this.dragHandler) {
          if (this.route.diff.lengthSq() > 25) {
            this._setStartPoint(event.clientX, event.clientY);
            this.dragHandler();
          }
        }
      }
    };
    const sceneElement = document.getElementById("canvas-frame");
    sceneElement.addEventListener("mousedown", handleStart, false);
    sceneElement.addEventListener("mouseup", handleEnd, false);
    sceneElement.addEventListener("mousemove", handleMove, false);
    sceneElement.addEventListener("mouseleave", handleEnd, false);
  }
  init(): void {
    if ("ontouchstart" in window) {
      this.initTouch();
    } else {
      this.initMouse();
    }
  }
}

export const controller = new Controller();
