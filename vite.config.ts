import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default" },
      include: "**/*.svg",
    }),
    tsconfigPaths(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(__dirname, "src/Styles/variables.scss").replace(/\\/g, "/")}" as *;\n`,
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
  },
});
