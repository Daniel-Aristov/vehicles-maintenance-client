import App from '@/App.vue'
import '@/assets/index.scss'
import { clickOutside } from '@/directives/clickOutside'
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
app.directive('click-outside', clickOutside)
app.mount('#app')
