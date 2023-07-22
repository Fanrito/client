<template>
  <div class="login-panel">
    <n-card title="登录">
      <n-tabs type="line" animated>
        <n-tab-pane name="密码登录" tab="密码登录">
          <n-form :rules="rules" :model="user">
            <n-form-item path="username" label="用户名">
              <n-input v-model:value="user.username" placeholder="请输入账号"></n-input>
            </n-form-item>
            <n-form-item path="password" label="密码">
              <n-input v-model:value="user.password" placeholder="请输入密码" type="password"></n-input>
            </n-form-item>
          </n-form>
          <n-checkbox v-model:checked="rember" label="记住我"></n-checkbox>
          <n-button @click="login1">登录</n-button>
        </n-tab-pane>
        <n-tab-pane name="手机号登录" tab="手机号登录">
          <n-form :rules="rules" :model="user">
            <n-form-item path="phone" label="手机号">
              <n-input v-model:value="phone" placeholder="请输入手机号"></n-input>
              <n-button @click="sendPhoneVeriCode" :disabled="isButtonDisabled">发送验证码{{ remainingTime == 60 ? '' : '(' + remainingTime + ')' }}</n-button>
            </n-form-item>
            <n-form-item path="veriCode" label="验证码">
              <n-input v-model:value="veriCode" placeholder="请输入验证码"></n-input>
            </n-form-item>
          </n-form>
          <n-button @click="login2">登录</n-button>
        </n-tab-pane>
        <n-tab-pane name="邮箱登录" tab="邮箱登录">
          <n-form :rules="rules" :model="user">
            <n-form-item path="email" label="邮箱">
              <n-input v-model:value="email" placeholder="请输入账号"></n-input>
              <n-button @click="sendEmailVeriCode" :disabled="isButtonDisabled">发送验证码{{ remainingTime == 60 ? '' : '(' + remainingTime + ')' }}</n-button>
            </n-form-item>
            <n-form-item path="veriCode" label="验证码">
              <n-input v-model:value="veriCode" placeholder="请输入验证码"></n-input>
            </n-form-item>
          </n-form>
          <n-button @click="login3">登录</n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

let rember = ref(false)
let user = reactive({
  username: userStore.username || '',
  password: rember ? userStore.password : ''
})
let veriCode = ref('')
let phone = ref('')
let email = ref('')

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
  veriCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

// 密码登录
const login1 = async () => {
  if (user.username === 'admin') {
    router.push('/admin/user')
    return
  }
  let result = await axios.post('/login', {
    loginWay: 1,
    username: user.username,
    password: user.password,
    email: null,
    phoneNum: null
  })
  console.log(result)
  if (result.data.code == 1) {
    userStore.token = result.data.data
    if (rember) {
      userStore.username = user.username
      userStore.password = user.password
    }
    message.info('登陆成功')
    router.push('/user')
  } else {
    message.error('登陆失败')
  }
}

// 手机号登录
const login2 = async () => {
  let result = await axios.post('/login', {
    loginWay: 2,
    username: null,
    password: null,
    email,
    phoneNum: phone
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

// 验证码发送按钮禁用与允许相关
const isButtonDisabled = ref(false)
const remainingTime = ref(60)
const sendPhoneVeriCode = () => {
  if (!isButtonDisabled.value) {
    isButtonDisabled.value = true
    countdown()
  }
}
const countdown = () => {
  const timer = setInterval(() => {
    remainingTime.value--
    if (remainingTime.value <= 0) {
      clearInterval(timer)
      isButtonDisabled.value = false
      remainingTime.value = 60
    }
  }, 1000)
}
</script>

<style lang="scss" scoped></style>
