import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/admin/user.vue';
import Order from '../views/admin/order.vue';
import addUser from '../views/admin/addUser.vue'

// 在这里添加页面的路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/Index/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue'),
      children: [
        { path: '/login/register', component: () => import('../views/Login/RegisterCard.vue') },
        { path: '/login', component: () => import('../views/Login/LoginCard.vue') }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User/User.vue'),
      children: [
        { path: '/user', component: () => import('../views/User/ShoppingCart.vue') },
        { path: '/user/bought', component: () => import('../views/User/Bought.vue') },
        { path: '/user/sold', component: () => import('../views/User/Sold.vue') },
        { path: '/user/comments', component: () => import('../views/User/Comments.vue') },
        { path: '/user/published', component: () => import('../views/User/Published.vue') },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/admin.vue'),
      children:[
        {path:'/admin/user',component:User},
        {path:'/admin/order',component:Order},
        {path:'/admin/addUser',component:addUser}
      ]
    },
    // {
    //   path: '/admin/user',
    //   name: 'admin_user',
    //   component: User

      
    // },
    // {
    //   path: '/admin/order',
    //   name:'admin_order',
    //   component: Order
    // },
    // {
    //   path: '/admin/addUser',
    //   name: 'addUser',
    //   component: addUser
    // },
    {
      path: '/changeinfo',
      name: 'changeinfo',
      component: () => import('../views/User/ChangeInfo.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail/Detail.vue'),
    },
    {
      path:'/seller_detail',
      component:()=>import('../views/Detail/Seller_Detail.vue'),
    },
    {
      path:'/editPhoto',
      component:()=>import('../views/Detail/editPhoto.vue')
    },
    {
      path: '/release',
      name: 'release',
      component: () => import('../views/Release/Release.vue'),
    },
  ]
})

export default router
