import { AppNormal } from "../app-wrapper";

window.addEventListener("DOMContentLoaded", () => {
  const app = new AppNormal(0);
  app.setInstall(install);
  app.start();
});

function install() {
  window.openAppStore();
}
