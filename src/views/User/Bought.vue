<template>
  <div class="goods-content">
    <GoodLongCard v-for="(item, index) in publishedGoodsList" :key="index" :publish-time="item.releaseTime" :img-src="item.imgSrc" :title="item.goodsName + item.goodsProfile" :curPrice="item.curPrice" :oriPrice="item.oriPrice" :link-href="item.linkHref" :category="item.goodsCategoryName" class="item"> </GoodLongCard>
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

let publishedGoodsList = ref([
  {
    imgSrc: 'https://xiafish.oss-cn-hangzhou.aliyuncs.com/ee7115fb-b1b3-42ec-9801-f04c99552b97.jpg',
    goodsId: 0,
    goodsName: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    oriPrice: 2000,
    curPrice: 1200,
    goodsCategoryName: '电子产品',
    releaseTime: '2023-07-17',
    inventory: 1,
    goodsProfile: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: `/seller_detail/goods?goodsId=0`
  }
])

onMounted(() => {
  loadPublishedGoods()
})

const loadPublishedGoods = async () => {
  let res = await axios.get(`user/order`)
  console.log(res)
  if (res.data.code == 1) {
    res.data.data.map(item => {
      let goodsInfo = {
        imgSrc: item.goodsImage,
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        oriPrice: item.oriPrice,
        curPrice: item.curPrice,
        goodsCategoryName: item.goodsCategoryName,
        releaseTime: item.releaseTime,
        inventory: item.inventory,
        goodsProfile: item.goodsProfile,
        linkHref: `/seller_detail/goods?goodsId=${item.goodsId}`
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
