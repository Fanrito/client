import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://1d3c-112-48-20-228.ngrok-free.app',
  //       changeOrigin: true,
  //       rewrite: path => path.replace('^/api', '')
  //     }
  //   }
  // }
})
