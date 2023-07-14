<!-- 登录页 -->
<template>
  <div class="background-img">
    <n-card title="" hoverable class="loginBorad">
      <div>
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
      </div>
      <RouterView></RouterView>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, h } from 'vue'

import { NIcon } from 'naive-ui'
import { BookOutline as BookIcon, PersonOutline as PersonIcon } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref(null)

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/login'
          }
        },
        { default: () => '登录' }
      ),
    key: 'login',
    icon: renderIcon(PersonIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/login/register'
          }
        },
        { default: () => '注册' }
      ),
    key: 'register',
    icon: renderIcon(BookIcon)
  }
]
</script>

<style scoped>
.background-img {
  position: fixed;
  width: 100%;
  height: 1080px;
  background-size: cover;
}
.loginBorad {
  margin: auto;
  margin-top: 50px;
  width: 600px;
  height: 500px;
}
</style>
