import App from "./app";

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init().then(() => {
    app.bindWindowEvent(window);
    app.run();
  });
});
