declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const value: string;
  export default value;
}

declare module "*.glb" {
  const value: string;
  export default value;
}

declare module "*.glsl" {
  const value: string;
  export default value;
}
declare namespace FbPlayableAd {
  function onCTAClick(): void;
}
declare namespace ExitApi {
  function exit(): void;
}
declare namespace dapi {
  function openStoreUrl(): void;
  function isReady(): boolean;
  function isViewable(): boolean;
  function getScreenSize(): { width: number; height: number };
  function getAudioVolume(): number;
  function addEventListener(
    eventName: string,
    callback: (arg0: unknown) => void
  ): void;
  function removeEventListener(
    eventName: string,
    callback: (event: DapiEvent) => void
  ): void;
  interface DapiEvent {
    isViewable: boolean;
  }
}
declare namespace mraid {
  function open(url: string): void;
}
