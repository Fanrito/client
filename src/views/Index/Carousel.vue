<template>
  <n-carousel key="card" effect="card" :centered-slides="true" slides-per-view="auto" draggable style="height: 240px">
    <n-carousel-item :style="{ width: '60%' }" v-for="(item, index) in url" :key="index">
      <img class="carousel-img" :src="item" />
    </n-carousel-item>
  </n-carousel>
</template>

<script setup>
const url = [
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
]
</script>

<style scoped>
.carousel-img {
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
