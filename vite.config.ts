import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif"],
  plugins: [react()],
  build: {
    outDir: "dist", // Diretório de saída
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
