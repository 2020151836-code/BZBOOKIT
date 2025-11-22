import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "client/src"),
      "@shared": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "shared"),
    },
  },
  build: {
    outDir: "../dist/client",
  },
  server: {
    port: 5173, // frontend port
    proxy: {
      // Use the object syntax to be more explicit
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Recommended for virtual-hosted sites
      },
    },
  },
});
