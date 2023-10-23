import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
//引入页面
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
//路由数组
const routes = [{
    path: "/",
    component: Index,
    meta:{
        title: "后台首页"
    }
},{
   path: "/login",
   component: Login,
   meta:{
    title: "登录页"
   }
},{
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound
}]
//创建路由器对象
const router = createRouter({
    routes,
    history: createWebHashHistory()
})
//导出路由器对象
export default router