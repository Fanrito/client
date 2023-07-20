<template>
  <div class="login-panel">
    <n-card title="修改和完善个人信息">
      <n-form :rules="rules" :model="user">
        <n-form-item path="nickname" label="昵称">
          <n-input v-model:value="user.name" placeholder="请输入账号"></n-input>
        </n-form-item>
        <n-form-item path="gender" label="性别">
          <n-input v-model:value="user.gender" placeholder="请输入性别"></n-input>
        </n-form-item>
        <n-form-item path="phone" label="电话">
          <n-input v-model:value="user.phone" placeholder="请输入手机号码"></n-input>
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input v-model:value="user.email" placeholder="请输入电子邮箱"></n-input>
        </n-form-item>
        <n-form-item path="campus" label="校区">
          <n-input v-model:value="user.campus" placeholder="请输入校区（翔安/思明/海韵/漳州）"></n-input>
        </n-form-item>
        <n-form-item path="profile" label="个人简介">
          <n-input v-model:value="user.profile" type="textarea" placeholder="请输入密码"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button @click="input">提交</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

const rules = {
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur'
    }
  ],
  gender: [
    {
      required: true,
      message: '请输入性别',
      trigger: 'blur'
    },
    {
      validator: (rule, value) => {
        if (value !== '男' && value !== '女') {
          return new Error('性别只能填写男或女')
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      pattern: /^[1-9]\d{10}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入电子邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '电子邮箱格式不正确',
      trigger: 'blur'
    }
  ],
  campus: [
    {
      required: true,
      message: '请输入校区（翔安/思明/海韵/漳州）',
      trigger: 'blur'
    }
  ],
  profile: [
    {
      required: true,
      message: '请输入个人简介',
      trigger: 'blur',
      max: 200
    }
  ]
}

const user = reactive({
  id: 1,
  username: '111111',
  name: '范·奇森',
  gender: '男',
  phone: '13811012138',
  email: 'fzz@250.com',
  profile: '我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱',
  campus: '翔安'
})
onMounted(() => {
  // loadUser()
})

const loadUser = async () => {
  let res = await axios.get('/user')
  console.log(res)
  user.value = rows[0]
}

const input = () => {
  const param = {
    id: user.id,
    username: user.username,
    name: user.name,
    gender: user.gender == '男' ? 1 : 0,
    phone: user.phone,
    email: user.email,
    profile: user.profile,
    campus: user.campus
  }

  axios
    .patch('/user/update', param)
    .then(response => {
      console.log('User information updated successfully:', response.data)
      if (response.code == 1) {
        message.info('提交成功')
      } else if (response.code == 0) {
        message.info('提交失败')
      }
    })
    .catch(error => {
      console.error('Error updating user information:', error)
      message.error('网络异常')
    })
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 600px;
  margin: 50px auto;
}
</style>
