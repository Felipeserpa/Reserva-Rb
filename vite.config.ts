import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif"],
  plugins: [
    react(),
    visualizer({ open: true }), // Gera análise ao rodar o build
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
