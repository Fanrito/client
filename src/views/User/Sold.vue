<template>
  <div class="goods-content">
    <n-card v-for="(item, index) in SoldGoodsList" hoverable :key="index" title="">
      <div>订单号：{{ item.goodsId }}</div>
      <div>买家：{{ item.buyerId }}</div>
      <div>订单总价： {{ item.orderSumPrice }}</div>
      <div>订单数量： {{ item.orderNum }}</div>
      <div>订单状态：{{ item.orderStatus }}</div>
      <div>订单时间：{{ item.orderDateTime.split('T')[0] + ' ' + item.orderDateTime.split('T')[1] }}</div>
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

let SoldGoodsList = ref([
  {
    orderId: 1,
    buyerId: '333',
    sellerId: '1',
    sellerName: '蔡徐坤',
    goodsId: '12',
    orderNum: '3',
    orderSumPrice: '30',
    orderStatus: '已完成',
    orderDateTime: '2022-09-01T23:06:29'
  }
])

onMounted(() => {
  loadSoldGoods()
})

// 待修改
const loadSoldGoods = async () => {
  let res = await axios.get(`user/order`)
  console.log(res)
  if (res.data.code == 1) {
    const id = userStore.id
    res.data.data.map(item => {
      if(item.sellerId == userStore.id) {
        SoldGoodsList.push(item)
      }
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
