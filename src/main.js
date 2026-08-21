import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import en from 'element-plus/es/locale/lang/en' // lang i18n

import 'virtual:svg-icons-register' // svg icons (vite-plugin-svg-icons)

import SvgIcon from '@/components/SvgIcon' // svg component

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import '@/permission' // permission control

const app = createApp(App)

// register svg-icon globally
app.component('svg-icon', SvgIcon)

app.use(store)
app.use(router)
app.use(ElementPlus, { locale: en })

app.mount('#app')
