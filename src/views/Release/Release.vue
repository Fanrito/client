<script setup>
import {ref,onMounted,reactive} from 'vue';
import Steps from './Steps.vue';
import Form from './Form.vue';

import TopUI from '../Index/TopNav.vue'
</script>


<template>
    
    <div class="my_style">
    <!-- <Steps/> -->
    <!-- <ImageUpLoad/> -->
        <TopUI class="my_style" style="margin-top: 50px"/><br>
        <Steps/><br>
        <n-layout round>
            <br/><br/>
            <Form class="main"/>
        </n-layout>

    </div>
</template>


<style>
.my_style{
  width: 990px;
  margin: 0 auto; 
}

/* .main{
    width:800px;
    margin: 40 auto;
    align-items: center;
} */
</style>

