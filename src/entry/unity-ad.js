import { AppUnityAd } from "../app-wrapper";

function install() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid)
    mraid.open(
      "https://play.google.com/store/apps/details?id=com.charge.them.all"
    );
  else mraid.open("https://apps.apple.com/app/id1505770212");
}

window.onload = function () {
  const app = new AppUnityAd(0);
  app.setInstall(install);
  if (mraid.getState() === "loading") {
    mraid.addEventListener("ready", app.onReadyCallback);
  } else {
    app.onReadyCallback();
  }
};
