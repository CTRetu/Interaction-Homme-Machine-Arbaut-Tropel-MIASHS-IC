<template>
  <header class="header-bar">
    <div class="nav-container">

      <!-- LOGO / ACCUEIL -->
      <RouterLink to="/" class="nav-logo">
        <img :src="logo" alt="Logo" class="header-logo" />
        <h1>TOP CRYPTO</h1>
      </RouterLink>

      <!-- SEARCH -->
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M10 2a8 8 0 105.293 14.293l4.207 4.207a1 1 0 101.414-1.414l-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
            fill="currentColor"
          />
        </svg>
        <input
          type="text"
          placeholder="Rechercher..."
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- NAVIGATION -->
      <nav class="nav-links">

        <RouterLink to="/community" class="nav-link">
          Communauté
        </RouterLink>

        <!-- NON CONNECTÉ -->
        <RouterLink
          v-if="!userStore.isLoggedIn"
          to="/login"
          class="btn-primary"
        >
          Se connecter / S’inscrire
        </RouterLink>

        <!-- CONNECTÉ -->
        <div v-else class="profile-wrapper">

          <!-- PROFIL -->
          <button class="profile-trigger" @click="toggleMenu">
            <span class="profile-icon">👤</span>
            <span class="profile-label">Profil</span>
          </button>

          <!-- MENU -->
          <div v-if="menuOpen" class="profile-menu">

            <button class="menu-item" @click="toggleTheme">
              Passer en {{ isDark ? "mode clair" : "mode sombre" }}
            </button>

            <RouterLink
              to="/settings"
              class="menu-item link"
              @click="closeMenu"
            >
              Paramètres
            </RouterLink>

            <button class="menu-item danger" @click="handleLogout">
              Déconnexion
            </button>

          </div>
        </div>

      </nav>
    </div>
  </header>
</template>

<script setup>
import logo from "@/assets/logo.png";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const menuOpen = ref(false);
const isDark = ref(false);
const searchQuery = ref("");

/* RECHERCHE */
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
    searchQuery.value = "";
  }
}

/* MENU */
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

/* LOGOUT */
function handleLogout() {
  userStore.logout();
  localStorage.removeItem("currentUser");
  closeMenu();
  router.push("/");
}

/* THEME */
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.className = isDark.value ? "dark" : "light"
}

/* INIT */
onMounted(() => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    userStore.login(JSON.parse(storedUser));
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDark.value = systemPrefersDark;
  document.documentElement.className = systemPrefersDark ? "dark" : "light";
});
</script>

<style scoped>
/* ---------- STRUCTURE ---------- */

.header-bar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  max-width: 1300px;
  margin: auto;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ---------- LOGO ---------- */

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.header-logo {
  width: 24px;
}

.nav-logo h1 {
  font-size: 16px;
  font-weight: 800;
  color: var(--primary);
}

/* ---------- SEARCH ---------- */


.search-bar {
  flex: 1;
  max-width: 460px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  background: transparent;
  border: 2px solid var(--primary);
  border-radius: 10px;
  padding: 4px 10px;
  transition: box-shadow 0.2s ease;
  box-shadow: none;
  position: static !important;
}

.search-bar:focus-within { box-shadow: none; }

.search-icon {
  width: 16px;
  color: var(--text-light);
  transition: color 0.3s ease;
  position: static !important;
  flex: 0 0 auto;
}

.search-bar:focus-within .search-icon {
  color: var(--primary);
}

.search-bar input {
  border: none !important;
  outline: none;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 5px 0 0 0 !important;
  color: var(--text-color);
  margin-left: 0 !important;
  height: 26px;
  line-height: 26px; 
  width: 100%;
  font-size: 13px;
  font-weight: 500;
}

.search-bar input::placeholder {
  color: var(--text-light);
  opacity: 0.6;
}

/* ---------- NAV ---------- */

.nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-link {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  padding: 0;
}

.nav-link:hover {
  opacity: 0.8;
}

.btn-primary {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transform: translateY(-4px);
}

.btn-primary:hover {
  background: var(--primary-hover);
}

/* ---------- PROFIL ---------- */

.profile-wrapper {
  position: relative;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.profile-trigger:hover {
  opacity: 0.8;
}

/* MENU */
.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 220px;

  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 100;
}

.menu-item {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: var(--bg-body);
}

.menu-item.link {
  text-decoration: none;
}

.menu-item.danger {
  color: #ff6b6b;
  border-color: rgba(255, 80, 80, 0.4);
}

.menu-item.danger:hover {
  background: rgba(255, 80, 80, 0.1);
}
</style>
