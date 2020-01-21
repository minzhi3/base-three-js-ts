import App from "./app";

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
  app.bindWindowEvent(window);
  app.run();
});
