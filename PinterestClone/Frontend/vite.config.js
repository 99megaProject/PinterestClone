import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // devServer: {
  //   allowedHosts: 'all',
  // },
  server: {
    proxy: {
      '/api': {
        target: 'https://purple-accountant-lmzqi.pwskills.app:3000',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
});
