import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/User.vue')
    }
  ]
})

export default router
