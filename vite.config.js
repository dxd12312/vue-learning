import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),WindiCSS()],
  resolve: {
    alias: {
      "~":path.resolve(__dirname,"src")
    }
  },
  base: '/',
  server: {
    // 解决代理问题
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    //解决端口占有问题
    host: '192.168.2.157',
    port: 5173,
    https: false,
    open: true,
    hmr: {
      protocol: 'ws',
      host: '192.168.2.157'
    },
  }
})
