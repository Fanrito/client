<!-- 登录页 -->
<template>
  <n-card :title="title" hoverable class="loginBorad">
    <n-breadcrumb>
      <n-breadcrumb-item @click="login"> 登录</n-breadcrumb-item>
      <n-breadcrumb-item @click="register"> 注册</n-breadcrumb-item>
    </n-breadcrumb>
  </n-card>
</template>

<script setup>
let title = ref('登录')
function login() {
  title.value = '登录'
}
function register() {
  title.value = '注册'
}
</script>

<style scoped>
.loginBorad {
  margin: auto;
  margin-top: 50px;
  width: 600px;
  height: 500px;
}
</style>
