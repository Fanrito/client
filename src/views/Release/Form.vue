<template>
  <!-- 表单 -->
  <n-form ref="formRef" :model="goodsInfo" :rules="rules" label-placement="top" label-width="auto"
      require-mark-placement="right-hanging" size="large" :style="{maxWidth: '990px'}" class="form_style" round>
  
    <!-- 商品名称 -->
    <n-form-item label="商品名称" path="goodsName">
      <n-input v-model:value="goodsInfo.goodsName" placeholder="Input" autosize style="min-width: 50%" />
    </n-form-item>

    <!-- 商品类别 -->
    <n-form-item label="商品种类" path="goodsCategoryName">
      <n-select :style="{ width: '20%' }" v-model:value="goodsInfo.goodsCategoryName" placeholder="Select"
        :options="generalOptions" />
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
    <n-form-item label="商品图片" path="images">
      <!-- :on-change="fileListChange"  -->
      <n-upload action="http://127.0.0.1:8080/upload/goodsImgs" 
                :file-list="fileList" 
                list-type="image-card"
                :custom-request="imageCustomUpload"
                @preview="imagePreviewFunction" 
                max=6 />

      <!-- 照片墙预览功能 -->
      <n-modal v-model:show="showModal" preset="card" style="width: 400px" title="上传的图片"><img :src="previewImageUrl"
          style="width: 100%"></n-modal>
    </n-form-item>

    <!-- 商品描述 -->
    <n-form-item label="商品描述" path="goodsDescription">
      <n-input :style="{ width: '100%' }" v-model:value="goodsInfo.goodsDescription" placeholder="Textarea" maxlength="30"
        show-count type="textarea" :autosize="{
          minRows: 3,
          maxRows: 5
        }" />
    </n-form-item><br>
    <!-- 提交 -->
    <div style="display: flex; justify-content: flex-end">
      <n-button round type="success" @click="releaseGood">发布商品</n-button>
    </div>
  </n-form>
  <!-- model的商品信息 -->
  <!-- <pre>{{ JSON.stringify(goodsInfo, null, 2) }}</pre> -->
</template>


<script>
import { defineComponent, ref, inject } from "vue";
import { useMessage } from "naive-ui";
import axios from 'axios'
import { UserStore } from "../../stores/UserStore";

export default defineComponent({
  setup() {
    // 图片预览
    const showModalRef = ref(false);
    const previewImageUrl = ref("");
    function imagePreviewFunction(file) {
      const { url } = file;
      previewImageUrl.value = url;
      showModalRef.value = true;
    }

    // 表单
    const formRef = ref(null);  //  表单项用于校验
    const message = useMessage();
    // 上传图片

    let fileList = ref([
      { id: "react", name: "1.png", status: "finished", url: "https://www.naiveui.com/assets/naivelogo-93278402.svg" },
      { id: "vue",name: "2.png",status: "finished",url: "https://ts1.cn.mm.bing.net/th/id/R-C.bdb2ecf91f2f3a7402a6d01f223dd7a5?rik=9u045%2fPpr9CmWw&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0717%2fbingo9.jpg&ehk=sHQD5PWoRdNaAGKqmA%2bbJPUhmrqQccQi68eTOlnF%2f6c%3d&risl=&pid=ImgRaw&r=0"}
    ]);


    let goodsInfo = ref({
      goodsName: null, //  商品名
      oriPrice: 0,
      curPrice: 0,
      goodsCategoryName: null,  //  商品种类
      inventory: 1, //  数量
      goodsDescription: null,  //  商品描述
      images: [] //  图片的url列表
    });
    const userStore = UserStore();

    return {
      formRef,  //  表单项用于校验
      goodsInfo, // 提交的商品信息列表
      // 商品类别下拉选项
      generalOptions: ['数码', '文具', '图书', '服装', '医疗', '食品', '娱乐', '美妆', '代步', '生活', '虚拟', '其他'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),

      // 输入效验
      rules: {
        // 商品名
        goodsName: { required: true, trigger: ["blur", "input"], message: "请输入" },
        // 描述
        goodsDescription: { required: true, trigger: ["blur", "input"], message: "请输入商品的详细描述" },
        // 种类
        goodsCategoryName: { required: true, trigger: ["blur", "change"], message: "请选择商品的种类" },
        // 原价
        oriPrice: { type: "number", required: false, trigger: ["blur", "change"], message: "请输入商品原价" },
        // 现价
        curPrice: { type: "number", required: true, trigger: ["blur", "change"], message: "请输入商品价格" },
        // 数量
        inventory: { type: "number", required: true, trigger: ["blur", "change"], message: "请输入对应的数量" },
        images: { required: false }
      },

      // 提交
      releaseGood(e) {
        e.preventDefault();
        // 输入校验
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            // 校验成功发布商品
            // goodsInfo.value.images=fileList;
            console.log(goodsInfo)
            let result = await axios.post('/user/release', goodsInfo, {
              headers: { token: userStore.token }
            })
            console.log(result)

            if (result.data.code == 1) {
              message.info('发布成功')
              router.push('/user')
            } else {
              message.error('发布失败')
            }
          } else {
            console.log(errors);
            message.error("输入不合法，请修改");
          }
        });
      },

      // 图片预览函数
      imagePreviewFunction,
      showModal: showModalRef, // 是否展示预览图片
      previewImageUrl: previewImageUrl, //  预览图片的url
      fileList, //  文件列表
      //  自定义上传文件方法
      imageCustomUpload(file){
        
      }
    };
  }
});
</script>


<style>
.form_style{
  margin-left: 80px;
  margin-right: 80px;
}
</style>

