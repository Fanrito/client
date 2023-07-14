import './assets/main.css'
import axios from 'axios'
import navie from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
import App from './App.vue'
import router from './router'

const { message, notification, dialog } = createDiscreteApi(['message', 'dialog', 'notification'])
const app = createApp(App)

app.provide('axios', axios)
app.provide('message', message)
app.provide('dialog', dialog)
app.provide('notification', notification)

app.use(navie)
app.use(createPinia())
app.use(router)

app.mount('#app')
