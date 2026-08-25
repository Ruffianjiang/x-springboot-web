import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { svgIcons } from './vite/plugins/svg-icons.mjs'

// 测试框架（Stage 3：jest → vitest）
export default defineConfig({
  plugins: [
    vue(),
    svgIcons()
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.spec.{js,ts}']
  }
})
