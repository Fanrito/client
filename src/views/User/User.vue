<!-- 用户信息页 -->
<template>
  <div class="w">
    <TopNav style="margin-top: 50px"></TopNav>
    <div class="user-banner">
      <div class="m-user">
        <div class="avator">
          <img :src="user.image" alt="" />
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
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import TopNav from './TopNav.vue'
import OtherInfo from './OtherInfo.vue'
import axios from 'axios'

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
onMounted(() => {
  // loadUser()
})

const loadUser = async () => {
  let res = await axios.get('/user')
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
