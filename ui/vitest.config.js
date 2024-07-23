import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.js',
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, '../api'),
    },
  },
})
