<template>
  <div class="search-box">
    <n-input :placeholder="searchTip" class="search-input" v-model:value="content" size="large">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <router-link tag="a" target="_blank" v-slot="{ navigate }" :to="{ path: '/search', query: { goodsName: content } }">
      <n-button @click="navigate" type="primary" style="" size="large"> 搜索 </n-button>
    </router-link>
  </div>
</template>

<script setup>
import { FlashOutline } from '@vicons/ionicons5'
import { defineProps, ref } from 'vue'
const props = defineProps(['searchTip', 'search'])
let content = ref('')
</script>

<style scoped>
.search-box {
  display: flex;
}

.search-input {
  min-width: 300px;
}
</style>
