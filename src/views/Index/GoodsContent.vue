<template>
  <div style="position: absolute; width: 990px; background-color: #faf9f9; border: 1px solid #faf9f9; border-radius: 20px">
    <div class="guess-your-like">猜你喜欢</div>
    <div class="goods-content">
      <GoodCard v-for="(item, index) in goodsList" :imgSrc="item.imgSrc" :title="item.title" :price="item.price" :linkHref="item.linkHref" class="item"></GoodCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import GoodCard from '../../components/GoodCard.vue'
import SideNav from './SideNav.vue'

const goodsList = ref([
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  },
  {
    imgSrc: 'src/static/img/phone.jpg',
    price: '1000',
    title: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    linkHref: 'http://127.0.0.1:5173/'
  }
])
const goodsInfo = reactive({
  imgSrc: '',
  price: '',
  title: ''
})
</script>

<style scoped lang="scss">
.guess-your-like {
  height: 70px;
  line-height: 70px;
  margin-left: 18px;
  font-weight: 700;
  font-size: 24px;
  color: #333;
}
.goods-content {
  display: flex;
  flex-wrap: wrap;
  width: 990px;
  justify-content: space-around;
  transition: background box-shadow 0.3s ease;

  .item {
    margin: 5px 1px;
    border-radius: 12px;
    flex-basis: 20%;
    background: #faf9f9;
  }

  .item:hover {
    box-shadow: 5px 19px 39px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
}
</style>
