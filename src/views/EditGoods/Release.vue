<script setup>
import { ref, reactive, inject, provide } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
// import Steps from './Steps.vue';
import Form from './Form.vue'

import TopUI from '../Index/TopNav.vue'

const goodsId = route.params.goodsId
provide('goodsId', goodsId)
</script>

<template>
  <div class="my_style">
    <!-- <Steps/> -->
    <!-- <ImageUpLoad/> -->
    <TopUI class="my_style" style="margin-top: 50px" /><br /><br />
    <!-- <Steps/><br> -->
    <n-layout round>
      <br />
      <h2 style="margin-left: 80px">商品信息修改</h2>
      <br />
      <Form /><br /><br />
    </n-layout>
  </div>
</template>

<style>
.my_style {
  width: 990px;
  margin: 0 auto;
}
</style>
