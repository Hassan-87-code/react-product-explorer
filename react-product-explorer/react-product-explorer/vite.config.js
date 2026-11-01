import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  cacheDir: './.vite-cache',
  base: process.env.GITHUB_ACTIONS ? '/react-product-explorer/' : '/',
  plugins: [react(), tailwindcss()],
})
