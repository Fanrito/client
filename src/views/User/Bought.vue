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
    >
      <n-button :disabled="item.orderStatus == '已收货'" strong secondary type="primary" @click="confirmReceipt(item)">确认收货</n-button>
    </OrderCard>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import OrderCard from '../../components/OrderCard.vue'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const router = useRouter()
const route = useRoute()

const axios = inject('axios')
const message = inject('message')
const userStore = UserStore()

let SoldGoodsList = ref([])

onMounted(() => {
  loadSoldGoods()
})

// 确认收货
const confirmReceipt = async item => {
  loadingBar.start()
  let res = await axios.patch('user/order/update', {
    orderId: item.orderId,
    orderStatus: '已收货'
  })
  console.log(res)
  if (res.data.code == 1) {
    loadingBar.finish()
    message.success('收货成功')
    window.location.reload()
  } else {
    loadingBar.error()
    message.error(res.data.msg)
  }
}

const loadSoldGoods = async () => {
  loadingBar.start()
  let res = await axios.get(`user/order`)
  console.log(res)
  if (res.data.code == 1) {
    const id = userStore.id
    res.data.data.map(item => {
      if (item.buyerId == id) {
        try {
          const goodsPhotosString = item.goodsPhotos.replace(/\\/g, '')
          const goodsPhotosArray = JSON.parse(goodsPhotosString)
          item.goodsPhotos = goodsPhotosArray[0]
          item.orderDateTime = item.orderDateTime.toString().split('T').join(' ')
          item.linkHref = `/detail/${item.goodsId}`
          SoldGoodsList.value.push(item)
        } catch (error) {
          console.log('商品图片不存在')
        }
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
    position: relative;
    margin: 1px 0px;
    background: #faf9f9;

    .n-button {
      position: absolute;
      right: 40px;
      bottom: 20px;
    }
  }

  .item:hover {
    box-shadow: 5px 19px 39px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
}
</style>
