<template>
  <div class="login-panel">
      <n-card title="登录">
        <n-form :rules="rules" :model="user">
          <n-form-item path="account" label="用户名">
            <n-input v-model:value="user.account" placeholder="请输入账号"></n-input>
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input v-model:value="user.password" placeholder="请输入密码" type="password"></n-input>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-checkbox v-model:checked="user.rember" label="记住我"></n-checkbox>
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

let user = reactive({
  account: localStorage.getItem('account') || '',
  password: localStorage.getItem('password') || '',
  rember: localStorage.getItem('rember') == 1 || false
})
let rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 12, message: '账号长度在3到12个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 18, message: '账号长度在5到18个字符', trigger: 'blur' }
  ]
}

// 登录请求，需要根据后端修改
const login = async () => {
  let result = await axios.post('/user/login', {
    account: user.account,
    password: user.password
  })
  console.log(result);
  if (result.data.code == 1) {
    userStore.token = result.data.data.token
    userStore.account = result.data.data.account
    userStore.id = result.data.data.id
    if (user.rember) {
      localStorage.setItem('account', user.account)
      localStorage.setItem('password', user.password)
      localStorage.setItem('rember', user.rember ? 1 : 0)
    }
    message.info('登陆成功')
    router.push('/user')
  } else {
    message.error('登陆失败')
  }
}
</script>

<style lang="scss" scoped></style>
