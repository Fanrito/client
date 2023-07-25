<template>
  <div class="comments">
    <n-card v-for="(item, index) in commentsList" hoverable :key="index" title="好评">
      <template #header-extra>
        <span>{{ item.buyerName }}</span>
        <img :src="item.buyerPhoto" alt="" style="display: inline-block; width: 30px; height: 30px; margin: 0 10px; border-radius: 90%" />
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
const userId = inject('userId')

let commentsList = ref([])

onMounted(() => {
  getComments()
})

const getComments = async () => {
  let res = await axios.get(`user/comment/${userId}`)
  console.log(res)
  commentsList.value = res.data.data
}
</script>

<style scoped></style>
