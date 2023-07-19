<template>
  <div style="position: relative; width: 990px; background-color: #faf9f9; border: 1px solid #faf9f9; border-radius: 20px">
    <div class="guess-your-like"><span>猜你喜欢</span><img src="../../static/img/reconmand.png" alt="" /></div>
    <div class="goods-content">
      <GoodCard v-for="(item, index) in goodsList" :imgSrc="item.imgSrc" :title="item.goodsName + item.goodsProfile" :price="item.curPrice" :linkHref="item.linkHref" class="item"></GoodCard>
    </div>
    <SideNav :style="{ position: 'absolute', top: sideNavTop + 'px', left: sideNavLeft + 'px' }"></SideNav>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import GoodCard from '../../components/GoodCard.vue'
import SideNav from './SideNav.vue'

// 商品信息数组，需要渲染到页面上
const goodsList = ref([
  {
    imgSrc: 'src/static/img/phone.jpg',
    curPrice: '1000',
    goodsName: '华为 HUAWEI P30/P30 pro  麒麟980 二手手机 95新成色 天空之境(P30 Pro) 8G+128G',
    goodsProfile: '',
    linkHref: 'http://127.0.0.1:5173/'
  }
])

const scrollTop = ref(0)
const goodsContentOffset = ref(0)

// 监听页面滚动事件，并更新滚动位置和 GoodsContentVue 的偏移量
onMounted(() => {
  window.addEventListener('scroll', updateScrollTop)
  updateGoodsContentOffset()

  // loadGoods()
})

// 从后端获取商品信息
const loadGoods = async () => {
  let res = await axios.get(`/goods/all`)
  console.log(res)
  let temp_rows = res.data.data.rows
  for (let row of temp_rows) {
    let d = new Date(row.releaseTime)
    row.releaseTime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }
  goodsList.value = temp_rows
}

function updateScrollTop() {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

function updateGoodsContentOffset() {
  const goodsContent = document.querySelector('.goods-content')
  goodsContentOffset.value = goodsContent ? goodsContent.offsetTop : 0
}

// 使用计算属性计算 sideNavTop 和 sideNavLeft 的值
const sideNavTop = computed(() => {
  return Math.max(scrollTop.value - goodsContentOffset.value, 0)
})

const sideNavLeft = computed(() => {
  return -240
})
</script>

<style scoped lang="scss">
.guess-your-like {
  display: flex;
  align-items: center;
  height: 70px;
  line-height: 70px;
  margin-left: 18px;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  span {
    display: inline-block;
  }
  img {
    display: inline-block;
    height: 20px;
    margin: 4px 0 0 6px;
  }
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
