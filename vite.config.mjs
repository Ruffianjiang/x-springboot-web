import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { svgIcons } from './vite/plugins/svg-icons.mjs'
import { mockServer } from './vite/plugins/mock.mjs'

export default defineConfig({
  plugins: [
    vue(),
    svgIcons(),
    mockServer()
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  server: {
    port: 9528,
    open: true
  }
})
