<template>
  <div class="comments">
    <n-card v-for="(item, index) in commentsList" hoverable :key="index" :title="item.seller_name"> {{ item["user-comment-content"] }} </n-card>
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
    user_comment_id: '1',
    seller_name: '张三',
    'user-comment-content': '商家商品质量好，服务态度好，回消息快'
  },
  {
    user_comment_id: '2',
    seller_name: '李四',
    'user-comment-content': '商家商品质量好，服务态度好，回消息快'
  }
])

onMounted(() => {
  // getComments()
})

const getComments = async () => {
  let res = await axios.get(`user/comment/${userid}`)
  commentsList = res.data.data
}
</script>

<style scoped></style>
