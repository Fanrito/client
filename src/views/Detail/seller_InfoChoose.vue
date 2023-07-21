<template>
    <n-space vertical>
        <!-- 商品种类选择
        <div display:='inline-block'>选择商品种类</div>
        <n-space vertical>
            <n-radio-group v-model:value="kind_value" name="radiobuttongroup1">
                <n-radio-button v-for="song in kinds_nums" :key="song.value" :value="song.value" :label="song.label" />
            </n-radio-group>
        </n-space><br> -->
        <!-- 地址选择框 -->
        <div display:='inline-block'>选择商品类别</div>
        <n-select v-model:value="category_value" :options="category_options" :disabled="edit_disabled" /><br>
    </n-space>
    <div display:='inline-block'>商品库存</div>
    <n-space horizon align='center'>
        <!-- 添加商品数量 -->    
        <n-input min="0" :value="inventory"  @input="setInventory"  clearable :disabled="edit_disabled"/>
        <!-- 加入购物车按钮 -->
        <n-dialog-provider>
            <n-button @click="BuyNow" type="error" icon-placement='right' >下架</n-button>
            <n-text>&emsp;</n-text>
            <n-button @click="Edit" type="info" icon-placement='right'>管理</n-button>
            <n-text>&emsp;</n-text>
            <n-button @click="confirm" type="primary" icon-placement='right' :disabled="edit_disabled">确认</n-button>
        </n-dialog-provider>
    </n-space>
</template>

<script>
import { defineComponent, ref,inject } from "vue";
import { defineProps } from 'vue'
import { useMessage, useDialog } from "naive-ui";
const axios = inject('axios');
export default defineComponent({ props: {
    inventory: {
      type: Number,
      required: true
    }
  },
    setup(props,{emit}) {
        var edit_disabled=ref(true);
        const setInventory = (value) => {
            console.log("hehe")
      // 在这里可以通过调用父组件传递的 `emit` 方法通知父组件更新 `inventory` 属性
      emit('update_inventory', value)
      };
        console.log(props.inventory)
        const message = useMessage();
        window.$dialog = useDialog();
        return {
            edit_disabled,
            axios,
            setInventory,
            props,defineProps,
            select_count:ref(0),
            BuyNow(){
                window.$dialog.info({
                        title: "提示",
                        content: "你确定要将下架商品吗？",
                        positiveText: "确定",
                        negativeText: "取消",
                        onPositiveClick: () => {
                            message.success("下架成功");
                        },
                        onNegativeClick: () => {
                            message.error("取消下架");
                        }
                    });
            },
            Edit() {
                edit_disabled.value=false;
                emit('edit', edit_disabled)
            },
            confirm(){
                edit_disabled.value=true;
                emit('confirm',edit_disabled)
            },
            category_value: ref('请选择商品所属类别'),
            category_options: [
                { label: "日用品", value: "marina bay sands", },
                { label: "书籍", value: "brown's hotel, london" },
                { label: "虚拟产品", value: "atlantis nahamas, nassau" },
            ],
            kind_value: ref(null),
            kinds_nums: [
                {value: "1",label: "种类1"},
                {value: "2",label: "种类2"},
                {value: "3",label: "种类3"},
                {value: "4",label: "种类4"},
            ].map((s) =>{
                s.value = s.value.toLowerCase();
                return s;
            }),
        }
    }
});
</script>