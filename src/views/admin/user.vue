<template>
  <br />
  <!-- 显示内容区域设置 -->
  <div class="container">
    <!-- 筛选区域 -->
    <div class="search-area">
      <div class="search-header">
        <span class="filter-title">筛选条件</span>
        <span class="search-button">
          <n-button type="primary" suffix-icon="Search" @click="SearchUser" style="margin-top: 0%" size="small">搜索</n-button>
        </span>
      </div>
      <div class="search-content">
        <div class="search-row">
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户名</span>
            <n-input v-model:value="usernameSearch" placeholder="搜索用户名" size="small"></n-input>
          </div>
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户性别</span>
            <n-space vertical>
              <n-select size="small" placeholder="搜索用户性别" style="width: 220px" v-model:value="userGender" :options="options" />
            </n-space>
          </div>
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户昵称</span>
            <n-input v-model:value="nicknameSearch" placeholder="搜索用户昵称" size="small"></n-input>
          </div>
        </div>
        <div class="search-row">
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户邮箱</span>
            <n-input v-model:value="emailSearch" placeholder="搜索用户邮箱" size="small"></n-input>
          </div>
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户手机号</span>
            <n-input v-model:value="phoneSearch" placeholder="搜索用户手机号" size="small"></n-input>
          </div>
          <div class="search-field">
            <span style="width: 35%; margin-left: 20%; text-align: right">用户校区</span>
            <n-select size="small" placeholder="搜索用户校区" v-model:value="campusSearch" :options="options_campus" />
            <!-- <n-input v-model:value="campusSearch" placeholder="搜索用户校区" size="small"></n-input> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 分割区域 -->
    <div style="margin-right: 0px; margin-top: 10px; margin-bottom: 10px; display: flex; align-items: center">
      <n-icon :component="CashOutline" size="30" :depth="3" />
      <div style="font-size: 18px; color: rgb(82, 110, 95); margin-left: 10px">数据列表</div>
      <n-button type="primary" ghost style="margin-left: 1120px" size="small" @click="saveChanges">确认编辑</n-button>
    </div>

    <!-- 表格区域 -->
    <table class="user-table">
      <thead style="text-align: center; vertical-align: middle; background-color: rgb(240, 246, 241)">
        <!-- 表头部分 -->
        <td>用户编码</td>
        <td>用户名</td>
        <td>用户昵称</td>
        <td>用户校区</td>
        <td>用户性别</td>
        <td>用户邮箱</td>
        <td>用户手机号</td>
        <td>操作</td>
      </thead>
      <tbody style="text-align: center; vertical-align: middle">
        <tr v-for="user in users" :key="user.id" style="background-color: rgb(255, 255, 255)">
          <!-- 表格内容 -->
          <td><n-input type="text" v-model:value="user.userId" :disabled="editingRow !== user.userId" size="small" class="n-input" /></td>
          <td><n-input type="text" v-model:value="user.userName" :disabled="editingRow !== user.userId" size="small" /></td>
          <td><n-input type="text" v-model:value="user.userNickname" :disabled="editingRow !== user.userId" size="small" /></td>
          <td><n-input type="text" v-model:value="user.userCampus" :disabled="editingRow !== user.userId" size="small" /></td>
          <td><n-select v-model:value="user.userGender" :options="options" :disabled="editingRow !== user.userId" size="small" /></td>
          <td><n-input type="text" v-model:value="user.userEmail" :disabled="editingRow !== user.userId" size="small" /></td>
          <td><n-input type="text" v-model:value="user.userPhoneNum" :disabled="editingRow !== user.userId" size="small" /></td>
          <td>
            <n-button id="edit" @click="editUser(user.userId)" :disabled="editingRow !== null" size="tiny">Edit</n-button>
            <n-button @click="deleteUser(user.userId)" size="tiny">Delete</n-button>
            <n-button @click="resetUser(user.userId)" size="tiny">Reset</n-button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <n-pagination v-model:page="currentPage" :page-count="totalPages" :on-update:page="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'
import { CashOutline } from '@vicons/ionicons5'
import { inject, onMounted } from 'vue'
const axios = inject('axios')
FlashOutline
CashOutline
import swal from 'sweetalert' // 导入 SweetAlert 库 负责删除/重置警告
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@vicons/material'
// 六个搜索框的内容
let usernameSearch = ref(null)
let userGender = ref(null)
let emailSearch = ref(null)
let phoneSearch = ref(null)
let nicknameSearch = ref(null)
let campusSearch = ref(null)
var currentPage = reactive(1)
let userCampus = ref(null)
// var newPage=reactive(0)
const pageSize = ref(15) // 每页显示的用户数量
function handlePageChange(newPage) {
  console.log('进入更改页面函数')
  console.log(newPage)
  currentPage = newPage
  console.log(currentPage)
  search()
}
let totalItem = ref(0)
let totalPages = ref(0)
const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  },
  {
    label: '不限',
    value: null
  }
]
const options_campus = [
  {
    label: '翔安',
    value: '翔安'
  },
  {
    label: '思明',
    value: '思明'
  },
  {
    label: '漳州',
    value: '漳州'
  },
  { label: '马来西亚', value: '马来西亚' },
  {
    label: '不限',
    value: null
  }
]
const search = async () => {
  try {
    loadingBar.start()
    console.log('页面用户电话')
    console.log(phoneSearch.value)
    console.log('当前页面')
    console.log(currentPage)
    console.log('搜索用户名条件')
    console.log(usernameSearch.value)
    const response = await axios.get('admin/user', {
      params: {
        page: currentPage, //当前页面
        pageSize: pageSize.value, //一页15个数据
        userName: usernameSearch.value,
        userPhoneNum: phoneSearch.value,
        userEmail: emailSearch.value,
        userGender: userGender.value,
        userCampus: campusSearch.value,
        //userStatus:1,
        userNickname: nicknameSearch.value
      }
    })
    const data = response.data // 假设返回的数据是一个数组
    console.log(data)
    // 处理数据
    console.log('response.data.data.rows')
    console.log(data.data.rows)
    users.value = data.data.rows
    users.value = users.value.filter(user => user.userStatus !== 0)
    totalItem.value = data.data.total
    totalPages.value = Math.ceil(totalItem.value / pageSize.value)
    loadingBar.finish()
  } catch (error) {
    console.error(error)
    // 处理错误
    // ...
  }
}
const users = ref([{ id: 1, name: 2 }, { id: 2 }]) //定义一个接收结果的数组
//挂载后调用
console.log('users.value')
console.log(users.value[0].id)
onMounted(() => {
  currentPage = 1 // 设置初始值为 1
  search()
})
const SearchUser = () => {
  search()
}
//接下来三个函数是为了实现编辑时解除封锁和确认编辑重新锁定的逻辑
const editingRow = ref(null) // 跟踪当前正在编辑的行
function editUser(userId) {
  editingRow.value = userId // 将正在编辑的行设置为当前行
}
const saveChanges = async () => {
  loadingBar.start()
  console.log(editingRow.value)
  const selectedItem = users.value.filter(item => item.userId === editingRow.value)
  const selectedItems = selectedItem[0]
  const response = await axios.patch('/admin/update', {
    userId: editingRow.value,
    userEmail: selectedItems.userEmail,
    userNickname: selectedItems.userNickname,
    userCampus: selectedItems.userCampus,
    userGender: selectedItems.userGender,
    userPasswd: selectedItems.userPasswd,
    userPhoneNum: selectedItems.userPhoneNum
  })
  console.log(response.data)
  editingRow.value = null // 保存之后将编辑状态取消
  loadingBar.finish()
}
//删除用户
const deleteUser = userId => {
  // 处理删除逻辑
  swal({
    title: '确认删除用户？',
    text: '删除后将无法恢复该用户的数据！',
    icon: 'warning',
    buttons: ['取消', '确认'],
    dangerMode: true
  }).then(confirmed => {
    if (confirmed) {
      delete_user(userId) // 调用删除用户的函数
    }
  })
}
//删除用户
//删除后要不要重新调用一个查询
const delete_user = async userId => {
  try {
    loadingBar.start()
    await axios.delete(`admin/user/${userId}`).then(response => {
      console.log(response.data)
    })
    loadingBar.finish()
  } catch (error) {
    loadingBar.error()
    console.log(error)
  }
  search()
}
//重置用户
//重置后要不要重新调用查询
const resetUser = async userId => {
  // 处理编辑逻辑
  console.log(`Reset user with ID: ${userId}`)
  swal({
    title: '确认重置用户？',
    icon: 'warning',
    buttons: ['取消', '确认'],
    dangerMode: true
  }).then(confirmed => {
    if (confirmed) {
      reset(userId)
    }
  })
}
const reset = async userId => {
  try {
    loadingBar.start()
    const response = await axios.patch('admin/update', {
      params: {
        userId: userId,
        userPasswd: '123456'
      }
    })
    loadingBar.finish()
    console.log(response.data)
  } catch (e) {
    loadingBar.error()
    console.log(e)
  }
}
</script>

<style scoped>
.n-input:disabled {
  background-color: red;
  color: white;
}
h1 {
  margin: 0;
}
/* 表样式 */
.user-table {
  width: 83%;
  border-collapse: collapse;
}
.user-table th,
.user-table td {
  border: 1px solid lightgray;
  padding: 3px;
  /* margin:0 auto; */
}
.user-table th:last-child,
.user-table td:last-child {
  width: 13.9%;
}
.user-table th:not(:last-child),
.user-table td:not(:last-child) {
  width: 12.3%;
}
/* 按钮样式 */
button {
  margin-right: 6px;
}
input[type='text'] {
  width: 140px;
}
/* 整个区域 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-area {
  background-color: #fcfcfc;
  padding: 20px;
  display: flex;
  width: 81%;
  height: 100px;
  flex-direction: column;
  border-color: rgb(220, 243, 229);
  /* border-style: dashed; */
  border: 1px;
}
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  margin-top: 0px;
}
.filter-title {
  font-weight: bold;
  margin-top: -5px;
}
.search-content {
  display: flex;
  flex-direction: column;
}
.search-row {
  display: flex;
  margin-bottom: 10px; /* 增加搜索项之间的间隔 */
}
.search-field {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  flex-basis: 30%; /* 每个搜索项占据宽度的三分之一 */
}
.search-field span {
  margin-right: 10px; /* 增加标题和输入框之间的间隔 */
}
.n-input {
  flex-grow: 1; /* 让输入框填充剩余空间 */
}
</style>
