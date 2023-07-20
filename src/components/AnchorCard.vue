<template>
  <div class="anchor-card">
    <span class="anchor-text">{{ text }}  ------------------------------------------------------------------</span>
    <span style="line-height: 96px"> 查看更多</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(["text"])
</script>

<style scoped>
.anchor-card {
  width: 990px;
  height: 99px;
  background: #fff;
}

.anchor-text {
  display: inline-block;
  margin-left: 20px;
  font-size: 30px;
  line-height: 99px;
  font-weight: 600;
}
</style>