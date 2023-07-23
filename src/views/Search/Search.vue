<template>
  <div class="w">
    <TopNav class="w" style="margin: 50px 0"></TopNav>
    <GoodsContent></GoodsContent>
  </div>
</template>

<script setup>
import TopNav from './TopNav.vue'
import GoodsContent from './GoodsContent.vue'
</script>

<style lang="scss" scoped>
.w {
  width: 990px;
  margin: 0 auto;
}
</style>
