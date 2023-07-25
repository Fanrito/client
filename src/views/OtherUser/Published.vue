<template>
  <div class="goods-content">
    <GoodLongCard
      v-for="(item, index) in publishedGoodsList"
      :key="index"
      :publish-time="item.releaseTime"
      :img-src="item.imgSrc"
      :title="item.goodsName + item.goodsProfile"
      :curPrice="item.curPrice"
      :oriPrice="item.oriPrice"
      :link-href="item.linkHref"
      :category="item.goodsCategoryName"
      class="item"
    >
    </GoodLongCard>
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

let publishedGoodsList = ref([])

onMounted(() => {
  loadPublishedGoods()
})

const loadPublishedGoods = async () => {
  let res = await axios.get(`other/goods/${userId}`)
  console.log(res)
  if (res.data.code == 1) {
    res.data.data.map(item => {
      const goodsPhotosString = item.goodsPhotos.replace(/\\/g, '')
      const goodsPhotosArray = JSON.parse(goodsPhotosString)
      let goodsInfo = {
        imgSrc: goodsPhotosArray[0],
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        oriPrice: item.oriPrice,
        curPrice: item.curPrice,
        goodsCategoryName: item.goodsCategoryName,
        releaseTime: item.releaseTime.toString().split('T').join(' '),
        inventory: item.inventory,
        goodsProfile: item.goodsProfile,
        linkHref: `/edit/${item.goodsId}`
      }
      publishedGoodsList.value.push(goodsInfo)
    })
  }
}
</script>

<style scoped lang="scss">
.goods-content {
  display: flex;
  flex-wrap: wrap;
  width: 990px;
  justify-content: space-around;
  transition: background box-shadow 0.3s ease;

  .item {
    margin: 1px 0px;
    background: #faf9f9;
  }

  .item:hover {
    box-shadow: 5px 19px 39px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
}
</style>
