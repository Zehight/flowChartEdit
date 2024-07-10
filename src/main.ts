import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'reset-css/reset.css'
import router from '@/modules/router'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
/* import VConsole from 'vconsole'
const vconsole = new VConsole() */

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
