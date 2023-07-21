<template>
  <a class="content" :href="linkHref" target="_blank">
    <div class="img-content">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="title-content">
      {{ title }}
    </div>
    <div class="price-content">
      <span>￥{{ price }}</span>
    </div>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['imgSrc', 'title', 'price', 'linkHref'])
</script>

<style scoped>
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.content {
  display: inline-block;
  padding: 0;
  width: 194px;
  height: 278px;
  background: #fff;
}
.img-content {
  width: 194px;
  height: 194px;
  box-sizing: border-box;
}

.title-content {
  width: 194px;
  height: 33px;
  font-size: 12px;
  height: 33px;
  line-height: 16px;
  overflow: hidden;
  padding: 0 18px;
  text-overflow: ellipsis;
  word-break: break-all;
  box-sizing: border-box;
}

.price-content {
  width: 194px;
  height: 51px;
  line-height: 51px;
  padding: 0 18px;
  color: #f02b2b;
  font-size: 18px;
  box-sizing: border-box;
}
</style>
