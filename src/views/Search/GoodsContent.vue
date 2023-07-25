<template>
  <div style="position: relative; width: 990px; background-color: #faf9f9; border: 1px solid #faf9f9; border-radius: 20px">
    <div class="goods-content">
      <GoodCard v-for="(item, index) in goodsList" :imgSrc="item.imgSrc" :title="item.goodsName + item.goodsProfile" :price="item.curPrice" :linkHref="item.linkHref" class="item" :oriPrice="item.oriPrice" :publishTime="item.releaseTime"></GoodCard>
    </div>
    <div ref="scrollObserver"></div>
    <SideNav :style="{ position: 'absolute', top: sideNavTop + 'px', left: sideNavLeft + 'px' }"></SideNav>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, inject, watch } from 'vue'
import GoodCard from '../../components/GoodCard.vue'
import SideNav from './SideNav.vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const router = useRouter()
const route = useRoute()
const axios = inject('axios')

const goodsTypes = ['数码', '文具', '图书', '服装', '医疗', '食品', '娱乐', '美妆', '代步', '生活', '虚拟', '其他']

// 商品信息数组，需要渲染到页面上
const goodsList = ref([])
const page = ref(0)

const scrollTop = ref(0)
const goodsContentOffset = ref(0)

// 监听页面滚动事件，并更新滚动位置和 GoodsContentVue 的偏移量
onMounted(() => {
  window.addEventListener('scroll', updateScrollTop)
  updateGoodsContentOffset()

  loadGoods()
})

// 监听 $route 对象的 params 属性
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    // 在参数发生变化时执行回调函数
    window.location.reload()
  }
)

// 从后端获取商品信息
const loadGoods = async () => {
  loadingBar.start()
  let res = await axios.post(`/goods/all`, {
    page: page.value,
    pageSize: 4,
    goodsName: route.query.goodsName,
    goodsCategoryName: goodsTypes[route.query.goodsCategoryId]
  })
  console.log(res)
  if (res.data.code == 1) {
    res.data.data.rows.map(item => {
      const goodsPhotosString = item.goodsPhotos.replace(/\\/g, '')
      const goodsPhotosArray = JSON.parse(goodsPhotosString)
      let goodsInfo = {
        imgSrc: goodsPhotosArray[0],
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        oriPrice: item.oriPrice == null ? '' : item.oriPrice,
        curPrice: item.curPrice,
        goodsCategoryName: item.goodsCategoryName,
        releaseTime: item.releaseTime,
        inventory: item.inventory,
        goodsProfile: item.goodsProfile,
        linkHref: `/detail/${item.goodsId}`
      }
      goodsList.value.push(goodsInfo)
    })
    loadingBar.finish()
  }
}

// 当页面滚动到底部时触发请求更多商品数据的逻辑
const observeScroll = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchMoreProducts()
      }
    })
  }, options)

  const scrollObserver = ref(null)

  onMounted(() => {
    if (scrollObserver.value) {
      observer.observe(scrollObserver.value)
    }
  })

  return {
    scrollObserver
  }
}

const { scrollObserver } = observeScroll()

const fetchMoreProducts = async () => {
  page.value++
  loadGoods()
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
  return -180
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
