<template>
  选择商品数量
  <n-space horizon align="center">
    <!-- 添加商品数量 -->
    <n-input-number min="0" :max="max" v-model:value="select_count" clearable />
    <!-- 加入购物车按钮 -->
    <n-dialog-provider>
      <n-button :disabled="max == 0"  @click="BuyNow" type="error" icon-placement="right">立即购买</n-button>
      <n-text>&emsp;</n-text>
      <n-button :disabled="max == 0" @click="AddToCarConfirm" type="info" icon-placement="right">加入购物车</n-button>
    </n-dialog-provider>
  </n-space>
</template>

<script setup>
import { ref, defineComponent, inject, defineProps } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { UserStore } from '../../stores/UserStore.js'
const userStore = UserStore()
const router = useRouter()
const route = useRoute()

const props = defineProps(['max'])

// 注入商品id
const goodsId = inject('goodsId')

// Use `const` for constants and `let` for variables that can change.
const select_count = ref(0)
const message = useMessage()
const $dialog = useDialog()

const BuyNow = () => {
  $dialog.info({
    title: '提示',
    content: '你确定要将此购买此商品吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        loadingBar.start()
        const response = await axios.post(`goods/purchase?goodsId=${goodsId}&orderNum=${select_count.value}`)
        if (response.data.code === 1) {
          message.success('下单成功！')
          loadingBar.finish()
          router.push('/user/bought')
        } else {
          message.error('下单失败！')
          loadingBar.error()
          if (response.data.msg == 'NOT_LOGIN') {
            message.info('请先登录')
            router.push('/login')
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    onNegativeClick: () => {
      message.error('取消购买')
    }
  })
}

const AddToCarConfirm = () => {
  $dialog.info({
    title: '提示',
    content: '你确定要将此物品加入购物车吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        loadingBar.start()
        const response = await axios.put(`goods/cart?goodsId=${goodsId}&collectNum=${select_count.value}`)
        if (response.data.code === 1) {
          message.success('已将物品加入购物车')
          loadingBar.finish()
        } else {
          message.error('加购失败！')
          loadingBar.error()
          if (response.data.msg == 'NOT_LOGIN') {
            message.info('请先登录')
            router.push('/login')
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    onNegativeClick: () => {
      message.error('取消加入')
    }
  })
}
</script>
