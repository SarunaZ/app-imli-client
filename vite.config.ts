import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    // Keep a single React instance across the app, Apollo, and react-dom.
    dedupe: ["react", "react-dom"],
  },
  cacheDir: "/tmp/vite-cache",
  ssr: {
    // Bundle React-context libraries so they share the app's single React
    // instance. If left external they load their own React copy, producing
    // a null dispatcher ("Cannot read properties of null (reading 'useContext')").
    noExternal: [
      "react-helmet-async",
      "@apollo/client",
      "react-router",
      "react-router-dom",
    ],
  },
  plugins: [
    tailwindcss(),
    react(),
    svgr({
      svgrOptions: { exportType: "default" },
      include: "**/*.svg",
    }),
    tsconfigPaths(),
  ],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost", // what browser uses
      port: 3000,
      clientPort: 3000,
    },
    fs: {
      allow: [".", "/tmp/vite-cache"],
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
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
