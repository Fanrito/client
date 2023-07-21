<template>
    <div class="top-bar">
      <div class="welcome">欢迎回来</div>
      <div class="links">
        <router-link to="/admin/user" class="black-button" id="user_admin">用户管理</router-link>
        <router-link to="/admin/order" class="black-button"  id="order_admin" >订单管理</router-link>
      </div>
      <div class="actions">
        <!-- <button id="addAdmin" class="black-button" @click="add" >新增用户</button> -->
        <router-link to="/admin/addUser" class="black-button" id="addAdmin">新增用户</router-link>
        <button id="exitAdmin" class="black-button" @click="exit_Admin">退出</button>
      </div>    
  </div> 
  <div class="content-wrapper">
  <!-- 页面内容 -->
</div>
    <router-view></router-view>

    <!-- <div style="width: 1400px;height: 700px;background-color: white;margin: auto;margin-top: 0;"> -->
   
    <!-- </div> -->
</template>

<script setup>    
import { useRouter } from 'vue-router'
const router = useRouter();
const exit_Admin=()=>
{
    console.log("haha")
var button = document.getElementById("exitAdmin");
// 添加样式类，将按钮的背景颜色更改为灰色
button.classList.add("gray-button");
// 1秒后移除样式类，将按钮恢复为原始颜色
    setTimeout(function() {
    button.classList.remove("gray-button");
    }, 400);
    //跳出是否确认退出
    router.push('/')
}

</script>

<style>
.top-bar {
  position:fixed;
  width: 100%;
  top:0;
  background-color: rgb(39, 183, 128);
  display: flex;
  z-index: 9999;
  align-items: center;
  padding: 10px;
  color: white;
}
.content-wrapper {
  margin-top: 50px; /* 根据横条的高度调整值，确保内容与横条不重叠 */
}
.welcome {
  margin-left: 10px;
  margin-right: 20px;
  font-size: 15px;
}
.spacer {
  flex: 1;
  margin-left: 900px; /* 设置和页边距的距离 */
}
.links {
  margin-right: 20px;
}
.link {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
.actions {
  margin-left: auto;
}
.action {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
.link.active {
  color: gray;
}
.black-button {
  text-decoration: none;
  background-color:rgb(39, 183, 128);
  color: white;
  margin-right: 20px;
  transition: background-color 0.3s;
  height:100%;
  font-size: 15px;
  border: none;
}
.gray-button {
  background-color: rgb(23, 145, 72);
  align-items: center;
}
</style>