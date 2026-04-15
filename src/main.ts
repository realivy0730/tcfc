import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import scrollReveal from '@/directives/scrollReveal'

// 全域樣式
import '@/assets/styles/main.scss'

// 建立應用程式實例
const app = createApp(App)

// 使用 Pinia 狀態管理
const pinia = createPinia()
app.use(pinia)

// 使用路由
app.use(router)

// 全域 directive
app.directive('scroll-reveal', scrollReveal)

// 掛載應用程式
app.mount('#app')
