<template>
    <n-space vertical>
        <!-- 商品种类选择 -->
        <div display:='inline-block'>选择商品种类</div>
        <n-space vertical>
            <n-radio-group v-model:value="kind_value" name="radiobuttongroup1">
                <n-radio-button v-for="song in kinds_nums" :key="song.value" :value="song.value" :label="song.label" />
            </n-radio-group>
        </n-space><br>
        <!-- 地址选择框 -->
        <div display:='inline-block'>选择地址</div>
        <n-select v-model:value="address_value" :options="address_options" /><br>
    </n-space>
    <div display:='inline-block'>选择商品数量</div>
    <n-space horizon align='center'>
        <!-- 添加商品数量 -->    
        <n-input-number min="0" v-model:value="select_count" clearable />
        <!-- 加入购物车按钮 -->
        <n-dialog-provider>
            <n-button @click="BuyNow" type="error" icon-placement='right'>立即购买</n-button>
            <n-text>&emsp;</n-text>
            <n-button @click="AddToCarConfirm" type="info" icon-placement='right'>加入购物车</n-button>
        </n-dialog-provider>
    </n-space>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage, useDialog } from "naive-ui";

export default defineComponent({
    setup() {
        const message = useMessage();
        window.$dialog = useDialog();
        return {
            select_count:ref(0),
            BuyNow(){
                window.$dialog.info({
                        title: "提示",
                        content: "你确定要将此购买此商品吗？",
                        positiveText: "确定",
                        negativeText: "取消",
                        onPositiveClick: () => {
                            message.success("确定购买");
                        },
                        onNegativeClick: () => {
                            message.error("取消购买");
                        }
                    });
            },
            AddToCarConfirm() {
                window.$dialog.info({
                    title: "提示",
                    content: "你确定要将此物品加入购物车吗？",
                    positiveText: "确定",
                    negativeText: "取消",
                    onPositiveClick: () => {
                        message.success("已将物品加入购物车");
                    },
                    onNegativeClick: () => {
                        message.error("取消加入");
                    }
                });
            },

            address_value: ref('请选择你的地址'),
            address_options: [
                { label: "翔安芙蓉", value: "marina bay sands", },
                { label: "翔安国光", value: "brown's hotel, london" },
                { label: "翔安映雪", value: "atlantis nahamas, nassau" },
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