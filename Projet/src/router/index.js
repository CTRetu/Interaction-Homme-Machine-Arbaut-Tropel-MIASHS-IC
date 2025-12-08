import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CryptoDetailView from '../views/CryptoDetailView.vue'
import ArticleView from '../views/ArticleView.vue'
import CommunityView from '../views/CommunityView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SettingsView from '../views/SettingsView.vue'
import CryptoTableView from '../views/CryptoTableView.vue'


export default createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/crypto-table', name: 'crypto-table', component: CryptoTableView },
    { path: '/crypto/:symbol', name: 'crypto-detail', component: CryptoDetailView },
    { path: '/article/:id', name: 'article', component: ArticleView },
    { path: '/community', name: 'community', component: CommunityView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },

    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true }
    }
  ]
})
