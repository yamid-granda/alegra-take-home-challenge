import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    silent: true,
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../ui/src'),
      '@api': path.resolve(__dirname, './'),
    },
  },
})
