<template>
  <div class="login-panel">
    <n-card title="注册">
      <n-form :rules="rules" :model="user">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="user.username" placeholder="给自己取个好记的用户名吧"></n-input>
        </n-form-item>
        <n-form-item path="phone" label="手机号">
          <n-input v-model:value="user.phone" placeholder="请输入手机号"></n-input>
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input v-model:value="user.email" placeholder="请输入邮箱"></n-input>
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="user.password" placeholder="请输入密码" type="password"></n-input>
        </n-form-item>
        <n-form-item path="reenteredPassword" label="确认密码">
          <n-input v-model:value="user.reenteredPassword" placeholder="请再次输入密码" type="password" :disabled="!user.password"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-checkbox v-model:checked="user.rember" label="记住我"></n-checkbox>
        <n-button @click="register">注册</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

let user = reactive({
  username: '',
  password: '',
  phone: '',
  email: '',
  reenteredPassword: '',
  rember: true
})

function validatePasswordStartWith(rule, value) {
  return !!user.password && user.password.startsWith(value) && user.password.length >= value.length
}
function validatePasswordSame(rule, value) {
  return value === user.password
}

let rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 12, message: '账号长度在3到12个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 18, message: '账号长度在5到18个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^[1-9]\d{10}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}

// 登录请求，需要根据后端修改
const register = async () => {
  console.log({
    username: user.username,
    password: user.password
  })
  loadingBar.start()
  let result = await axios.post('/signup', {
    username: user.username,
    password: user.password,
    email: user.email,
    phone: user.phone
  })
  console.log(result)
  if (result.data.code == 1) {
    loadingBar.finish()
    message.success('注册成功')
    userStore.token = result.data.data
    router.push('/user')
  } else {
    loadingBar.error()
    if (result.data.msg == '插入的信息已存在') {
      message.error('用户已存在')
      return
    }
    message.error('注册失败')
  }
}
</script>

<style lang="scss" scoped></style>
