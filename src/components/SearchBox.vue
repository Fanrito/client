<template>
  <div class="search-box">
    <n-input :placeholder="searchTip" class="search-input" v-model:value="content">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-button type="primary" @click="callSearch()"> 搜索 </n-button>
  </div>
</template>

<script setup>
import { FlashOutline } from '@vicons/ionicons5'
import { defineProps, ref } from 'vue'
const props = defineProps(['searchTip', 'search'])
let content = ref('')
const callSearch = () => {
  props.search(content)
}
</script>

<style scoped>
.search-box {
  display: flex;
}

.search-input {
  max-width: 400px;
}
</style>
