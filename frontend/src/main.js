import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化应用时检查用户登录状态
const userStore = useUserStore()
userStore.checkAuth()

const savedTheme = (() => { try { return localStorage.getItem('theme') } catch (e) { return null } })()
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'Dark')
  document.documentElement.classList.add('Dark')
} else if (savedTheme === 'light') {
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('Dark')
}

app.mount('#app')
