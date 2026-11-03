import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),

    visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, "/");

          // Only third-party code is grouped. App code is split by lazy routes.
          if (!path.includes("/node_modules/")) return;

          // Needed on every page and changes rarely, so cache it separately
          if (/\/node_modules\/react-router(-dom)?\//.test(path)) {
            return "router";
          }

          // React core, DOM renderer, and scheduler (a React dependency)
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(path)) {
            return "react";
          }
          if (!id.includes("node_modules")) return;

          if (id.includes("node_modules/react-router")) {
            return "router";
          }

          if (id.includes("node_modules/react-icons")) {
            return "icons";
          }

          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/")
          ) {
            return "react";
          }

          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }

          if (id.includes("node_modules/@lottiefiles")) {
            return "lottie";
          }

          return "vendor";
        },
      },
    },
  },
});
