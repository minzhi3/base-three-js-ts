import { AppMintergal } from "../app-wrapper";

function gameStart() {
  console.log(1);
  return;
}
function gameClose() {
  console.log(2);
  return;
}
function installCall() {
  window.install && window.install();
}
window.gameStart = gameStart;
window.gameClose = gameClose;

const app = new AppMintergal(0);
app.setInstall(installCall);
app.gameEndCall = () => {
  window.gameEnd && window.gameEnd();
};
app.gameReadyCall = () => {
  window.gameReady && window.gameReady();
};
app.gameRetryCall = () => {
  //window.gameRetry && window.gameRetry();
};
window.addEventListener("DOMContentLoaded", () => {
  app.start();
  console.log(window.gameStart);
});
