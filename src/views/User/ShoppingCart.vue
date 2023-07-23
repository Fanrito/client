<template>
  <!-- 顶部购物车信息 -->
  <div class="cart-header">
    <div class="cart-title">
      购物车(
      <span>{{ cartItemCount }}</span>
      )
    </div>
    <div class="cart-total">
      已选商品金额：{{ selectedAmount }}
      <space style="margin-left: 40px"></space>
      <n-button type="tertiary" round @click="buyAllGoods" style="margin-right: 30px">结算</n-button>
      <n-button type="tertiary" round @click="deleteAllGoods" style="margin-right: 30px">批量删除</n-button>
    </div>
  </div>

  <div class="cart-item">
    <div class="checkbox-container">
      <n-checkbox v-model:checked="allItemsSelected" @click="ALLselect">全选</n-checkbox>
    </div>
    <space style="margin-left: 200px"></space>
    <div class="item-info">商品信息</div>
    <space style="margin-left: 100px"></space>
    <div class="item-price">商品单价</div>
    <space style="margin-left: 100px"></space>
    <div class="item-quantity">商品数量</div>
    <space style="margin-left: 100px"></space>
    <div class="item-total">商品总价</div>
    <space style="margin-left: 100px"></space>
    <div class="item-actions">操作</div>
  </div>

  <div class="goods-content">
    <div v-for="(item, index) in goods" :key="index">
      <a class="content" :href="linkHref" target="_blank">
        <n-checkbox v-model:checked="item.isSelected" class="number" @click="selectGoods(item.goodsId)"> 选中 </n-checkbox>
        <div style="height: 110px; width: 110px">
          <img :src="item.goodsPhoto" alt="" />
        </div>

        <div class="title-content">
          {{ item.goodsName }}
          <br />
          <br />
          {{ item.goodsProfile }}
        </div>
        <div style="margin-left: 28px; font-size: 18px; color: red">￥{{ item.curPrice }}</div>
        <n-input-number min="0" v-model:value="item.goodsNum" clearable size="small" style="margin-left: 80px; vertical-align: middle; width: 100px" @update:value="changeNum(item.goodsId)" />

        <div style="flex: 1; width: 70px; text-align: center; margin-left: 33px">
          {{ item.total }}
        </div>
        <div style="flex: 1; text-align: center">
          <n-button type="primary" size="small" @click="DeleteCollect">删除</n-button>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import naive from 'naive-ui/es/preset'
import { useMessage } from 'naive-ui'
import { getShoppingCart } from '@/api.js'
const axios = inject('axios')
const message = useMessage()
const router = useRouter()
var allItemsSelected = ref(0)
var aLLselect = ref(0)

const cartItemCount = ref(0) //已选商品数量
const selectedAmount = ref(0) //已选商品金额
const pagesize = ref(10) //页面大小
var cur_page = ref(1) //当前页面
const userId = ref(1)
// var goods=ref([])
// 获得购物车信息
// onMounted(async () => {
//   try {
//     const response = await axios.get('/shoppingcart',{//请求无参数
//     })
//     const cartData = response.data; // 假设返回的数据是一个数组
//     console.log(cartData);
//     goods=cartData.data.rows;//传给goods
//     //goods里面有：
// // ||-shoppingCartId|
// // ||-goodsId|
// // ||-goodsName|
// // ||-oriPrice|
// // ||-curPrice|
// // ||-goodsCategoryName|
// // ||-sellerId|
// // ||-releaseTime|
// // ||-inventory|
// // ||-goodsProfile|
// // ||-goodsPhoto|
//     // 处理购物车数据
//     // ...

//   } catch (error) {
//     console.error(error);
//     // 处理错误
//     // ...
//   }
// })

// //给后端传我的参数加键值对
// data=[].map((item)=>{item.total=item.curPrice*item.goodsNum})
// data=[{},{}].map((item)=>{item.isSelected=0})

var goods = ref([
  {
    goodsId: 1,
    goodsPhoto: '../src/static/img/phone.jpg',
    curPrice: '1000',
    sellerId: 1,
    goodsName: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsProfile:
      '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsNum: 1,
    linkHref: 'http://127.0.0.1:5173/',
    total: 1000,
    isSelected: false //这个后端没有传给我怎么办
  },
  {
    goodsId: 2,
    goodsPhoto: '../src/static/img/phone.jpg',
    curPrice: '1000',
    sellerId: '我是一只羊',
    goodsName: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsProfile:
      '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsNum: 1,
    linkHref: 'http://127.0.0.1:5173/',
    total: 1000, //总价格 后端也没有传给我
    isSelected: false
  },
  {
    goodsId: 3,
    goodsPhoto: '../src/static/img/phone.jpg',
    curPrice: '1000',
    sellerId: '我是一只牛', //暂时不用放卖家名
    goodsName: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsProfile:
      '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsNum: 1,
    linkHref: 'http://127.0.0.1:5173/',
    total: 1000,
    isSelected: false
  }
])

function ALLselect() {
  // console.log(goods.value)
  if (allItemsSelected.value === true) {
    console.log(allItemsSelected.value)
    for (let i = 0; i < goods.value.length; i++) {
      if (goods.value[i].isSelected === false) {
        goods.value[i].isSelected = true
        selectGoods(goods.value[i].goodsId)
        console.log(goods.value[i].isSelected)
      }
    }
  } else if (allItemsSelected.value === false) {
    console.log(allItemsSelected.value)
    for (let i = 0; i < goods.value.length; i++) {
      if (goods.value[i].isSelected === true) {
        goods.value[i].isSelected = false
        selectGoods(goods.value[i].goodsId)
        console.log(goods.value[i].isSelected)
      }
    }
  }
}

//购买成功后库存还要减少
function buyAllGoods() {
  message.success('购买成功', { duration: 2000 })
}
//删除
function deleteAllGoods() {
  message.success('删除成功', { duration: 2000 })
}
//单个删除
function DeleteCollect() {}

function changeNum(goodsId) {
  console.log(goodsId)
  // console.log(goods.value)
  const selectedGoods = goods.value.find(goods => goods.goodsId === goodsId)
  if (selectedGoods.isSelected === true) selectedAmount.value -= selectedGoods.total
  selectedGoods.total = selectedGoods.curPrice * selectedGoods.goodsNum
  if (selectedGoods.isSelected === true) selectedAmount.value += selectedGoods.total
  console.log(selectedGoods.total)
}

const selectGoods = goodsId => {
  const selectedGoods = goods.value.find(goods => goods.goodsId === goodsId)
  console.log(selectedGoods.isSelected)
  if (selectedGoods) {
    if (selectedGoods.isSelected === true) {
      selectedAmount.value = selectedAmount.value + selectedGoods.total
      cartItemCount.value = cartItemCount.value + 1
    } else if (selectedGoods.isSelected === false) {
      selectedAmount.value = selectedAmount.value - selectedGoods.total
      cartItemCount.value = cartItemCount.value - 1
    }
    console.log(cartItemCount.value)
    console.log(selectedAmount.value)
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
  flex-direction: column;

  .item {
    margin: 1px 0px;
    background: #faf9f9;
  }

  .item:hover {
    box-shadow: 5px 19px 39px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
}

.cart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-title {
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
}

.cart-count {
  background-color: #f02b2b;
  color: #ffffff;
  // color: #fff;
  font-size: 10px;
  padding: 4px 8px;
  height: 20px;
  margin-top: -10px;
  border-radius: 20%;
  margin-left: 4px;
}

.cart-total {
  display: flex;
  align-items: center;
}

.checkout-button {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
.cart-item {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
}

.checkbox-container {
  text-align: center;
}

.cart-items {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.checkbox-container {
  margin-right: 10px;
}
.item-price,
.item-quantity,
.item-total,
.item-actions {
  text-align: center;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.item-details {
  margin-left: 10px;
}

.item-name {
  font-weight: bold;
}

.item-profile {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
  line-height: 1.4;
}

.item-price,
.item-quantity,
.item-total,
.item-actions {
  text-align: center;
}

.item-price,
.item-total {
  font-weight: bold;
}

.remove-button {
  background-color: #f44336;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.img-content {
  width: 130px;
  height: 100px;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: row;
  padding: 0;
  // margin: 5px 0;
  // width: 990px;
  height: 194px;
  background: #fff;
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.content {
  display: flex;
  // flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 5px 0;
  width: 990px;
  height: 164px;
  background: #fff;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 0;
  // box-sizing: border-box;
}
.title-content {
  width: 160px;
  font-size: 12px;
  height: 98px;
  // flex:1;
  line-height: 16px;
  overflow: hidden;
  padding: 0 18px;
  text-overflow: ellipsis;
  word-break: break-all;
  margin-left: 20px;
  // box-sizing: border-box;
}
.price-content {
  width: 796px;
  height: 51px;
  line-height: 150px;
  margin-left: 7px;
  padding: 0 18px;
  color: #f02b2b;
  font-size: 18px;
  // box-sizing: border-box;
}
.number {
  width: 60px;
  margin-left: 20px;
  height: 30px;
  font-size: 10px;
}
</style>
