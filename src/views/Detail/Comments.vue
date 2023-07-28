<template>
  <div class="comments">
    <n-card v-for="(item, index) in commentsList" hoverable :key="index" :title="item.goodsCommentContent">
      <template #header-extra>
        <span>{{ item.userNickname == null ? item.username : item.userNickname }}</span>
        <router-link :to="`/otherUser/${item.userId}`" target="_blank">
          <img :src="item.userPhoto" alt="" style="display: inline-block; width: 30px; height: 30px; margin: 0 10px; border-radius: 90%" />
        </router-link>
      </template>
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
const goodsId = inject('goodsId')

let commentsList = ref([])

onMounted(() => {
  getComments()
})

const getComments = async () => {
  loadingBar.start()
  let res = await axios.get(`goods/comment/${goodsId}`)
  console.log(res)
  if (res.data.code == 1) {
    commentsList.value = res.data.data
    loadingBar.finish()
  } else {
    loadingBar.error()
  }
}
</script>

<style scoped></style>
