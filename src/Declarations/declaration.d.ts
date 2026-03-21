/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

export {};

declare module "*.scss" {
  interface classes { [key: string]: string }
}


declare global {
  interface Window {
    __APOLLO_STATE__?: Record<string, unknown>;
  }
}
