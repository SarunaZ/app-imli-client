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
    fs: {
      allow: ["/tmp/vite-cache"],
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("/node_modules/")) return;
          // Keep React ecosystem together to avoid cross-chunk cycles.
          if (id.includes("/node_modules/@dnd-kit/") || id.includes("/node_modules/dnd-kit/")) {
            return "vendor-dnd-kit";
          }
          if (id.includes("/node_modules/@tinymce/") || id.includes("/node_modules/tinymce/")) {
            return "vendor-tinymce";
          }
          return "vendor";
        },
      },
    },
  },
});
