import './assets/main.css'
import axios from 'axios'
import navie from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
import { UserStore } from './stores/UserStore.js'
import store from './stores/UserStore.js'

import App from './App.vue'
import router from './router'

// axios.defaults.baseURL = 'http://127.0.0.1:8080'
const { message, notification, dialog } = createDiscreteApi(['message', 'dialog', 'notification'])
const app = createApp(App)

app.provide('axios', axios)
app.provide('message', message)
app.provide('dialog', dialog)
app.provide('notification', notification)
app.provide('server_url', axios.defaults.baseURL)

app.use(navie)
app.use(router)
app.use(store)

// 拦截器
const userStore = new UserStore()
axios.interceptors.request.use(config => {
  config.headers.token = userStore.token
  config.url = '/api' + config.url;
  console.log(config.headers.token);
  return config
})

app.mount('#app')
