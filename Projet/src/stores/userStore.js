import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  actions: {
    login(userData) {
      this.isLoggedIn = true
      this.user = userData

      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
    },

    logout() {
      this.isLoggedIn = false
      this.user = null

      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
    }
  }
})
