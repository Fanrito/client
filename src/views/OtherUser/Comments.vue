<template>
  <div class="comments">
    <n-card v-for="(item, index) in commentsList" hoverable :key="index" :title="item.sellerId"> {{ item.userCommentContent }} </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import GoodLongCard from '../../components/GoodLongCard.vue'
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

const commentsList = reactive([
  {
    userCommentId: '1',
    buyerId: '3',
    sellerId: '2',
    userCommentContent: '商家商品质量好，服务态度好，回消息快'
  },
  {
    userCommentId: '2',
    buyerId: '4',
    sellerId: '2',
    userCommentContent: '商家商品质量好，服务态度好，回消息快'
  }
])

onMounted(() => {
  getComments()
})

const getComments = async () => {
  let res = await axios.get(`user/comment`)
  commentsList = res.data.data
}
</script>

<style scoped></style>
