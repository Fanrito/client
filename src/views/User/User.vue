<!-- 用户信息页 -->
<template>
  <div class="w">
    <TopNav style="margin-top: 50px"></TopNav>
    <div class="user-banner">
      <div class="m-user">
        <div class="avator" @mouseover=";(showOverlay = true), setOverlayOpacity(true)" @mouseleave=";(showOverlay = false), setOverlayOpacity(false)">
          <img :src="user.userPhoto" alt="" />
          <n-upload :default-upload="false" @change="handleFinish" accept="image/png, image/jpeg">
            <div class="overlay" v-if="showOverlay">上传头像</div>
          </n-upload>
        </div>
        <div class="usernickname">
          <span>{{ user.userNickname }}</span>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px">
          <n-button @click="publish" style="display: inline-block; color: #f1f3ef">发布商品</n-button>
        </div>
      </div>
      <div class="mt">
        <div class="mh">我的信息</div>
        <div class="mb">
          <span>用户名: {{ user.userName }}</span>
          <span>性别: {{ user.userGender == 1 ? '男' : '女' }}</span>
          <span>电话: {{ user.userPhoneNum }}</span>
          <span>邮箱: {{ user.userEmail }}</span>
          <span>校区: {{ user.userCampus }}</span>
        </div>
        <div class="profile">个人简介: {{ user.userProfile }}</div>
      </div>
    </div>
    <OtherInfo></OtherInfo>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs, inject } from 'vue'
import TopNav from './TopNav.vue'
import OtherInfo from './OtherInfo.vue'
import Footer from '../../components/Footer.vue'
import { NIcon, useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { UserStore } from '../../stores/UserStore.js'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const userStore = UserStore()
const router = useRouter()
const route = useRoute()
const axios = inject('axios')
const message = useMessage()

const user = reactive({
  userCampus: null,
  userEmail: null,
  userGender: null,
  userId: null,
  userName: null,
  userNickname: null,
  userPasswd: null,
  userPhoneNum: null,
  userPhoto: null,
  userProfile: null,
  userStatus: null
})

onMounted(() => {
  loadUser()
})

// 加载用户信息
const loadUser = async () => {
  loadingBar.start()
  let res = await axios.get('/user')
  console.log(res)
  if (res.data.msg == 'NOT_LOGIN') {
    message.info('请先登录')
    router.push('/login')
    return
  }
  userStore.id = res.data.data.userId
  Object.assign(user, res.data.data)
  loadingBar.finish()
}

// 第一次上传图片，获取图片的云路径
const handleFinish = async ({ file, event }) => {
  const ext = file.name.split('.')[1]
  file.name = `${user.userId}_avator.${ext}`
  var data = new FormData()
  data.append('photos', file.file)
  var config = {
    method: 'post',
    url: '/upload/Imgs',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  }
  loadingBar.start()
  let res = await axios(config)
  if (res.data.code == 1) {
    message.success('图片上传成功')
    user.userPhoto = res.data.data
    uploadAvator()
  } else {
    loadingBar.error()
    message.error('图片上传失败')
    if (rea.data.msg == 'NOT_LOGIN') {
      message.info('请先登录')
      router.push('/login')
    }
  }
  return file
}

// 第二次图片上传，像后端发送用户id和图片路径
const uploadAvator = async () => {
  var data = JSON.stringify({
    userId: user.userId,
    userPhoto: user.userPhoto[0]
  })

  var config = {
    method: 'patch',
    url: '/user/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  axios(config)
    .then(response => {
      if (response.code == 1) {
        loadingBar.finish()
        message.success('提交成功')
      } else if (response.code == 0) {
        loadingBar.error()
        message.error('提交失败')
        if (rea.data.msg == 'NOT_LOGIN') {
          message.info('请先登录')
          router.push('/login')
        }
      }
    })
    .catch(error => {
      console.error('Error updating user information:', error)
      message.error('网络异常')
    })
}

// 跳转到发布页
const publish = () => {
  router.push('/release')
}

// 上传头像的动画
const showOverlay = ref(false)
const setOverlayOpacity = visible => {
  const overlay = document.querySelector('.overlay')
  if (overlay) {
    overlay.style.opacity = visible ? '1' : '0'
  }
}
</script>

<style scoped lang="scss">
.w {
  width: 990px;
  margin: 0 auto;
}
.user-banner {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  height: 243px;
  .m-user {
    margin-bottom: 0;
    width: 250px;
    height: 243px;
    -webkit-box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    background-color: #18a058;
    border: 1px solid #18a058;
    border-radius: 15px;

    .avator {
      position: relative;
      width: 72px;
      height: 72px;
      margin: 25px auto;
      border-radius: 100%;
      border: 4px solid #fff;
      -webkit-box-shadow: 3px 2px 10px 0 rgba(1, 79, 4, 0.84);
      box-shadow: 3px 2px 10px 0 rgba(8, 79, 1, 0.84);
      overflow: hidden;

      img {
        width: 72px;
        height: 72px;
        display: inline-block;
        border: 0;
        vertical-align: middle;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 999;
      }
    }

    .usernickname {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      height: 20px;
      font: 700 18px/20px Arial;
      color: #fff;
    }
  }
  .mt {
    display: flex;
    flex-direction: column;
    width: 750px;
    margin: auto 20px;
    margin-right: 0;
    padding: 0 20px;
    height: 225px;
    line-height: 55px;
    background-color: #fff;
    border: 1px solid #f0f3ef;
    border-radius: 15px;

    .mh {
      font-weight: 700;
      font-size: 24px;
    }

    .mb {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        display: inline-block;
        flex-basis: calc(30% - 5px); /* 设置子元素的基础宽度为50%减去一定的间距 */
      }
    }
    .profile {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
