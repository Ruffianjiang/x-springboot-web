import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'

// 模块化 svg-icons 插件（Stage 3：从 vite.config.js 内联抽离）
export function svgIcons() {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
    symbolId: 'icon-[name]'
  })
}
