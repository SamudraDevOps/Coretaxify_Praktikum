import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),

      "@shared": path.resolve(__dirname, "./src/components/PraktikumPage/Badan/SPT/shared"),

      "@utils": path.resolve(__dirname, "./src/components/PraktikumPage/Badan/SPT/utils"),

      "@sections": path.resolve(
        __dirname,
        "./src/components/PraktikumPage/Badan/SPT/Spt_Pribadi/Lampiran/sections"
      ),

      "@lampiran": path.resolve(
        __dirname,
        "./src/components/PraktikumPage/Badan/SPT/Spt_Pribadi/Lampiran/components"
      ),
    },
  },

  server: {
    allowedHosts: [".ngrok-free.app", ".loca.lt"],
  },
  build: {
    sourcemap: false,
  },
});
