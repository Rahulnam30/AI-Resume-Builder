import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prevent duplicate React copies which cause invalid hook call errors
    dedupe: ['react', 'react-dom']
  }
});
