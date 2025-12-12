<template>
  <header>
    <div class="nav-container">

      <!-- LOGO -->
      <div class="nav-logo">
        <img :src="logo" alt="Logo" class="header-logo" />
        <h1>TOP CRYPTO</h1>
      </div>

      <!-- SEARCH -->
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path 
            d="M10 2a8 8 0 105.293 14.293l4.207 4.207a1 1 0 101.414-1.414l-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
            fill="currentColor"
          />
        </svg>
        <input type="text" placeholder="Rechercher..." />
      </div>

      <!-- NAVIGATION -->
      <nav class="flex" style="gap: 20px; align-items: center;">

        <RouterLink to="/community">Communauté</RouterLink>

        <!-- Non connecté -->
        <template v-if="!isLoggedIn">
          <RouterLink to="/register" class="btn-primary">
            Se connecter/S'inscrire
          </RouterLink>
        </template>

        <!-- Connecté -->
        <template v-else>
          <div style="position:relative;">
            <div class="profile-pic" @click="toggleMenu">👤</div>

            <div v-if="menuOpen" class="profile-menu">
              <RouterLink to="/settings">Paramètres</RouterLink>
              <button @click="logout">Déconnexion</button>

              <!-- Mode clair / sombre -->
              <button @click="toggleTheme">
                Passer en {{ isDark ? "mode clair" : "mode sombre" }}
              </button>
            </div>
          </div>
        </template>

      </nav>
    </div>
  </header>
</template>

<script setup>
import logo from "@/assets/logo.png"; 

import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)
const menuOpen = ref(false)
const isDark = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function logout() {
  isLoggedIn.value = false
  menuOpen.value = false
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.className = isDark.value ? "dark" : "light"
}

onMounted(() => {
  // Suivre le thème du système
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  isDark.value = systemPrefersDark
  document.documentElement.className = systemPrefersDark ? "dark" : "light"
})
</script>

<style scoped>
/* Rien ici : tout est dans style.css */
</style>
