<template>
    <br/>
      <div class="container">
    <div class="search-area">
      <div class="search-header">
        <span class="filter-title">筛选条件</span>
        <span class="search-button">
          <n-button type="primary" suffix-icon="Search" @click="search" style="margin-top: 0%;" size="small">搜索</n-button>
        </span>
      </div>
      <div class="search-content">
        <div class="search-row">
          <div class="search-field">
            <span style="width: 35%;margin-left: 20%;text-align: right;">订单状态</span>
            <n-select v-model:value="order_status" placeholder="搜索订单状态" size="small" :options="options" ></n-select>
          </div>
          <div class="search-field">
            <span  style="width: 35%;margin-left: 20%;text-align: right;">商品名称</span>
            <n-input v-model:value="goods_name" placeholder="搜索商品名称" size="small"></n-input>
          </div>
          <div class="search-field">
            <span  style="width: 35%;margin-left: 20%;text-align: right;">买家用户名</span>
            <n-input v-model:value="buyer_name" placeholder="搜索买家用户名" size="small"></n-input>
          </div>
        </div>
        <div class="search-row">
          <div class="search-field">
            <span  style="width: 35%;margin-left: 20%;text-align: right;">卖家用户名</span>
            <n-input v-model:value="seller_name" placeholder="搜索卖家用户名" size="small"></n-input>
  
          </div>
          <div class="search-field">
            <span  style="width: 35%;margin-left: 18%;text-align: right;">开始时间</span>
            <!-- <n-input v-model="begin_time" placeholder="订单开始时间" size="small"></n-input> -->
            <!-- <n-date-picker size="small" v-model:value="begin_time" type="datetime" style="width:350px;" clearable /> -->
            <n-date-picker
                v-model:formatted-value="begin_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:350px;" size="small"
                clearable
              />
            <!-- <pre>{{ JSON.stringify(timestamp) }}</pre> -->
          </div>
          <div class="search-field">
            <span  style="width: 35%;margin-left: 18%;text-align: right;">结束时间</span>
            <!-- <n-input v-model="end_time" placeholder="订单结束时间" size="small"></n-input> -->
            <!-- <n-date-picker size="small" v-model:value="end_time" type="datetime"  style="width:350px;" clearable /> -->
            <n-date-picker
                v-model:formatted-value="end_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:350px;" size="small"
                clearable
              />
            <!-- <pre>{{ JSON.stringify(timestamp) }}</pre> -->
          </div>
        </div>
      </div>
    </div>
    <div style="margin-right:0px; margin-top:10px;margin-bottom:10px;display: flex;align-items: center;">
    <n-icon :component="CashOutline" size="30" :depth="3" />
    <div style="font-size: 18px; color: rgb(82, 110, 95);margin-left:10px;">数据列表</div>
    <n-button type="primary" ghost style="margin-left:1120px;" size="small" @click="saveChanges">确认编辑</n-button>
    </div>
  
    <table class="order-table">
      <thead style="text-align:center; vertical-align:middle;background-color:rgb(240, 246, 241);">
        <td>订单编号</td>
        <td>买家用户名</td>
        <td>卖家用户名</td>
        <td>商品名称</td>
        <td>订单状态</td>
        <td>订单时间</td>
        <td>订单数量</td>
        <td>订单总价</td>
        <td>操作</td>
      </thead>
      <tbody style="text-align:center; vertical-align:middle;">
        <tr  v-for="order in orders" :key="order.orderId"  style="background-color: rgb(255, 255, 255);" >
          <!-- 表格内容 -->
          <td><n-input type="text" v-model:value="order.orderId" :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.buyerName" :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.sellerName " :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.goodsName " :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.orderStatus " :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.orderDateTime" :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.orderNum" :disabled="editingRow !== order.orderId" size="small"/></td>
          <td><n-input type="text" v-model:value="order.orderSumPrice" :disabled="editingRow !== order.orderId" size="small"/></td>
          <td>
            <n-button id="edit" size="tiny" @click="editOrder(order.orderId)" :disabled="editingRow !== null">Edit</n-button>
            <n-button size="tiny" @click="deleteOrder(order.orderId)">Delete</n-button>
            <n-button size="tiny" @click="resetOrder(order.orderId)">Reset</n-button>
          </td>
        </tr>
      </tbody>
    </table>
    <br/>
    <n-pagination v-model:page="currentPage" :page-count="totalPages" :on-update:page="handlePageChange" />
  </div>
  </template>
  
  <script setup>
  import { ref,computed,onMounted,inject ,reactive} from 'vue'
  import { FlashOutline } from '@vicons/ionicons5'
  import swal from 'sweetalert' // 导入 SweetAlert 库
  const axios=inject('axios')
  // 模拟用户数据
  FlashOutline
  import { CashOutline } from '@vicons/ionicons5'
  import { NRow } from 'naive-ui';
  CashOutline
  let begin_time=ref(null)
  let end_time=ref(null)
  let buyer_name=ref(null)
  let seller_name=ref(null)
  let goods_name=ref(null)
  let order_status=ref(null)
  const orders=ref([{orderId:1}])//定义一个接收结果的数组
  let ordersNum=ref(0)//记录数
  let totalItem=ref(0)
  let totalPages=ref(0)
  //当前页
  var currentPage = reactive(1)
  const pageSize = ref(15); // 每页显示的用户数量
  function handlePageChange(newPage) {
    console.log("进入更改页面函数")
    console.log(newPage)
    currentPage= newPage
    console.log(currentPage)
    search()
  }
  const options = [
  {
    label: '已下单',
    value: '已下单'
  },
  {
    label: '已取消',
    value: '已取消'
  },
  {
    label: '已收货',
    value: '已收货'
  },
  {
    label:'不限',
    value:null
  }
]
  const search = async () => {
    try {
      
      var begins=ref(null)
      if(begin_time.value!=null)begins.value=begin_time.value.toString().split(' ').join('T')
      console.log(begins.value)
      var ends=ref(null)
      if(end_time.value!=null)ends.value=end_time.value.toString().split(' ').join('T')
      console.log(ends.value)
      const response = await axios.post('admin/orders', {
          page: currentPage, //当前页面
          pageSize: pageSize.value, //一页15个数据
          buyerName: buyer_name.value,
          sellerName:seller_name.value,
          begin: begins.value,
          end:ends.value,
          orderStatus:order_status.value,
          goodsName:goods_name.value,
      })
      const data = response.data // 假设返回的数据是一个数组
      console.log(data)
      //处理数据
      console.log('response.data.data')
      console.log(data.data)
      orders.value = data.data.rows
      totalItem.value=data.data.total
      console.log(totalItem.value)
      totalPages.value=Math.ceil(totalItem.value/pageSize.value)
      console.log(totalPages.value)
    } catch (error) {
      console.error(error)
      // 处理错误
      // ...
    }
  }
  //挂载后调用
  onMounted(()=>{
     search()
  })
  const editingRow = ref(null); // 跟踪当前正在编辑的行
  function editOrder(rowId) {
  editingRow.value = rowId; // 将正在编辑的行设置为当前行
  }
  function saveChanges() {
    editingRow.value = null; // 保存之后将编辑状态取消
  }
  //删除订单
  const deleteOrder = (orderId) => {
    // 处理删除逻辑
    swal({
      title: '确认删除订单？',
      text: '删除后将无法恢复该订单的数据！',
      icon: 'warning',
      buttons: ['取消', '确认'],
      dangerMode: true
    }).then(confirmed => {
      if (confirmed) {
        delete_order(orderId) // 调用删除用户的函数
      }
    })
  }
  //删除用户
  //删除后要不要重新调用一个查询
  const delete_order = async(orderId) => {
    try {
        await axios.delete(`admin/order/${orderId}`).then(
        response=>{
            console.log(response.data)
          }
        )
      }
        catch(error)
        {
          console.log(error)
        }
        search()
  }
  //调用update
  const resetOrder = (orderId) => {
  // 处理编辑逻辑
  console.log(`Reset order with ID: ${orderId}`)
  swal({
    title: '确认重置订单？',
    icon: 'warning',
    buttons: ['取消', '确认'],
    dangerMode: true,
  }).then((confirmed) => {
    if (confirmed) {
      reset(orderId);
      }
  });
  }
  function reset(orderId)
  {
  const index = orders.value.findIndex(order => order.orderId === orderId);
      if (index !== -1) {
      orders.value[index].order_time='123456';
  }
  }
  </script>
  <style scoped>
  h1 {
    margin: 0;
  }
  .order-table {
    width: 83%;
    border-collapse: collapse;
  }
  .order-table th,
  .order-table td {
    border: 1px solid lightgray;
    padding: 3px;
    /* margin:0 auto; */
  }
  .order-table th:last-child,
  .order-table td:last-child {
    width: 13%;
  }
  .order-table th:not(:last-child),
  .order-table td:not(:last-child) {
    width: 10%;
  }
  
  button {
    margin-right: 6px;
  }
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
  