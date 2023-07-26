import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 全局样式
import './styles/index.scss'
// tailwindcss
import './styles/tailwind.css'
// 引入Vant组件样式
import 'vant/lib/index.css'
import { ConfigProvider } from 'vant'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ConfigProvider)

app.mount('#app')
