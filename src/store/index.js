import { createStore } from 'vuex'
import { login, getinfo } from '~/api/manager.js'
import { setToken, removeToken } from '~/composables/auth';
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router';

const router = useRouter()


// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user
    }
  },
  actions: {
    // 登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          setToken(res.token)
          resolve(res)
        }).catch(error => reject(error))
      })
    },
      // 获取当前登录用户信息
      getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo().then(res => {
          commit("SET_USERINFO", res)
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    //退出登录
    logout({ commit }) {
        //移除cookie里面的token
        removeToken()
        //清除当前用户的状态 vuex
        commit("SET_USERINFO",{})
    }
  }
})

export default store