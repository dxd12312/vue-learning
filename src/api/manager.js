//引入axios
import axios from "~/axios";
//导出登录方法
export function login(username, password) {
   return axios.post("/admin/login",{
        username,
        password
    })
}

export function getinfo() {
   return axios.post("/admin/getinfo")
}

export function logout() {
   return axios.post("/admin/logout")
}