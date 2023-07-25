<template>
  <div class="content">
    <div class="nav">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { ref, reactive, inject, h } from 'vue'

import { NIcon } from 'naive-ui'
import { CartOutline, BagCheckOutline, LogoUsd, MailOutline, SendOutline } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import GoodCard from '../../components/GoodCard.vue'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const activeKey = ref(null)
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/published'
          }
        },
        { default: () => '我发布的' }
      ),
    key: 'published',
    icon: renderIcon(SendOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user'
          }
        },
        { default: () => '我的购物车' }
      ),
    key: 'cart',
    icon: renderIcon(CartOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/bought'
          }
        },
        { default: () => '我买到的' }
      ),
    key: 'bought',
    icon: renderIcon(BagCheckOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/sold'
          }
        },
        { default: () => '我卖出的' }
      ),
    key: 'sold',
    icon: renderIcon(LogoUsd)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/comments'
          }
        },
        { default: () => '评价' }
      ),
    key: 'comments',
    icon: renderIcon(MailOutline)
  }
]
</script>

<style scoped lang="scss">
.content {
  width: 990px;
  background-color: #faf9f9;
  border: 1px solid #faf9f9;
  border-radius: 20px;

  .nav {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e1e3ee;
  }
}
</style>
