<template>
  <div class="comments">
    <n-card v-for="(item, index) in commentsList" hoverable :key="index" title="好评">
      <template #header-extra>
        <span>{{ item.buyerName }}</span>
        <img :src="item.buyerImg" alt="" style="display: inline-block; width: 30px; height: 30px; margin: 0 10px; border-radius: 90%" />
      </template>
      {{ item.userCommentContent }}
    </n-card>
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

let commentsList = reactive([
  {
    userCommentId: '1',
    buyerId: '3',
    buyerName: '李四',
    userCommentContent: '商家商品质量好，服务态度好，回消息快',
    buyerImg: 'https://xiafish.oss-cn-hangzhou.aliyuncs.com/ee7115fb-b1b3-42ec-9801-f04c99552b97.jpg'
  },
  {
    userCommentId: '2',
    buyerId: '4',
    buyerName: '李四',
    userCommentContent: '商家商品质量好，服务态度好，回消息快',
    buyerImg: 'https://xiafish.oss-cn-hangzhou.aliyuncs.com/ee7115fb-b1b3-42ec-9801-f04c99552b97.jpg'
  }
])

onMounted(() => {
  getComments()
})

const getComments = async () => {
  let res = await axios.get(`user/comment/1`)
  console.log()
  commentsList = res.data.data
}
</script>

<style scoped></style>
