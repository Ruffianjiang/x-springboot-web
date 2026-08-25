import { createRequire } from 'node:module'
import path from 'node:path'

// 自研 Vite dev mock 中间件（Stage 3，零新依赖）
// 复用现有 CJS mock 模块（mock/index.js 聚合 mock/table.js、mock/user.js、mock/utils.js）
// 应用 baseURL 为 VITE_BASE_API=/dev-api，故在此拼接 /dev-api 前缀命中请求
export function mockServer() {
  const require = createRequire(import.meta.url)
  const mockIndexPath = path.resolve(process.cwd(), 'mock/index.js')
  let mocks = []
  try {
    const mod = require(mockIndexPath)
    mocks = mod.mocks || []
  } catch (e) {
    console.warn('[mock-server] 无法加载 mock 模块，mock 功能不可用:', e.message)
  }

  const BASE = '/dev-api'

  // 预编译匹配器：区分普通路径与正则 url（如 /vue-admin-template/user/info\.*）
  const matchers = mocks.map((m) => {
    const full = BASE + m.url
    const hasRegex = /[\\^$*+?()|[\]{}]/.test(m.url)
    return {
      method: (m.type || 'get').toUpperCase(),
      regex: hasRegex ? new RegExp('^' + full) : null,
      path: hasRegex ? null : full,
      response: m.response
    }
  })

  return {
    name: 'vite-plugin-mock-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const reqPath = (req.url || '').split('?')[0]
        const method = (req.method || 'GET').toUpperCase()
        const matched = matchers.find((m) => {
          if (m.method !== method) return false
          if (m.regex) return m.regex.test(reqPath)
          return m.path === reqPath
        })
        if (!matched) return next()

        const chunks = []
        req.on('data', (c) => chunks.push(c))
        req.on('end', () => {
          let body = {}
          if (chunks.length) {
            try {
              body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
            } catch (e) {
              // 非 JSON body 忽略
            }
          }
          const query = Object.fromEntries(
            new URLSearchParams((req.url || '').split('?')[1] || '')
          )
          const config = { url: req.url, method, body, query }
          let result
          try {
            result =
              typeof matched.response === 'function'
                ? matched.response(config)
                : matched.response
          } catch (e) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ code: 500, message: e.message }))
            return
          }
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(result))
        })
      })
    }
  }
}
