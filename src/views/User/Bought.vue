<template>
  <div class="goods-content">
    <OrderCard
      class="item"
      v-for="(item, index) in SoldGoodsList"
      hoverable
      :key="index"
      :status="item.orderStatus"
      :order-time="item.orderDateTime"
      :num="item.orderNum"
      :title="item.goodsName"
      :buyer="item.buyerName"
      :seller="item.sellerName"
      :img-src="item.goodsPhotos"
      :linkHref="item.linkHref"
      :total-price="item.orderSumPrice"
    ></OrderCard>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import OrderCard from '../../components/OrderCard.vue'
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

let SoldGoodsList = ref([])

onMounted(() => {
  loadSoldGoods()
})

// 待修改
const loadSoldGoods = async () => {
  loadingBar.start()
  let res = await axios.get(`user/order`)
  console.log(res)
  if (res.data.code == 1) {
    const id = userStore.id
    res.data.data.map(item => {
      if (item.buyerId == id) {
        const goodsPhotosString = item.goodsPhotos.replace(/\\/g, '')
        const goodsPhotosArray = JSON.parse(goodsPhotosString)
        item.goodsPhotos = goodsPhotosArray[0]
        item.orderDateTime = item.orderDateTime.toString().split('T').join(' ')
        item.linkHref = `/detail?goodsId=${item.goodsId}`
        SoldGoodsList.value.push(item)
      }
    })
    console.log(SoldGoodsList)
    loadingBar.finish()
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
