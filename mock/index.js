const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')

const mocks = [
  ...user,
  ...table
]

// 注：浏览器侧 XHR mock（mockXHR）已移除。
// 本 Stage 3 改用 Vite dev 中间件（vite/plugins/mock.js）在服务端拦截 /dev-api 请求，
// 由 mock/index.js 仅导出 mocks 聚合，无需在浏览器内重定义 XMLHttpRequest。
module.exports = {
  mocks
}

