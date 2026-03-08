/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
