<template>
  <a class="content" :href="linkHref" target="_blank" @click="handleLinkClick">
    <div class="img-content">
      <img :src="imgSrc" alt="" style="width: 100%; height: 100%" />
    </div>
    <div class="info">
      <div>商品：{{ title }}</div>
      <div>买家：{{ buyer }}</div>
      <div>卖家：{{ seller }}</div>
      <div>订单数量：{{ num }}</div>
      <div>
        订单总价：<span>￥{{ totalPrice }}</span>
      </div>
      <div>订单状态：{{ status }}</div>
      <div>订单时间：{{ orderTime }}</div>
    </div>
    <slot class="slot"></slot>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['status', 'buyer', 'seller', 'imgSrc', 'title', 'totalPrice', 'num', 'orderTime', 'linkHref'])
function handleLinkClick(event) {
  // 如果事件来自于 button 元素，则阻止跳转
  console.log(event.target.tagName.toLowerCase())
  if (event.target.tagName.toLowerCase() === 'span') {
    event.preventDefault()
  }
}
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border: 1 solid #fff;
  border-radius: 20px;
}
.content {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 5px 0;
  width: 990px;
  height: 194px;
  background: #fff;

  .img-content {
    width: 194px;
    height: 194px;
    box-sizing: border-box;
  }

  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
