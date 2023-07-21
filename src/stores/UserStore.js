import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const UserStore = defineStore('user', {
  state: () => {
    return {
      id: 0,
      account: '',
      token: ''
    }
  },
  actions: {},
  getters: {}
})
