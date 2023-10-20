import { createApp } from 'vue'
//导入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
//导入路由器
import router from './router'
//导入ElementPlusicon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//导入store
import store from './store'

const app = createApp(App)
//注册插件icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//注册store
app.use(store)
//注册插件ElementPlus
app.use(ElementPlus)
//注册插件router
app.use(router)
//导入windicss
import 'virtual:windi.css'
//挂载容器
app.mount('#app')

