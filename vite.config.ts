import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  base: '/anji.github.io/',
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
