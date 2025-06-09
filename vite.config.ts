import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
    },
  },
  base: '/',
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['projects-app-frontend.onrender.com']
  }
})
