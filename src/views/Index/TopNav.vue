<!-- 首页顶部导航栏 -->
<template>
  <div class="top">
    <div class="brand">
      <img src="../../static/img/favicon-32x32.png" alt="" />
      <span class="brand-text">厦小鱼二手交易网</span>
    </div>
    <div class="search-box">
      <SearchBox searchTip="搜索你想要的商品" :search="search"></SearchBox>
    </div>
    <div class="topnav">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, h } from 'vue'
import SearchBox from '../../components/SearchBox.vue'
import { NIcon } from 'naive-ui'
import { BookOutline as BookIcon, PersonOutline as PersonIcon } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { UserStore } from '../../stores/UserStore.js'

const userStore = UserStore()
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref(null)

const menuOptions = [
  {
    label: () =>
      h(
        'a',
        {
          href: userStore.token ? '/user' : '/login',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '个人中心'
      ),
    key: 'login',
    icon: renderIcon(PersonIcon)
  }
]

const search = key => {
  console.log(key)
}
</script>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.brand {
  display: flex;
  align-items: center;
}
.brand-text {
  font: microsoft;
  font-size: 18px;
  display: inline-block;
  margin-left: 10px;
}
</style>
