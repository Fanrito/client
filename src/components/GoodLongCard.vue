<template>
  <a class="content" :href="linkHref" target="_blank">
    <div class="img-content">
      <img :src="imgSrc" alt="" style="width: 100%; height: 100%" />
    </div>
    <div class="info">
      <div class="title-content">
        {{ title }}
      </div>
      <div class="category-content">
        分类：{{ category }}
      </div>
      <div class="price-content">
        <span style="text-decoration: line-through">￥{{ oriPrice }}</span>
        <span>￥{{ curPrice }}</span>
      </div>
      <div class="category-content">
        发布时间：{{ publishTime }}
      </div>
    </div>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['imgSrc', 'title', 'oriPrice', 'curPrice', 'category', 'publishTime', 'linkHref'])
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
    justify-content: space-between;
    flex-direction: column;
    padding-top: 20px;
    box-sizing: border-box;

    .title-content {
      width: 796px;
      font-size: 12px;
      height: 33px;
      line-height: 16px;
      overflow: hidden;
      padding: 0 18px;
      text-overflow: ellipsis;
      word-break: break-all;
      box-sizing: border-box;
    }

    .category-content {
      width: 796px;
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
      width: 796px;
      height: 51px;
      line-height: 51px;
      padding: 0 18px;
      color: #f02b2b;
      font-size: 18px;
      box-sizing: border-box;
    }
  }
}
</style>
