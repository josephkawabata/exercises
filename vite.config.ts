import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project site: https://josephkawabata.github.io/exercises/
export default defineConfig({
  base: "/exercises/",
  plugins: [react()],
});
