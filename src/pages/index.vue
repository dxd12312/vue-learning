<template>
    <div>
        后台首页 
        {{ $store.state.user.username }}

        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>

<script setup>
import {logout} from "~/api/manager"
import { showModel, toast } from '~/composables/util'
import { removeToken } from '~/composables/auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

function handleLogout() {
    showModel("是否退出登录？").then(res=> {
        logout().finally(() => {
            //清除当前用户的状态 vuex
            store.dispatch("logout")
            //跳转登录页
            router.push("/login")
            //提示退出登录成功
            toast("退出登录成功")
        })
    })
}
</script>