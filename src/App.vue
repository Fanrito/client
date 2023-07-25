<script setup>
import Admin from './views/admin/admin.vue'
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
