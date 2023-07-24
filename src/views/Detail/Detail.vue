<!-- 商品详情页 -->
<template>
  <div class="w">
    <TopUI class="w" style="margin-top: 50px"></TopUI><br /><br />

    <n-breadcrumb separator=">">
      <n-breadcrumb-item href="/">主页</n-breadcrumb-item>
      <n-breadcrumb-item href="/search">商品列表</n-breadcrumb-item>
      <n-breadcrumb-item>商品详情页</n-breadcrumb-item> </n-breadcrumb
    ><br />

    <n-layout has-sider>
      <!-- 左边图片布局 -->
      <n-layout-sider :native-scrollbar="false" width="300px" bordered>
        <image-show :imageUrls="res.goodsPhotos"></image-show>

        <n-layout-content content-style="padding: 24px;">
          <div align="left">
            <font color="grey">发布时间 {{ res.releaseTime }}</font>
          </div>
          <br /><br />
          <a :href="userLink" target="_blank">
            <n-space horizon align-items="center">
              <img :src="seller.userPhoto" alt="" style="display: inline-block; width: 25px; height: 25px; border-radius: 90%" />
              <div>{{ seller.userName }}</div>
            </n-space>
          </a>
          <n-rate readonly :default-value="3"></n-rate>
        </n-layout-content>
      </n-layout-sider>

      <!-- 右边商品详情 -->
      <n-layout>
        <n-layout-header bordered>
          <div align="left">
            <font color="grey">商品编号：{{ res.goodsId }}</font>
          </div>
          <h3>{{ res.goodsName }}</h3>
          <!-- 商品价格 -->
          <h3 font-size="26">
            <font color="red">
              <n-tag :bordered="false" type="error">惊喜价</n-tag>
              ￥{{ res.curPrice }}
              <del>￥{{ res.oriPrice }}</del>
            </font>
          </h3>
          <div align="right">
            <font color="grey">库存 {{ res.inventory }}</font>
          </div>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <!-- <Bottom></Bottom><br><br> -->
          <h4>商品描述</h4>
          <n-space>
            <n-tag :bordered="false" type="success">分类：{{ res.goodsCategoryName }}</n-tag>
          </n-space>
          <p>{{ res.goodsProfile }}</p>
        </n-layout-content>
        <n-layout-footer bordered>
          <NDialogProvider>
            <InfoChoose :max="res.inventory"></InfoChoose>
          </NDialogProvider>
        </n-layout-footer>
      </n-layout>
    </n-layout>
    <!-- 下面的评价信息 -->
    <n-layout>
      <img class="w" v-for="(item, index) in res.goodsPhotos" :src="item" alt="" :key="index" style="display: block;">
    </n-layout>
  </div>
</template>

<style scoped>
.n-layout-header {
  padding: 24px;
}
.n-layout-footer {
  padding: 24px;
}
.w {
  width: 990px;
  margin: 0 auto;
}
</style>

<script setup>
import TopUI from './TopUI.vue'
import ImageShow from './ImageShow.vue'
import InfoChoose from './InfoChoose.vue'
// import { NDialogProvider } from 'naive-ui';
import { ref, onMounted, inject, reactive, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const axios = inject('axios')

// 获取当前商品id
const goodsId = route.params.goodsId
provide('goodsId', goodsId)

let res = reactive({})
let seller = reactive({})
let userLink = ref('')

const getSeller = async () => {
  console.log(res.sellerId)
  let response = await axios.get(`other/${res.sellerId}`)
  console.log(response)
  if (response.data.code == 1) {
    seller = response.data.data
    userLink.value = '/other/' + seller.userId
  }
}

const getItem = async () => {
  console.log(goodsId)
  const response = await axios.get(`/goods`, {
    params: {
      goodsId: goodsId
    }
  })
  console.log(response)
  if (response.data.code == 1) {
    const goodsPhotosString = response.data.data.goodsPhotos.replace(/\\/g, '')
    const goodsPhotosArray = JSON.parse(goodsPhotosString)
    response.data.data.goodsPhotos = goodsPhotosArray
    response.data.data.releaseTime = response.data.data.releaseTime.toString().split('T').join(' ')
    Object.assign(res, response.data.data)
    console.log(res)
  }
  getSeller()
}

// 查询商品接口，后续修改

onMounted(() => {
  getItem()
})
</script>
