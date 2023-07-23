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
        <image-show :imageUrls="res.data[0].goodsPhoto"></image-show>

        <n-layout-content content-style="padding: 24px;">
          <div align="left">
            <font color="grey">发布时间 {{ res.data[0].releaseTime.split('T').join(' ') }}</font>
          </div>
          <br /><br />
          <n-space horizon align-items="center">
            <n-avatar size="medium" :src="seller_img"></n-avatar>
            <div>发布人ID{{ res.data[0].sellerId }}</div>
          </n-space>
          <br /><br />
          <n-rate readonly :default-value="3"></n-rate>
        </n-layout-content>
      </n-layout-sider>

      <!-- 右边商品详情 -->
      <n-layout>
        <n-layout-header bordered>
          <div align="left">
            <font color="grey">商品编号：{{ res.data[0].goodsId }}</font>
          </div>
          <h3>{{ res.data[0].goodsName }}</h3>
          <!-- 商品价格 -->
          <h3 font-size="26">
            <font color="red">
              <n-tag :bordered="false" type="error">惊喜价</n-tag>
              ￥{{ res.data[0].curPrice }}
              <del>￥{{ res.data[0].oriPrice }}</del>
            </font>
          </h3>
          <div align="right">
            <font color="grey">库存 {{ res.data[0].inventory }}</font>
          </div>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <!-- <Bottom></Bottom><br><br> -->
          <h4>商品描述</h4>
          <n-space>
            <n-tag :bordered="false" type="success">分类：{{ res.data[0].goodsCategoryName }}</n-tag>
          </n-space>
          <p>{{ res.data[0].goodsProfile }}</p>
        </n-layout-content>
        <n-layout-footer bordered>
          <NDialogProvider>
            <InfoChoose></InfoChoose>
          </NDialogProvider>
        </n-layout-footer>
      </n-layout>
    </n-layout>

    <!-- 下面的评价信息 -->
    <n-layout>
      <n-divider />
      <n-button type="success">评价(10)</n-button>
      <br />
      <n-card title="用户1" size="medium">评价1</n-card>
      <n-card title="用户2" size="medium">评价2</n-card>
      <br />
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

let res = reactive({
  code: 1,
  msg: 'success',
  data: [
    {
      goodsId: '100000',
      goodsName: '笔记本',
      oriPrice: '30',
      curPrice: '10',
      goodsCategoryName: '图书',
      sellerId: '33',
      releaseTime: '2022-09-01T23:06:29',
      inventory: '3000',
      goodsProfile: '这个东西很好',
      goodsPhoto: [
        'https://img12.360buyimg.com/n1/jfs/t1/143936/32/30842/64747/6454ce5cF6b1adc51/065b11723a5094fb.jpg',
        'https://th.bing.com/th/id/R.f7ed7e216a92f91882f100a2581b9ac6?rik=7y4ciD%2bJL3VuVg&pid=ImgRaw&r=0',
        'https://th.bing.com/th/id/OIP.caoz0WhiAKT7-PfdN0S4dAHaE8?pid=ImgDet&w=800&h=535&rs=1',
        'https://th.bing.com/th/id/OIP.QwUNM329lhtfEI60_kjnbgHaDF?pid=ImgDet&w=750&h=312&rs=1'
      ] //
    }
  ]
})

let seller_img = ref('')
const getSellerImg = async () => {
  let response = await axios.get(`other/${res.data[0].sellerId}`)
  if(response.data.code == 1) {
    seller_img = response.data.data.userPhoto
  }
}

const getItem = async () => {
  const response = await axios.post(`/goods`, {
    goodsId
  })
  console.log(response)
  if(response.data.code == 1) {
    Object.assign(res, response.data)
  }
}

// 查询商品接口，后续修改

onMounted(() => {
  getItem()
  getSellerImg()
})

</script>
