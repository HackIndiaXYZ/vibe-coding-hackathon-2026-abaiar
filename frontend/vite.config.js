import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/login': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
      '/register': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
      '/practice-api': {
        target: 'http://127.0.0.1:5011',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/practice-api/, '')
      },
      '/agent-api': {
        target: 'http://127.0.0.1:5011',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent-api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts']
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['echarts']
  }
})
