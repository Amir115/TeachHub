import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {global: 'globalThis'}
    }
  },
  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/uploads': {
        target: 'http://localhost:8080'
      },
      '/socket.io': {
        target: 'http://localhost:8080'
      }
    }
  }
})
