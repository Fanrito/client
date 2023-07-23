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
        <n-input-number min="1" v-model:value="select_count" clearable />
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
import axios from "axios";
export default defineComponent({
    setup() {
        const message = useMessage();
        window.$dialog = useDialog();
        let select_count=ref(0)
        return {
            // 商品数量
            select_count,
            // 立即购买
            BuyNow(){
                window.$dialog.info({
                        title: "提示",
                        content: "你确定要将此购买此商品吗？",
                        positiveText: "确定",
                        negativeText: "取消",
                        onPositiveClick: async() => {
                            const urlParams = new URLSearchParams(window.location.search);
                            const goodsId = urlParams.get('goodsId');
                            try{
                                const response = await axios.post('/goods/purchase', {
                                    goodsId: goodsId,
                                    orderNum:select_count.value
                                });
                                if(response.data.code===1){
                                    message.success("完成购买");
                                }else{
                                    message.error("出错");
                                }
                            }catch(error){
                                console.log(error);
                            }
                        },
                        onNegativeClick: () => {
                            message.error("取消购买");
                        }
                });
            },
            // 添加到购物车
            AddToCarConfirm() {
                window.$dialog.info({
                    title: "提示",
                    content: "你确定要将此物品加入购物车吗？",
                    positiveText: "确定",
                    negativeText: "取消",
                    // 点击事件
                    onPositiveClick: async() => {
                        // 添加到购物车
                        const urlParams = new URLSearchParams(window.location.search);
                        const goodsId = urlParams.get('goodsId');
                        try {
                            const response = await axios.put('/goods/cart', {
                                goodsId: goodsId,
                                collectNum: select_count.value
                            });
                            // 处理响应数据
                            console.log(response.data);
                            if(response.data.code===1){
                                message.success("成功物品加入购物车");
                            }else if(response.data.code===0){
                                message.error("已将物品加入购物车，请不要重复加入");
                            }else{
                                message.error("出错");
                            }
                        } catch (error) {
                            // 处理错误
                            console.error(error);
                        }
                    },
                    onNegativeClick: () => {
                        message.error("取消加入");
                    }
                });
            },

            address_value: ref('请选择你的地址'),
            address_options: [
                { label: "翔安芙蓉", value: "翔安芙蓉", },
                { label: "翔安国光", value: "翔安国光" },
                { label: "翔安映雪", value: "翔安映雪" },
            ],
            kind_value: ref(null),
            kinds_nums: [
                {value: "1",label: "种类1"},
                {value: "2",label: "种类2"},
            ].map((s) =>{
                s.value = s.value.toLowerCase();
                return s;
            }),
        }
    }
});
</script>