<template>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :size="size"
      :style="{
        maxWidth: '990px'
      }"
    >
      <!-- 商品名称 -->
      <n-form-item label="商品名称" path="goodsName">
        <n-input v-model:value="model.goodsName" placeholder="Input" autosize style="min-width: 50%"/>
      </n-form-item>

      <!-- 商品类别 -->
      <n-form-item label="商品种类" path="goodsCategoryName">
        <n-select :style="{ width: '20%' }"
          v-model:value="model.goodsCategoryName"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>

      <!-- 商品原价 -->
      <n-form-item label="商品原价" path="oriPrice"> 
        <n-input-number v-model:value="model.oriPrice" round min="0" :style="{ width: '20%' }" :show-button="false" >
          <template #suffix>元</template>
        </n-input-number>
      </n-form-item>

      <!-- 商品现价 -->
      <n-form-item label="商品现价" path="curPrice">
        <n-input-number v-model:value="model.curPrice" round min="0" :style="{ width: '20%' }" :show-button="false" >
          <template #suffix>元</template>
        </n-input-number>
      </n-form-item>

      <!-- 数量 -->
      <n-form-item label="商品数量" path="inventory">
        <n-input-number v-model:value="model.inventory" round min="1" :style="{ width: '20%' }" />
      </n-form-item>

      <!-- 添加商品图片 -->
      <n-form-item label="商品图片" path="images">
        <n-upload
          action="http://127.0.0.1:8080/upload/goodsImgs"
          :headers="{
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjg5OTkxMzI5LCJzdGF0dXMiOjF9.YocoP1iIUZJ2-lnJxFVhb40rEPW4UWy3Z1UGqD8u4N4', 
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
            'Accept': '*/*', 
            'Host': '127.0.0.1:8080', 
            'Connection': 'keep-alive', 
            'Content-Type': 'multipart/form-data; boundary=--------------------------712828546858093971275062', 
          }"
          
          :file-list="fileList"
          list-type="image-card"
          :on-change="fileListChange"
          @preview="imagePreviewFun"
          max=6
        /><!-- :custom-request="customRequest" -->

        <!-- 预览 -->
        <n-modal
          v-model:show="showModal"
          preset="card"
          style="width: 400px"
          title="上传的图片"
        ><img :src="previewImageUrl" style="width: 100%"></n-modal>
      </n-form-item>

      <!-- 商品描述 -->
      <n-form-item label="商品描述" path="goodsInfo">
        <n-input :style="{ width: '80%' }"
          v-model:value="model.goodsInfo"
          placeholder="Textarea"
          maxlength="30" show-count
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>
      <!-- 提交 -->
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="success" @click="releaseGood">发布商品</n-button>
      </div>
    </n-form>
    <!-- model的商品信息 -->
    <pre>{{ JSON.stringify(model, null, 2) }}
    </pre>
  
</template>


<script>
  import { defineComponent, ref,inject } from "vue";
  import { useMessage } from "naive-ui";
  import axios from 'axios'
  export default defineComponent({
    setup() {
      // 图片放大
      const showModalRef = ref(false);
      const previewImageUrlRef = ref("");
      function imagePreviewFun(file) {
        const { url } = file;
        previewImageUrlRef.value = url;
        showModalRef.value = true;
      }

      // 表单
      const formRef = ref(null);
      const message = useMessage(); //  弹窗展示
      // 上传图片
      
      let fileList=ref([
          {id: "react",name: "1.png",status: "finished",url: "https://www.naiveui.com/assets/naivelogo-93278402.svg"},
          //{id: "vue",name: "2.png",status: "finished",url: "https://ts1.cn.mm.bing.net/th/id/R-C.bdb2ecf91f2f3a7402a6d01f223dd7a5?rik=9u045%2fPpr9CmWw&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0717%2fbingo9.jpg&ehk=sHQD5PWoRdNaAGKqmA%2bbJPUhmrqQccQi68eTOlnF%2f6c%3d&risl=&pid=ImgRaw&r=0"}
        ]);

      return {
        formRef,
        size: ref("medium"),
        model: ref({
          goodsName: null, //  商品名
          goodsInfo: null,  //  商品描述
          goodsCategoryName: null,  //  商品种类
          oriPrice:0,
          curPrice:0,
          inventory:1, //  数量
          images:[],
        }),
        // 商品类别下拉选项
        generalOptions: ["吃的", "喝的", "用的"].map(
          (v) => ({
            label: v,
            value: v
          })
        ),
        
        // 输入类别效验，*
        rules: {
          // 商品名
          goodsName: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入商品名"
          },
          // 描述
          goodsInfo: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入商品的详细描述"
          },
          // 种类
          goodsCategoryName: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择商品的种类"
          },
          // 原价
          oriPrice: {
            type: "number",
            required: false,
            trigger: ["blur", "change"],
            message: "请输入商品原价"
          },
          // 现
          curPrice: {
            type: "number",
            required: true,
            trigger: ["blur", "change"],
            message: "请输入商品价格"
          },

          // 数量
          inventory: {
            type: "number",
            required: true,
            trigger: ["blur", "change"],
            message: "请输入对应的数量、价格"
          },
          images:{
            required:true
          }
        },

        // 提交按钮
        releaseGood(e) {
          e.preventDefault();
          formRef.value?.validate((errors) => {
            if (!errors) {
              // 发布商品
              releaseGood();
              message.success("发布成功");
            } else {
              console.log(errors);
              message.error("发布失败，请重试");
            }
          });
        },

        // 图片
        imagePreviewFun,
        showModal: showModalRef,
        previewImageUrl: previewImageUrlRef,
        fileList,

        async fileListChange({file}){
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjkwMDE2MDg2LCJzdGF0dXMiOjF9.Sb07mmrDNE5rE74umLux-pZwZ9CWTfVWfstAiRTqHZM' // 你的token
            const goodsId = '1' // 你的goodsId
            const photos =file;

            try {
              const response = await axios.post('upload/goodsImgs', { goodsId, photos}, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              console.log(response.data)
            } catch (error) {
              console.error(error)
            }
        },


      };
    }
  });
  </script>




