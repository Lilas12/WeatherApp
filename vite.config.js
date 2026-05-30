import { defineConfig } from "vite";
import react from "@vitejs/js-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/WeatherApp/", // <-- Lägg till exakt denna rad!
});
