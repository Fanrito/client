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
      <n-upload @remove="remove" list-type="image-card" :max="6" :default-file-list="fileList" accept="image/png, image/jpeg" @update:file-list="changeFilelist" />
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
      <n-space>
        <n-button round type="error" @click="deleteGood">删除商品</n-button>
        <n-button round type="success" @click="releaseGood">确认修改</n-button>
      </n-space>
    </div>
  </n-form>
  <!-- model的商品信息 -->
  <!-- <pre>{{ JSON.stringify(goodsInfo, null, 2) }}</pre> -->
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import { UserStore } from '../../stores/UserStore'
import { useRouter, useRoute } from 'vue-router'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const router = useRouter()
const route = useRoute()

const goodsId = inject('goodsId')

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

let finalList = [] // 最终的图片文件对象数组
let imgStrList = [] // 最终的图片url数组
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

onMounted(() => {
  loadGoodsInfo()
})

const remove = file => {
  fileList.value.filter(item => item.id != file.file.id)
}

const loadGoodsInfo = async () => {
  loadingBar.start()
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
    for (let i = 0; i < goodsPhotosArray.length; i++) {
      let file = {
        id: `${i}`,
        name: `${i}`,
        status: 'finished',
        url: goodsPhotosArray[i]
      }
      fileList.value.push(file)
    } // 加载图片
    response.data.data.releaseTime = response.data.data.releaseTime.toString().split('T').join(' ')
    Object.assign(goodsInfo, response.data.data)
    finalList = fileList.value
    loadingBar.finish()
  }
}

const uploadPhotos = async () => {
  loadingBar.start()
  var data = new FormData()
  // 先循环一边看看有没有新上传的图片，没有接直接return
  finalList.forEach(item => {
    if (item.url != null) {
      // 如果图片本身已经上传过了，直接把url加入imgStrList
      imgStrList.push(item.url)
    }
  })
  if (imgStrList.length == finalList.length) {
    // 如果没有需要额外上传的图片，就直接上传imgStrList
    console.log(imgStrList)
    upload()
    return
  }
  finalList.forEach(item => {
    if (item.url == null) {
      // 将新上传的图片加入
      data.append('photos', item.file)
    }
  })

  var config = {
    method: 'post',
    url: '/upload/Imgs',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  }
  let res = await axios(config)
  if (res.data.code == 1) {
    message.success('图片上传成功')
    imgStrList.push(...res.data.data)
    upload()
  } else {
    message.error('图片上传失败')
    loadingBar.error()
    if (res.data.msg == 'NOT_LOGIN') {
      message.info('请先登录')
      router.push('/login')
    }
  }
}

const upload = async () => {
  console.log(imgStrList)
  goodsInfo.goodsPhotos = JSON.stringify(imgStrList)
  goodsInfo.releaseTime = goodsInfo.releaseTime.split(' ').join('T')
  const data = JSON.stringify(goodsInfo)
  var config = {
    method: 'patch',
    url: 'user/goods/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  let result = await axios(config)
  console.log(result)
  if (result.data.code == 1) {
    message.success('修改成功')
    loadingBar.finish()
    router.push('/user')
  } else {
    message.error('修改失败')
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

// 删除商品 
const deleteGood = async () => {
  loadingBar.start()
  let res = await axios.delete(`user/goods/${goodsId}`)
  if(res.data.code == 1) {
    loadingBar.finish()
    message.success('删除成功')
    router.push('/user/published')
  } else {
    loadingBar.error()
    message.success('删除失败')
  }
}
</script>

<style>
.form_style {
  margin-left: 80px;
  margin-right: 80px;
}
</style>
