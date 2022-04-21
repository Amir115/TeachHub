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
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api'
      },
      '/socket.io': {
        target: 'ws://localhost:8080/socket.io',
        ws: true
      }
    }
  }
})
