import { mount } from '@vue/test-utils'
import { h } from 'vue'
import ElementPlus from 'element-plus'
import { createRouter, createMemoryHistory } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

// 占位组件：vue-router 4 要求每个路由记录必须有 component
const Dummy = { render: () => h('div') }

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { title: 'Dashboard' },
    component: Dummy
  },
  {
    path: '/menu',
    name: 'menu',
    component: Dummy,
    children: [{
      path: 'menu1',
      name: 'menu1',
      meta: { title: 'menu1' },
      component: Dummy,
      children: [{
        path: 'menu1-2',
        name: 'menu1-2',
        redirect: 'noredirect',
        meta: { title: 'menu1-2' },
        component: Dummy,
        children: [{
          path: 'menu1-2-1',
          name: 'menu1-2-1',
          meta: { title: 'menu1-2-1' },
          component: Dummy
        },
        {
          path: 'menu1-2-2',
          name: 'menu1-2-2',
          component: Dummy
        }]
      }]
    }]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

function createWrapper() {
  return mount(Breadcrumb, {
    global: {
      plugins: [router, ElementPlus]
    }
  })
}

describe('Breadcrumb.vue', () => {
  it('dashboard', async () => {
    await router.push('/dashboard')
    const wrapper = createWrapper()
    expect(wrapper.findAll('.el-breadcrumb__inner').length).toBe(1)
  })
  it('normal route', async () => {
    await router.push('/menu/menu1')
    const wrapper = createWrapper()
    expect(wrapper.findAll('.el-breadcrumb__inner').length).toBe(2)
  })
  it('nested route', async () => {
    await router.push('/menu/menu1/menu1-2/menu1-2-1')
    const wrapper = createWrapper()
    expect(wrapper.findAll('.el-breadcrumb__inner').length).toBe(4)
  })
  it('no meta.title', async () => {
    await router.push('/menu/menu1/menu1-2/menu1-2-2')
    const wrapper = createWrapper()
    expect(wrapper.findAll('.el-breadcrumb__inner').length).toBe(3)
  })
  it('last breadcrumb', async () => {
    await router.push('/menu/menu1/menu1-2/menu1-2-1')
    const wrapper = createWrapper()
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
    const redirectBreadcrumb = breadcrumbArray.at(3)
    expect(redirectBreadcrumb.find('a').exists()).toBe(false)
  })
})
