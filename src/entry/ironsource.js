import { AppDapi } from "../app-wrapper";

window.onload = function () {
  const app = new AppDapi(0);
  app.setInstall(install);
  dapi.isReady()
    ? app.onReadyCallback()
    : dapi.addEventListener("ready", app.onReadyCallback);
  //Here you can put other code that not related to dapi logic
};

function install() {
  dapi.openStoreUrl();
}
