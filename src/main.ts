import App from '@/App.vue'
import '@/assets/index.scss'
import { getUserTokens } from '@/js/helpers/auth.helper'
import '@/js/interceptors/axios.interceptor'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

getUserTokens()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
