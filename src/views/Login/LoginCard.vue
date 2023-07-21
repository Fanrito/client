<template>
  <div class="login-panel">
    <n-card title="登录">
      <n-form :rules="rules" :model="user">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="user.username" placeholder="请输入账号"></n-input>
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="user.password" placeholder="请输入密码" type="password"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-checkbox v-model:checked="rember" label="记住我"></n-checkbox>
        <n-button @click="login">登录</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

const rember = ref(false)

let user = reactive({
  username: userStore.username || '',
  password: rember ? userStore.password : ''
})
let rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 12, message: '账号长度在3到12个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 18, message: '账号长度在5到18个字符', trigger: 'blur' }
  ]
}
// <<<<<<< HEAD
// const login = () => {

//   if(user.account==='admin')
//   router.push("/admin/user")
//   else
//   router.push("/user")
// }
// =======
// >>>>>>> upstream/main

// 登录请求，需要根据后端修改
const login = async () => {
  let result = await axios.post('/login', {
    username: user.username,
    password: user.password
  })
  console.log(result)
  if (result.data.code == 1) {
    userStore.token = result.data.data
    message.info('登陆成功')
    router.push('/user')
  } else {
    message.error('登陆失败')
  }
}
</script>

<style lang="scss" scoped></style>
