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
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

let commentsList = ref([])

onMounted(() => {
  getComments()
})

const getComments = async () => {
  loadingBar.start()
  let res = await axios.get(`user/comment`)
  console.log(res)
  commentsList.value = res.data.data
  loadingBar.finish()
}
</script>

<style scoped></style>
