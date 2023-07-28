<!-- 商品详情页 -->
<template>
  <div class="w">
    <TopUI class="w" style="margin-top: 50px"></TopUI><br /><br />

    <n-breadcrumb separator=">">
      <n-breadcrumb-item href="/">主页</n-breadcrumb-item>
      <n-breadcrumb-item href="/search">商品列表</n-breadcrumb-item>
      <n-breadcrumb-item>商品详情页</n-breadcrumb-item> </n-breadcrumb
    ><br />

    <div class="content">
      <n-layout has-sider>
        <!-- 左边图片布局 -->
        <n-layout-sider :native-scrollbar="false" width="300px" bordered>
          <image-show style="border: 1 solid #fff; border-radius: 20px 0 0 0" :imageUrls="res.goodsPhotos"></image-show>
          <n-layout-content content-style="padding: 24px;">
            <div align="left">
              <font color="grey">发布时间 {{ res.releaseTime }}</font>
            </div>
            <br /><br />
            <!-- 发布人信息 -->
            <router-link :to="userLink" target="_blank">
              <n-space horizon align-items="center">
                <img :src="seller.userPhoto" alt="" style="display: inline-block; width: 25px; height: 25px; border-radius: 90%" />
                <div>{{ seller.userName }}</div>
              </n-space>
            </router-link>
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
    </div>
    <!-- 下面的信息 -->
    <n-layout>
      <n-card>
        <n-tabs type="line" animated size="large" justify-content="space-evenly">
          <n-tab-pane name="image" tab="图片">
            <img class="w" v-for="(item, index) in res.goodsPhotos" :src="item" alt="" :key="index" style="display: block; width: 700px; margin: 0 auto" />
          </n-tab-pane>
          <n-tab-pane name="comments" tab="评价">
            <n-input type="textarea" v-model:value="commentValue" placeholder="请输入评价"></n-input>
            <n-button type="info" @click="comment">发布</n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
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

.content {
  border: 10px solid #fff;
  border-radius: 20px;
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
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const message = inject('message')

// 获取当前商品id
const goodsId = route.params.goodsId
provide('goodsId', goodsId)

let res = reactive({})
let seller = reactive({})
let userLink = ref('')
let commentValue = ref('')
// 发布评价
const comment = async () => {
  loadingBar.start()
  let res = await axios.put('goods/comment', {
    goodsId: goodsId,
    goodsCommentContent: commentValue.value
  })
  console.log(res);
  if (res.data.code == 1) {
    loadingBar.finish()
    message.success('评价成功')
    commentValue.value = ''
  } else {
    loadingBar.error()
    message.error(res.data.msg)
  }
}

const getSeller = async () => {
  console.log(res.sellerId)
  let response = await axios.get(`other/${res.sellerId}`)
  console.log(response)
  if (response.data.code == 1) {
    seller = response.data.data
    userLink.value = '/otherUser/' + seller.userId
  }
}

const getItem = async () => {
  loadingBar.start()
  console.log(goodsId)
  const response = await axios.get(`/goods`, {
    params: {
      goodsId: goodsId
    }
  })
  console.log(response)
  if (response.data.code == 1) {
    try {
      const goodsPhotosString = response.data.data.goodsPhotos.replace(/\\/g, '')
      const goodsPhotosArray = JSON.parse(goodsPhotosString)
      response.data.data.goodsPhotos = goodsPhotosArray
      response.data.data.releaseTime = response.data.data.releaseTime.toString().split('T').join(' ')
      Object.assign(res, response.data.data)
      console.log(res)
    } catch (error) {
      console.log()
    }
    loadingBar.finish()
  } else {
    loadingBar.error()
  }
  getSeller()
}

// 查询商品接口，后续修改

onMounted(() => {
  getItem()
})
</script>
