<template>
  <div class="login-panel">
    <n-card title="注册">
      <n-form :rules="rules" :model="admin">
        <n-form-item path="account" label="账号">
          <n-input v-model:value="admin.account" placeholder="请输入账号"></n-input>
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="admin.password" placeholder="请输入密码" type="password"></n-input>
        </n-form-item>
        <n-form-item path="password" label="确认密码">
          <n-input v-model:value="admin.password" placeholder="请输入密码" type="password"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-checkbox v-model:checked="admin.rember" label="记住我"></n-checkbox>
        <n-button @click="register">注册</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
// import { AdminStore } from '../stores/AdminStore.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
// const adminStore = AdminStore()

let admin = reactive({
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

// const register = async () => {
//   let result = await axios.post('/admin/login', {
//     account: admin.account,
//     password: admin.password
//   })
//   if (result.data.code == 200) {
//     adminStore.token = result.data.data.token
//     adminStore.account = result.data.data.account
//     adminStore.id = result.data.data.id
//     if (admin.rember) {
//       localStorage.setItem('account', admin.account)
//       localStorage.setItem('password', admin.password)
//       localStorage.setItem('rember', admin.rember ? 1 : 0)
//     }
//     message.info('登陆成功')
//     router.push('/dashboard')
//   } else {
//     message.error('登陆失败')
//   }
//   console.log(result)
// }
</script>

<style lang="scss" scoped></style>
