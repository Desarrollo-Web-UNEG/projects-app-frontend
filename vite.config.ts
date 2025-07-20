import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@auth": path.resolve(__dirname, "./src/modules/auth"),
      "@dashboard": path.resolve(__dirname, "./src/modules/dashboard"),
      "@chatbot": path.resolve(__dirname, "./src/modules/chatbot"),
    },
  },
  server: {
    host: true,
    allowedHosts: ["projects-app-frontend.onrender.com"],
    proxy: {
      "/api": {
        target: "https://projects-app-backend-8elg.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
