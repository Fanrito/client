<template>
  <!-- 表单 -->
  <n-form ref="formRef" :model="goodsInfo" :rules="rules" label-placement="top" label-width="auto" require-mark-placement="right-hanging" size="large" :style="{ maxWidth: '990px' }" class="form_style" round>
    <!-- 商品名称 -->
    <n-form-item label="商品名称" path="goodsName">
      <n-input v-model:value="goodsInfo.goodsName" placeholder="请输入商品名称" autosize style="min-width: 50%" />
    </n-form-item>

    <!-- 商品类别 -->
    <n-form-item label="商品种类" path="goodsCategoryName">
      <n-select :style="{ width: '20%' }" v-model:value="goodsInfo.goodsCategoryName" placeholder="请选择商品种类" :options="generalOptions" />
    </n-form-item>

    <!-- 商品原价 -->
    <n-form-item label="商品原价" path="oriPrice">
      <n-input-number v-model:value="goodsInfo.oriPrice" round min="0" :style="{ width: '20%' }" :show-button="false">
        <template #suffix>元</template>
      </n-input-number>
    </n-form-item>

    <!-- 商品现价 -->
    <n-form-item label="商品现价" path="curPrice">
      <n-input-number v-model:value="goodsInfo.curPrice" round min="0" :style="{ width: '20%' }" :show-button="false">
        <template #suffix>元</template>
      </n-input-number>
    </n-form-item>

    <!-- 数量 -->
    <n-form-item label="商品数量" path="inventory">
      <n-input-number v-model:value="goodsInfo.inventory" round min="1" :style="{ width: '20%' }" />
    </n-form-item>

    <!-- 照片墙，添加商品图片 -->
    <n-form-item label="商品图片" path="goodsImg">
      <n-upload list-type="image-card" :max="6" :default-file-list="fileList" accept="image/png, image/jpeg" @update:file-list="changeFilelist" />
    </n-form-item>

    <!-- 商品描述 -->
    <n-form-item label="商品描述" path="goodsProfile">
      <n-input
        :style="{ width: '100%' }"
        v-model:value="goodsInfo.goodsProfile"
        placeholder="描述一下你的宝贝吧~"
        maxlength="30"
        show-count
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      /> </n-form-item
    ><br />
    <!-- 提交 -->
    <div style="display: flex; justify-content: flex-end">
      <n-button round type="success" @click="releaseGood">发布商品</n-button>
    </div>
  </n-form>
  <!-- model的商品信息 -->
  <!-- <pre>{{ JSON.stringify(goodsInfo, null, 2) }}</pre> -->
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import { UserStore } from '../../stores/UserStore'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()

// 表单
const formRef = ref(null)
const message = useMessage()
let fileList = ref([])

let goodsInfo = reactive({
  goodsName: null,
  oriPrice: 0,
  curPrice: 0,
  goodsCategoryName: null,
  inventory: 1,
  goodsProfile: null,
  goodsPhotos: []
})

const userStore = UserStore()

// 商品类别下拉选项
const generalOptions = ['数码', '文具', '图书', '服装', '医疗', '食品', '娱乐', '美妆', '代步', '生活', '虚拟', '其他'].map(v => ({
  label: v,
  value: v
}))

let finalList = []
const changeFilelist = filelist => {
  finalList = filelist
}

// 输入效验
const rules = {
  goodsName: { required: true, trigger: ['blur', 'input'], message: '请输入' },
  goodsProfile: { required: true, trigger: ['blur', 'input'], message: '请输入商品的详细描述' },
  goodsCategoryName: { required: true, trigger: ['blur', 'change'], message: '请选择商品的种类' },
  oriPrice: { type: 'number', required: false, trigger: ['blur', 'change'], message: '请输入商品原价' },
  curPrice: { type: 'number', required: true, trigger: ['blur', 'change'], message: '请输入商品价格' },
  inventory: { type: 'number', required: true, trigger: ['blur', 'change'], message: '请输入对应的数量' }
}

const uploadPhotos = async () => {
  var data = new FormData()
  finalList.forEach(item => {
    data.append('photos', item.file)
  })
  var config = {
    method: 'post',
    url: '/upload/Imgs',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  }
  loadingBar.start()
  let res = await axios(config)
  console.log(res)
  if (res.data.code == 1) {
    message.success('图片上传成功')
    goodsInfo.goodsPhotos = JSON.stringify(res.data.data)
    console.log(goodsInfo.goodsPhotos)
    upload()
  } else {
    message.error('图片上传失败')
    if (res.data.msg == 'NOT_LOGIN') {
      message.info('请先登录')
      router.push('/login')
    }
  }
}

const upload = async () => {
  let result = await axios.put('/user/release', goodsInfo)
  console.log(result)
  if (result.data.code == 1) {
    loadingBar.finish()
    message.success('发布成功')
    router.push('/user')
  } else {
    loadingBar.error()
    message.error('发布失败')
  }
}

// 提交
const releaseGood = e => {
  e.preventDefault()
  formRef.value?.validate(async errors => {
    if (!errors) {
      // 校验成功
      uploadPhotos()
    } else {
      message.error('输入不合法，请修改')
    }
  })
}
</script>

<style>
.form_style {
  margin-left: 80px;
  margin-right: 80px;
}
</style>
