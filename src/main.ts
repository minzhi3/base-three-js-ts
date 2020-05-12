import { AppDapi, AppNormal } from "./app-wrapper";

// main
if (typeof dapi !== "undefined") {
  const app = new AppDapi(0);
  window.onload = (): void => {
    dapi.isReady()
      ? app.onReadyCallback()
      : dapi.addEventListener("ready", app.onReadyCallback);
  };
} else {
  window.addEventListener("DOMContentLoaded", () => {
    const app = new AppNormal(0);
    app.start();
  });
}
