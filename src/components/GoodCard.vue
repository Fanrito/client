<template>
  <a class="content" :href="linkHref" target="_blank">
    <div class="img-content">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="title-content">
      <span>{{ title }}</span>
    </div>
    <div class="price-content">
      <span style="text-decoration: line-through">{{ '￥' + oriPrice }}</span>
      ￥{{ price }}
    </div>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['imgSrc', 'title', 'price', 'linkHref', 'oriPrice'])
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  width: 194px;
  height: 300px;
  background: #fff;
}
.img-content {
  width: 194px;
  height: 194px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
}

.title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 194px;
  height: 45px;
  font-size: 14px;
  overflow: hidden;
  padding: 0 18px;
  text-overflow: ellipsis;
  word-break: break-all;
  box-sizing: border-box;
  span {
    display: inline-block;
    height: 45px;
  }
}

.price-content {
  width: 194px;
  height: 31px;
  line-height: 31px;
  padding: 0 18px;
  color: #f02b2b;
  font-size: 18px;
  box-sizing: border-box;
}
</style>
