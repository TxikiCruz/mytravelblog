import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: []
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  server: {
    open: true,
    host: true
  },
})
