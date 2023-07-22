import { ref, computed } from 'vue'
import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)
export default store

export const UserStore = defineStore('user', {
  state: () => {
    return {
      id: null,
      username: '',
      token: '',
      password: ''
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  },
  actions: {},
  getters: {}
})
