<template>
  <br/>
  <!-- 显示内容区域设置 -->
    <div class="container"> 
  <!-- 筛选区域 -->
    <div class="search-area">
    <div class="search-header">
      <span class="filter-title">筛选条件</span>
      <span class="search-button">
        <n-button type="primary" suffix-icon="Search" @click="SearchUser" style="margin-top: 0%;" size="small">搜索</n-button>
      </span>
    </div>
    <div class="search-content">
      <div class="search-row">
        <div class="search-field">
          <span style="width: 35%;margin-left: 20%;text-align: right;">用户名</span>
          <n-input v-model:value="usernameSearch" placeholder="搜索用户名" size="small"></n-input>
        </div>
        <div class="search-field">
          <span  style="width: 35%;margin-left: 20%;text-align: right;">用户ID</span>
          <n-input v-model:value="userIDSearch" placeholder="搜索用户ID" size="small"></n-input>
        </div>
        <div class="search-field">
          <span  style="width: 35%;margin-left: 20%;text-align: right;">用户昵称</span>
          <n-input v-model:value="nicknameSearch" placeholder="搜索用户昵称" size="small"></n-input>
        </div>
      </div>
      <div class="search-row">
        <div class="search-field">
          <span  style="width: 35%;margin-left: 20%;text-align: right;">用户邮箱</span>
          <n-input v-model:value="emailSearch" placeholder="搜索用户邮箱" size="small"></n-input>
        </div>
        <div class="search-field">
          <span  style="width: 35%;margin-left: 20%;text-align: right;">用户手机号</span>
          <n-input v-model:value="phoneSearch" placeholder="搜索用户手机号" size="small"></n-input>
        </div>
        <div class="search-field">
          <span  style="width: 35%;margin-left: 20%;text-align: right;">用户校区</span>
          <n-input v-model:value="campusSearch" placeholder="搜索用户校区" size="small"></n-input>
        </div>
      </div>
    </div>
  </div>
<!-- 分割区域 -->
  <div style="margin-right:0px; margin-top:10px;margin-bottom:10px;display: flex;align-items: center;">
  <n-icon :component="CashOutline" size="30" :depth="3" />
  <div style="font-size: 18px; color: rgb(82, 110, 95);margin-left:10px;">数据列表</div>
  <n-button type="primary" ghost style="margin-left:1120px;" size="small" @click="saveChanges">确认编辑</n-button>
  </div>

<!-- 表格区域 -->
    <table class="user-table">
      <thead style="text-align:center; vertical-align:middle;background-color:rgb(240, 246, 241);">
        <!-- 表头部分 -->
        <td>用户编码</td>
        <td>用户名</td>
        <td>用户昵称</td>
        <td>用户校区</td>
        <td>用户密码</td>
        <td>用户邮箱</td>
        <td>用户手机号</td>
        <td>操作</td>
      </thead>
      <tbody style="text-align:center; vertical-align:middle;">
        <tr  v-for="user in displayedUsers" :key="user.id" style="background-color: rgb(255, 255, 255);"  >
          <!-- 表格内容 -->
          <td><input type="text" v-model="user.id" :disabled="editingRow !== user.id" /></td>
          <td><input type="text" v-model="user.name" :disabled="editingRow !== user.id"/></td>
          <td><input type="text" v-model="user.nickname " :disabled="editingRow !== user.id"/></td>
          <td><input type="text" v-model="user.campus" :disabled="editingRow !== user.id"></td>
          <td><input type="text" v-model="user.passwd" :disabled="editingRow !== user.id"/></td>
          <td><input type="text" v-model="user.email" :disabled="editingRow !== user.id"/></td>
          <td><input type="text" v-model="user.phone" :disabled="editingRow !== user.id"/></td>
          <td>
            <button id="edit" @click="editUser(user.id)" :disabled="editingRow !== null">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
            <button @click="resetUser(user.id)">Reset</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br/>
    <n-pagination v-model:page="currentPage" :page-count="totalPages"  @update="handlePageChange" />
  </div>
</template>

<script setup>
import { ref ,computed} from 'vue'
import { FlashOutline } from '@vicons/ionicons5'
import { CashOutline } from '@vicons/ionicons5'
FlashOutline
CashOutline
import swal from 'sweetalert' // 导入 SweetAlert 库 负责删除/重置警告
// 六个搜索框的内容
let usernameSearch=ref('')
let userIDSearch=ref('')
let emailSearch=ref('')
let phoneSearch=ref('')
let nicknameSearch=ref('')
let campusSearch=ref('')
// 模拟用户数据
const users = ref([
{ id: 1, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 2, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 3, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 4, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 5, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 6, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 7, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 8, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 9, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 10, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 11, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 12, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 13, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 14, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 15, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 1, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 2, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 3, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 4, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
  { id: 5, name: 'User 2', nickname:'Jone',passwd:'gjkkyf',campus:'翔安',email: 'user2@example.com',phone:'123456',able:false },
  { id: 6, name: 'User 3', nickname:'Jack',passwd:'ahekwl',campus:'翔安',email: 'user3@example.com',phone:'123456' ,able:false},
  { id: 7, name: 'User 1',nickname:'Alice',passwd:'jhgyuihf',campus:'翔安',email: 'user1@example.com',phone:'123456',able:false},
])
//当前页
const currentPage = ref(1);
const pageSize = 15; // 每页显示的用户数量
function handlePageChange(newPage) {
  currentPage.value = newPage;
}
//每页展示内容
const displayedUsers = computed(() => {

  console.log(userIDSearch)
  //搜索筛选，注意：此为测试用，实际的搜索在后端！
    const filteredUsers = users.value.filter(user => {
    return (user.name.includes(usernameSearch.value) 
    && user.email.includes(emailSearch.value) 
    && user.nickname.includes(nicknameSearch.value) 
    && user.phone.includes(phoneSearch.value) 
    && (userIDSearch.value===null||userIDSearch.value===undefined||userIDSearch.value===''||user.id===parseInt(userIDSearch.value))
    && user.campus.includes(campusSearch.value)
    )
  });
  const startIndex = (currentPage.value - 1) * pageSize;
  console.log(currentPage.value)
  console.log(startIndex)
  const endIndex = startIndex + pageSize;
  return filteredUsers.slice(startIndex, endIndex);
});


// 计算总页数
const totalPages = computed(() => {
  const filteredUsers = users.value.filter(user => {
    return (user.name.includes(usernameSearch.value) 
    && user.email.includes(emailSearch.value) 
    && user.nickname.includes(nicknameSearch.value) 
    && user.phone.includes(phoneSearch.value) 
    && (userIDSearch===null||userIDSearch===undefined||userIDSearch.value===''||user.id===parseInt(userIDSearch.value))
    && user.campus.includes(campusSearch.value)
    )
  }
  );
  return Math.ceil(filteredUsers.length / pageSize);
});

//接下来三个函数是为了实现编辑时解除封锁和确认编辑重新锁定的逻辑
const editingRow = ref(null); // 跟踪当前正在编辑的行
function editUser(rowId) {
  editingRow.value = rowId; // 将正在编辑的行设置为当前行
}
function saveChanges() {
  editingRow.value = null; // 保存之后将编辑状态取消
}

//删除用户
const deleteUser = (userId) => {
  // 处理删除逻辑
  swal({
    title: '确认删除用户？',
    text: '删除后将无法恢复该用户的数据！',
    icon: 'warning',
    buttons: ['取消', '确认'],
    dangerMode: true,
  }).then((confirmed) => {
    if (confirmed) {
      delete_user(userId); // 调用删除用户的函数
    }
  });
}
function delete_user(userId) {
  // 根据userId执行删除操作，例如：
  const index = users.value.findIndex(user => user.id === userId);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
}
//重置用户
const resetUser = (userId) => {
  // 处理编辑逻辑
  console.log(`Reset user with ID: ${userId}`)
  swal({
    title: '确认重置用户？',
    icon: 'warning',
    buttons: ['取消', '确认'],
    dangerMode: true,
  }).then((confirmed) => {
    if (confirmed) {
      reset(userId);
      }
  });
}
function reset(userId)
{
  const index = users.value.findIndex(user => user.id === userId);
      if (index !== -1) {
      users.value[index].passwd='123456';
}
}
</script>



<style scoped>
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
input[type="text"] {
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
  border:1px;
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
  flex-basis:30%; /* 每个搜索项占据宽度的三分之一 */
}

.search-field span {
  margin-right: 10px; /* 增加标题和输入框之间的间隔 */
}

.n-input {
  flex-grow: 1; /* 让输入框填充剩余空间 */
}
</style>


