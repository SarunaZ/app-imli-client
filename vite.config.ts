import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  cacheDir: "/tmp/vite-cache",
  ssr: {
    noExternal: ['react-helmet-async', '@apollo/client'],
  },
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
    host: true,          // 0.0.0.0
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost", // what browser uses
      port: 3000,
      clientPort: 3000
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: "dist",
  },
});
