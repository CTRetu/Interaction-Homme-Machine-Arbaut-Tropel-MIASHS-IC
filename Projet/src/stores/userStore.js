import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    // Vérifier si un utilisateur est connecté au chargement
    const currentUser = localStorage.getItem('currentUser')
    return {
      isLoggedIn: !!currentUser,
      user: currentUser ? JSON.parse(currentUser) : null,
      dashboardConfig: JSON.parse(localStorage.getItem('userDashboard')) || 
        ['gain24h', 'gainTotal', 'evolution24h', 'performance3d', 'investDetails']
    }
  },

  actions: {
    login(userData) {
      this.isLoggedIn = true
      this.user = userData
      localStorage.setItem('currentUser', JSON.stringify(userData))
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
      localStorage.removeItem('currentUser')
    },

    updateDashboardConfig(config) {
      this.dashboardConfig = config
      localStorage.setItem('userDashboard', JSON.stringify(config))
    },
    
    checkAuth() {
      const currentUser = localStorage.getItem('currentUser')
      this.isLoggedIn = !!currentUser
      this.user = currentUser ? JSON.parse(currentUser) : null
    }
  }
})
