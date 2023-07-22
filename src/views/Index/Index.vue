<!-- 交易平台主页 -->
<template>
  <div class="w">
    <TopNav class="w" style="margin-top: 50px"></TopNav>
    <Carousel style="margin: 20px auto"></Carousel>
    <GoodsContentVue></GoodsContentVue>
    <n-back-top :right="100" />
    <Footer></Footer>
  </div>
</template>

<script setup>
import TopNav from './TopNav.vue'
import Carousel from './Carousel.vue'
import GoodsContentVue from './GoodsContent.vue'
import Footer from '../../components/Footer.vue'
</script>

<style scoped>
.w {
  width: 990px;
  margin: 0 auto;
}
</style>
