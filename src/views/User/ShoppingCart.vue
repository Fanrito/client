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
      <div class="content" :href="linkHref" target="_blank">
        <n-checkbox v-model:checked="item.isSelected" class="number" @click="selectGoods(item.goodsId)"> 选中 </n-checkbox>
        <div style="height: 110px; width: 110px">
          <a :href="item.linkHref"> <img :src="item.goodsPhotos" alt="" /></a>
        </div>

        <div class="title-content">
          {{ item.collectNum }}
          <br />
          <br />
          {{ item.goodsProfile }}
        </div>
        <div style="margin-left: 28px; font-size: 18px; color: red">￥{{ item.curPrice }}</div>
        <n-input-number min="0" :max="item.inventory" v-model:value="item.collectNum" clearable size="small" style="margin-left: 80px; vertical-align: middle; width: 100px" @update:value="changeNum(item.goodsId)" />

        <div style="flex: 1; width: 70px; text-align: center; margin-left: 33px">
          {{ item.total }}
        </div>
        <div style="flex: 1; text-align: center">
          <n-button type="primary" size="small" @click="DeleteCollect(item.shoppingCartId)">删除</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../../stores/UserStore.js'
import { useRouter, useRoute } from 'vue-router'
import naive from 'naive-ui/es/preset'
import { useMessage } from 'naive-ui'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
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
var goods = ref([])
//这四个函数是要连接后端的，为方便修改写前面了
// var goods=ref([])
// 获得购物车信息
onMounted(() => {
  search()
})
const search = async () => {
  try {
    loadingBar.start()
    const response = await axios('/shoppingcart', {
      params: {
        // 参数...
      }
    })
    const data = response.data.data.rows
    console.log(data)
    const modifiedData = data.map(item => {
      try {
        // 在这里对每个对象进行修改，并添加属性
        const goodsPhotosString = item.goodsPhotos.replace(/\\/g, '')
        const goodsPhotosArray = JSON.parse(goodsPhotosString)
        item.goodsPhotos = goodsPhotosArray[0]
        return {
          ...item,
          isSelected: false, // 替换为你想要添加的属性和值
          total: item.collectNum * item.curPrice,
          linkHref: `/detail/${item.goodsId}`
        }
      } catch (error) {
        console.log(error)
      }
    })
    goods.value = modifiedData
    console.log(goods.value)
    loadingBar.finish()
  } catch (error) {
    console.log(error)
  }
}
//点击全选时进入这个函数，对应的总价格和已选商品数量改变
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
//当修改商品的收藏数量时进入这个函数，把对应的总价格改了
function changeNum(goodsId) {
  // console.log(goodsId)
  // console.log(goods.value)
  console.log(goods.value)
  const selectedGoods = goods.value.find(goods => goods.goodsId === goodsId)
  console.log(selectedGoods)
  if (selectedGoods.isSelected === true) selectedAmount.value -= selectedGoods.total
  selectedGoods.total = selectedGoods.curPrice * selectedGoods.collectNum
  if (selectedGoods.isSelected === true) selectedAmount.value += selectedGoods.total
  console.log(selectedGoods.total)
}
//判断当前是否全选
const judgeALL = () => {
  console.log('进入judge函数')
  let judgeTrue = 1 //是否全选？
  let judgeFalse = 1 //是否全不选？
  for (let i = 0; i < goods.value.length; i++) {
    if (goods.value[i].isSelected === true) {
      judgeFalse = 0
      break
    }
  }
  for (let i = 0; i < goods.value.length; i++) {
    if (goods.value[i].isSelected === false) {
      judgeTrue = 0
      break
    }
  }
  if (judgeTrue === 1) {
    allItemsSelected.value = true
  }
  if (judgeFalse === 1) {
    allItemsSelected.value = false
  }
  console.log('是否全选:')
  console.log(allItemsSelected.value)
}
//当选择一个商品时进入这个函数，自动计算总价格和已选商品数量
const selectGoods = goodsId => {
  const selectedGoods = goods.value.find(goods => goods.goodsId === goodsId)
  console.log(selectedGoods.isSelected)
  if (selectedGoods) {
    if (selectedGoods.isSelected === true) {
      judgeALL()
      selectedAmount.value = selectedAmount.value + selectedGoods.total
      cartItemCount.value = cartItemCount.value + 1
    } else if (selectedGoods.isSelected === false) {
      judgeALL()
      selectedAmount.value = selectedAmount.value - selectedGoods.total
      cartItemCount.value = cartItemCount.value - 1
    }
    console.log(cartItemCount.value)
    console.log(selectedAmount.value)
  }
}
const DeleteCollect = async shoppingCartId => {
  try {
    loadingBar.start()
    const response = await axios.delete(`/shoppingcart/delete?shoppingCartIds=${shoppingCartId}`)
    // 处理成功响应
    console.log(response.data)
    // 进行后续操作，如展示成功提示等
    search()
  } catch (error) {
    // 处理错误情况
    console.log(error)
    // 进行错误处理，如展示错误提示等
  }
}
const deleteAllGoods = async () => {
  try {
    const selectedItems = goods.value
      .filter(item => item.isSelected)
      .map(item => item.shoppingCartId)
      .join(',')
    loadingBar.start()
    const response = await axios.delete(`/shoppingcart/delete?shoppingCartIds=${selectedItems}`)
    // 处理成功响应
    console.log(response.data)
    // 进行后续操作，如展示成功提示等
    search()
  } catch (error) {
    // 处理错误情况
    console.log(error)
    // 进行错误处理，如展示错误提示等
  }
}
const buyAllGoods = async () => {
  // 获取所有选中的商品的标识符
  const selectedItems = goods.value
    .filter(item => item.isSelected)
    .map(item => item.shoppingCartId)
    .join(',')
  console.log(selectedItems)
  try {
    // 发送POST请求到后端购买接口
    loadingBar.start()
    const response = await axios.post(`/shoppingcart/buy?shoppingCartIds=${selectedItems}`)
    console.log(response)
    if (response.data.code == 1) {
      // 处理成功响应
      console.log(response.data)
      // 进行后续操作，如展示成功提示等
      loadingBar.finish()
      message.success('结算成功')
    } else {
      loadingBar.error()
      message.error(response.data.msg)
    }
  } catch (error) {
    // 处理错误情况
    loadingBar.error()
    message.error('结算失败')
    console.log(error)
    // 进行错误处理，如展示错误提示等
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
