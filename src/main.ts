import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// tailwindcss
import './styles/tailwind.css'
// 引入Vant组件样式
import 'vant/lib/index.css'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
// 全局样式
import './styles/index.scss'

import { ConfigProvider } from 'vant'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ConfigProvider)

declare module 'vue' {
  interface ComponentCustomProperties {
    $proxyUrl: string
  }
}
app.config.globalProperties.$proxyUrl = 'http://localhost:3000'

app.mount('#app')
