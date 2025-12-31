import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Prevent duplicate React copies which cause invalid hook call errors
    dedupe: ['react', 'react-dom']
  }
});
