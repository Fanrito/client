<!-- 用户信息页 -->
<template>
  <div class="w">
    <TopNav style="margin-top: 50px"></TopNav>
    <div class="user-banner">
      <div class="m-user">
        <div class="avator" @mouseover=";(showOverlay = true), setOverlayOpacity(true)" @mouseleave=";(showOverlay = false), setOverlayOpacity(false)">
          <img :src="user.image" alt="" />
          <n-upload action="http://127.0.0.1:8080/upload" :default-upload="false" @change="handleFinish">
            <div class="overlay" v-if="showOverlay">上传头像</div>
          </n-upload>
        </div>
        <div class="usernickname">
          <span>{{ user.name }}</span>
        </div>
      </div>
      <div class="mt">
        <div class="mh">我的信息</div>
        <div class="mb">
          <span>用户名: {{ user.username }}</span>
          <span>性别: {{ user.gender }}</span>
          <span>电话: {{ user.phone }}</span>
          <span>邮箱: {{ user.email }}</span>
          <span>校区: {{ user.campus }}</span>
        </div>
        <div class="profile">个人简介: {{ user.profile }}</div>
      </div>
    </div>
    <OtherInfo></OtherInfo>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import TopNav from './TopNav.vue'
import OtherInfo from './OtherInfo.vue'
import axios from 'axios'
import Footer from '../../components/Footer.vue'
import { NIcon, useMessage } from 'naive-ui'

const message = useMessage()
const handleFinish = ({ file, event }) => {
  console.log(file);
  console.log(event)
  message.success((event?.target).response)
  const ext = file.name.split('.')[1]
  file.name = `${user.id}_avator.${ext}`
  // file.url = '__HTTPS__://www.mocky.io/v2/5e4bafc63100007100d8b70f'
  let res = axios.post('/upload', {
    userId: user.id,
    image: file
  })
  if(res.data.code == 1) {
    message.info("图片上传成功")
    user.image = res.data.data
    uploadAvator()
  } else {
    message.info("图片上传失败")
  }
  return file
}

const user = reactive({
  id: 1,
  username: '111111',
  name: '范·奇森',
  gender: '男',
  phone: '13811012138',
  email: 'fzz@250.com',
  profile: '我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱我是一个小可爱',
  image: '/src/static/img/头像.jpg',
  campus: '翔安'
})

const showOverlay = ref(false)
const setOverlayOpacity = visible => {
  const overlay = document.querySelector('.overlay')
  if (overlay) {
    overlay.style.opacity = visible ? '1' : '0'
  }
}

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  let res = await axios.get('/user')
  console.log(res)
  user.value = rows[0]
}

const uploadAvator = async () => {
  const param = {
    id: user.id,
    image: user.image
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
      margin: 30px auto;
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
