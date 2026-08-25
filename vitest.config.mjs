import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { svgIcons } from './vite/plugins/svg-icons.mjs'

// 测试框架（Stage 3：jest → vitest）
// 测试环境由 jsdom 切换为 happy-dom：
// jsdom@30 依赖 undici@8，undici@8 在 Node 20.x CI 上导入即抛
// "webidl.util.markAsUncloneable is not a function"，导致 vitest worker 启动即崩溃、0 用例执行。
// happy-dom 不依赖 undici，规避该兼容性问题，对现有用例所需的 DOM API 完全覆盖。
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
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.spec.{js,ts}']
  }
})
