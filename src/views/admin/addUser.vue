<template>
  <!-- <h1 class="title" style="color: rgb(31, 150, 104);">新增用户</h1> -->
  <!-- <div class="container_block"> -->
  <!-- <n-space vertical hoverable class="bolck"> -->

  <n-card style="width: 700px; margin: auto; margin-top: 70px">
    <n-tabs class="card-tabs" default-value="signin" size="large" animated pane-wrapper-style="margin: 0 -4px" pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
      <n-tab-pane name="signin" tab="增加新用户">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input v-model:value="name" type="text" placeholder="请输入用户名" @input="checkUsername" />
          </n-form-item-row>
          <p v-if="userNameMatch === 0" style="margin-top: 1px; color: red; display: block">用户名长度不能超过16个字符</p>
          <n-form-item-row label="用户昵称">
            <n-input v-model:value="nick_name" type="text" placeholder="请输入用户昵称" />
          </n-form-item-row>
          <n-form-item-row label="用户邮箱">
            <n-input v-model:value="email" type="text" placeholder="请输入用户绑定邮箱" @input="checkEmail" />
          </n-form-item-row>
          <p v-if="userEmailMatch === 0" style="margin-top: 1px; color: red">邮箱格式错误</p>
          <n-form-item-row label="用户手机号">
            <n-input v-model:value="phone" type="text" placeholder="请输入用户绑定手机号" @input="checkPhoneNumber" />
          </n-form-item-row>
          <p v-if="userPhoneMatch === 0" style="margin-top: 1px; color: red">手机号必须为11位数字</p>

          <n-form-item-row label="用户校区">
            <n-select v-model:value="campus" :options="options" placeholder="请选择用户校区" />
          </n-form-item-row>
          <n-form-item-row label="用户密码">
            <n-input type="password" v-model:value="passwd" show-password-on="click" placeholder="密码" :maxlength="16" @keydown.enter.prevent @input="checkPasswd" />
          </n-form-item-row>
          <n-form-item-row label="确认密码">
            <n-input type="password" v-model:value="passwd2" show-password-on="click" placeholder="确认密码" :maxlength="16" @input="checkPasswd" />
          </n-form-item-row>
          <p v-if="passwordsMatch === 3" style="color: red;margin-bottom: 0;margin-top=0;">密码不为空</p>
          <p v-if="passwordsMatch === 0" style="color: red;margin-bottom: 0;margin-top=0px;">密码不匹配</p>
        </n-form>
        <n-form-item>
          <n-button @click="confirm" style="width: 200px; margin-left: 50px; margin-top: -10px" type="primary" block secondary strong> 确认 </n-button>
          <br />
          <n-button @click="reset_user" style="width: 200px; margin-left: 150px; margin-top: -10px" type="primary" block secondary strong> 重置 </n-button>
        </n-form-item>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { defineComponent, ref, inject } from 'vue'
import { NSpace, NInput, NButton } from 'naive-ui'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
export default defineComponent({
  setup() {
    const axios = inject('axios')
    const value = ref(null)
    const message = useMessage()
    const options = [
      {
        label: '翔安',
        value: '翔安'
      },
      {
        label: '思明',
        value: '思明'
      },
      {
        label: '漳州',
        value: '漳州'
      },
      {
        label: '马来西亚',
        value: '马来西亚'
      }
    ]
    var showError = ref(false)
    var passwordsMatch = ref(2)
    var userNameMatch = ref(1)
    var userPhoneMatch = ref(1)
    var userEmailMatch = ref(1)
    var campusMatch = ref(1)
    var userPhoto = ref()
    const router = useRouter()
    const name = ref('')
    const phone = ref('')
    const email = ref('')
    const passwd = ref('')
    const passwd2 = ref('')
    const campus = ref('')
    const showOverlay = ref(false)
    const nick_name = ref('')
    function checkCampus() {
      if (campus.value != '翔安' && campus.value != '思明' && campus.value != '漳州' && campus.value != '马来西亚') {
        checkCampus = 0
      }
    }
    const confirm = async () => {
      // loadingBar.start()

      console.log(name.value)
      //保存用户信息的逻辑
      if (passwd.value === passwd2.value && passwd.value != '') {
        passwordsMatch.value = 1
        console.log(passwd.value)
        console.log(name.value)
        console.log(phone.value)
        console.log(campus.value)
        console.log(nick_name.value)
        const response = await axios.post('/admin/add', {
          userName: name.value,
          userGender: 1,
          userPhoneNum: phone.value,
          userEmail: email.value,
          userStatus: 1,
          userPasswd: passwd.value,
          userCampus: campus.value,
          userNickname: nick_name.value
        }) 
        console.log(response)
        if(response.data.code===0)
        {
          message.error(response.data.msg)
        }
       else{
        router.push('/admin/user')
       }
        //loadingBar.finish()
        
      } else if (passwd.value == '') {
        passwordsMatch.value = 3
      } else {
        passwordsMatch.value = 0
        showError.value = true
      }
    }
    function reset_user() {
      name.value = ''
      pickname.value = ''
      phone.value = ''
      email.value = ''
      passwd.value = ''
      passwd2.value = ''
      passwordsMatch.value = 2
      userNameMatch.value = 1
      userEmailMatch.value = 1
      userPhoneMatch.value = 1
    }
    function checkUsername() {
      if (name.value != null && name.value.length > 16) {
        console.log('用户名错误')
        userNameMatch.value = 0
      } else {
        userNameMatch.value = 1
      }
    }
    function checkPhoneNumber() {
      // 电话号码的正则表达式
      const sanitizedPhoneNumber = phone.value.replace(/\s/g, '').replace(/-/g, '')
      if (phone.value === '') {
        userPhoneMatch.value = 1
        return true
      }
      // 检查是否为11位数字
      if (/^\d{11}$/.test(sanitizedPhoneNumber) && phone.value.length > 0) {
        // 格式正确
        userPhoneMatch.value = 1
        console.log('手机号格式正确')
        return true
      } else {
        // 格式错误
        userPhoneMatch.value = 0
        console.log('手机号格式错误')
        return false
      }
    }
    function checkEmail() {
      if (email.value === '') {
        userEmailMatch.value = 1
        return true
      }
      // 邮箱的正则表达式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // 使用正则表达式验证邮箱格式
      if (emailRegex.test(email.value)) {
        // 格式正确
        userEmailMatch.value = 1
        console.log('邮箱格式正确')
        return true
      } else {
        userEmailMatch.value = 0
        // 格式错误
        console.log('邮箱格式错误')
        return false
      }
    }
    function checkPasswd() {
      if (passwd.value === passwd2.value) {
        passwordsMatch.value = 1
      } else {
        passwordsMatch.value = 0
      }
    }
    return {
      name,
      showError,
      showOverlay,
      userPhoto,
      nick_name,
      phone,
      email,
      passwd,
      passwd2,
      campus,
      confirm,
      passwordsMatch,
      userNameMatch,
      userEmailMatch,
      userPhoneMatch,
      campusMatch,
      showError,
      value,
      options,
      reset_user,
      checkUsername,
      checkEmail,
      checkPhoneNumber,
      checkPasswd,
      checkCampus
    }
  }
})
</script>

<style>
.bolck {
  width: 50%;
  height: 50%;
  text-align: left;
  vertical-align: middle;
  margin: auto;
  margin-top: 0;
}
.container_block {
  display: flex;
  width: 40%;
  margin: auto;
  margin-top: 1%;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #a0cfb0; */
  border-radius: 0%;
  background-color: white;
  /* border-width: 2px; */
  padding: 16px;
}
.title {
  text-align: center;
  margin-top: 4%;
  margin-bottom: 1px;
}
.space {
  margin-left: 45px; /* 设置和页边距的距离 */
}
</style>
