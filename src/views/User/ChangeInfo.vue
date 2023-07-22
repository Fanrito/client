<template>
  <div class="login-panel">
    <n-card title="修改和完善个人信息">
      <n-form ref="formRef" :rules="rules" :model="user">
        <n-form-item path="userNickname" label="昵称">
          <n-input v-model:value="user.userNickname" placeholder="请输入昵称" :allow-input="noSideSpace"></n-input>
        </n-form-item>
        <n-form-item path="userGender" label="性别">
          <n-select :style="{ width: '100%' }" v-model:value="user.userGender" :options="selectGender" placeholder="请选择性别" />
        </n-form-item>
        <n-form-item path="userPhoneNum" label="电话">
          <n-input v-model:value="user.userPhoneNum" placeholder="请输入手机号码" :allow-input="noSideSpace"></n-input>
        </n-form-item>
        <n-form-item path="userEmail" label="邮箱">
          <n-input v-model:value="user.userEmail" placeholder="请输入电子邮箱" :allow-input="noSideSpace"></n-input>
        </n-form-item>
        <n-form-item path="userCampus" label="校区">
          <n-select :style="{ width: '100%' }" v-model:value="user.userCampus" :options="selectCampus" placeholder="请选择校区" />
        </n-form-item>
        <n-form-item path="userProfile" label="个人简介">
          <n-input v-model:value="user.userProfile" type="textarea" placeholder="请输入个人简介" :allow-input="noSideSpace"></n-input>
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

const formRef = ref(null)

let user = reactive({
  userCampus: '',
  userEmail: '',
  userGender: null,
  userId: null,
  userName: '',
  userNickname: '',
  userPasswd: '',
  userPhoneNum: '',
  userPhoto: '',
  userProfile: '',
  userStatus: ''
})

// 开头和结尾不允许有空格
const noSideSpace = value => !value.startsWith(' ') && !value.endsWith(' ')

let rules = {
  userNickname: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '昵称不超过20字符',
      trigger: 'blur'
    }
  ],
  userGender: [
    {
      required: true,
      message: '请输入性别',
      type: 'number',
      trigger: 'blur'
    }
  ],
  userPhoneNum: [
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
  userEmail: [
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
  userCampus: [
    {
      required: true,
      message: '请输入校区（翔安/思明/海韵/漳州）',
      trigger: 'blur'
    }
  ],
  userProfile: [
    {
      required: true,
      message: '请输入个人简介',
      trigger: 'blur'
    },
    {
      max: 200,
      message: '简介不超过200字',
      trigger: 'blur'
    }
  ]
}

const selectCampus = ref([
  {
    label: '翔安',
    value: '翔安'
  },
  {
    label: '思明',
    value: '思明'
  },
  {
    label: '海韵',
    value: '海韵'
  },
  {
    label: '漳州',
    value: '漳州'
  }
])

const selectGender = ref([
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
])

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  let res = await axios.get('/user')
  console.log(res)
  Object.assign(user, res.data.data)
}

const input = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
      return
    }
  })

  const param = {
    userGender: user.userGender,
    userPhoneNum: user.userPhoneNum,
    userEmail: user.userEmail,
    userStatus: user.userName == 'admin' ? 0 : 1,
    userCampus: user.userCampus,
    userNickname: user.userNickname,
    userProfile: user.userProfile,
    userId: user.userId
  }

  axios
    .patch('/user/update', param)
    .then(response => {
      console.log('User information updated successfully:', response.data)
      if (response.data.code == 1) {
        message.info('提交成功')
        Object.assign(user, response.data.data)
        router.push('/user')
      } else if (response.data.code == 0) {
        message.info('提交失败， 请先登录')
        router.push('/login')
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
