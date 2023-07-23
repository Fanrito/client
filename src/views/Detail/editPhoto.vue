<template>
<n-layout has-sider style="width: 50%;margin: auto;margin-top: 100px;height: 600px;">
    <n-layout-sider content-style="padding: 24px;" :native-scrollbar="false" width="600px" bordered>
      上传商品照片
      <br/>
      <br/>
      <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    default-upload=false
    list-type="image-card"
  >
    点击上传
  </n-upload>
  <n-divider />

  <n-carousel :slides-per-view="3" :space-between="20" :loop="false" draggable>
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >

  </n-carousel>



    </n-layout-sider>
    <n-layout>
      <n-layout-header>
   
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <n-button @click="exit">确认</n-button>
      </n-layout-content>
      <n-layout-footer>请上传商品图片</n-layout-footer>
    </n-layout>
  </n-layout>

</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UploadFileInfo } from 'naive-ui'
import router from '../../router'

export default defineComponent({
  setup () {
    function exit(){router.push('/seller_detail')}
    const showModalRef = ref(false)
    const previewImageUrlRef = ref('')
    function handlePreview (file: UploadFileInfo) {
      const { url } = file
      previewImageUrlRef.value = url as string
      showModalRef.value = true
    }
    return {
      handlePreview,
      exit,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      //把商品ID传给后端，后端传回来的图片显示在屏幕上，点击确认后，把fileList的图片传给后端？
    //   goodsPhoto:ref<UploadFileInfo[]>([
    //               "https://img12.360buyimg.com/n1/jfs/t1/143936/32/30842/64747/6454ce5cF6b1adc51/065b11723a5094fb.jpg",
    //               "https://th.bing.com/th/id/R.f7ed7e216a92f91882f100a2581b9ac6?rik=7y4ciD%2bJL3VuVg&pid=ImgRaw&r=0",
    //               "https://th.bing.com/th/id/OIP.caoz0WhiAKT7-PfdN0S4dAHaE8?pid=ImgDet&w=800&h=535&rs=1",
    //               "https://th.bing.com/th/id/OIP.QwUNM329lhtfEI60_kjnbgHaDF?pid=ImgDet&w=750&h=312&rs=1"
    //         ]),

      fileList: ref<UploadFileInfo[]>([
        {
          id: 'a',
          name: '我是上传出错的普通文件.png',
          status: 'error'
        },
        {
          id: 'b',
          name: '我是普通文本.doc',
          status: 'finished',
          type: 'text/plain'
        },
        {
          id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'd',
          name: '我是上传进度99%的文本.doc',
          status: 'uploading',
          percentage: 99
        }
      ]),
      previewFileList: ref<UploadFileInfo[]>([
        {
          id: 'react',
          name: '我是react.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'vue',
          name: '我是vue.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        }
      ])
    }
  }
})
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(255, 255, 255, 0.2);
  padding: 24px;
  
}

.n-layout-sider {
  background: rgba(255, 255, 255, 0.3);
}

.n-layout-content {
  background: rgba(250, 250, 250, 0.4);
}

</style>