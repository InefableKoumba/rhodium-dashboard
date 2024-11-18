import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const __dirname = path.dirname("./src");

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
