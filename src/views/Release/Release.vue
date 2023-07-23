<script setup>
import {ref,onMounted,reactive} from 'vue';
// import Steps from './Steps.vue';
import Form from './Form.vue';

import TopUI from '../Index/TopNav.vue'
</script>


<template>
    
    <div class="my_style">
    <!-- <Steps/> -->
    <!-- <ImageUpLoad/> -->
        <TopUI class="my_style" style="margin-top: 50px"/><br><br>
        <!-- <Steps/><br> -->
        <n-layout round>
            <br/>
            <h2 style="margin-left: 80px;">商品发布</h2>
            <br/>
            <Form/><br><br>
        </n-layout>

    </div>
</template>


<style>
.my_style{
  width: 990px;
  margin: 0 auto; 
}
</style>

