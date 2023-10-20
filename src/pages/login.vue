<template>
    <div>
        <el-row class="login-container">
            <el-col :lg="16" :md="12" class="left">
                <div>
                    <div class="h1Font">欢迎光临</div>
                    <div class="text-gray-200 text-sm">此站点是《vue3 + vite实战商城后台开发》视频课程演示地址</div>
                </div>

            </el-col>
            <el-col :lg="8" :md="12" class="right">
                <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
                <div class="login-right">
                    <span class="line"></span>
                    <span>账号密码登录</span>
                    <span class="line"></span>
                </div>
                <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon>
                                    <user />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                            <template #prefix>
                                <el-icon>
                                    <lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { login, getinfo } from '~/api/manager.js'
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { setToken } from '~/composables/auth';

const store = useStore()
const router = useRouter()

// do not use same name with ref
//创建实例form包含username，password
const form = reactive({
    username: "",
    password: ""
})

//创建输入框规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        },
    ]
}

//一定要定义
const formRef = ref(null)
const loading = ref(false)
//登录
const onSubmit = () => {
    //监听是否满足输入框规则
    formRef.value.validate((valid) => {
        //不满足
        if (!valid) {
            return false
        }
        loading.value = true
        //满足
        //登录接口
        login(form.username, form.password)
            .then(res => {
                console.log(res);
                //提示成功
                toast("登录成功")
                //存储token
                setToken(res.token)
                //获取用户信息
                getinfo().then(res2=> {
                    store.commit("SET_USERINFO",res2)
                    console.log(res2);
                })
                //跳转后台首页
                router.push("/")

            })
    })
    .finally(()=> {
        loading.value = false
    })
}
</script>
<style>
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-50 flex-col;
}

.h1Font {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.login-right {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>