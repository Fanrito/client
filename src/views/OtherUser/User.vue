<!-- 用户信息页 -->
<template>
  <div class="w">
    <TopNav style="margin-top: 50px"></TopNav>
    <div class="user-banner">
      <div class="m-user">
        <div class="avator">
          <img :src="user.userPhoto" alt="" />
        </div>
        <div class="usernickname">
          <span>{{ user.userNickname }}</span>
        </div>
      </div>
      <div class="mt">
        <div class="mh">ta的信息</div>
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
    <OtherInfo :userId="userId"></OtherInfo>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs, inject, provide } from 'vue'
import TopNav from './TopNav.vue'
import OtherInfo from './OtherInfo.vue'
import Footer from '../../components/Footer.vue'
import { NIcon, useMessage } from 'naive-ui'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
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
  userPhoneNum: null,
  userPhoto: null,
  userProfile: null,
  userStatus: null
})

const userId = route.params.userId
provide('userId', userId)

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  loadingBar.start()
  let res = await axios.get(`/other/${userId}`)
  console.log(res)
  Object.assign(user, res.data.data)
  loadingBar.finish()
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
