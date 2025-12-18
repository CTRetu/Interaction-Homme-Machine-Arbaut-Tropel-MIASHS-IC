<template>
  <div class="register-container">
    <div class="register-card">

      <h1>Se connecter</h1>

      <form @submit.prevent="handleLogin">

        <label>Email</label>
        <input type="email" v-model="email" required />

        <label>Mot de passe</label>
        <input type="password" v-model="password" required />

        <div class="keep-connected">
          <input type="checkbox" v-model="keepConnected" id="keepConnectedLogin" />
          <label for="keepConnectedLogin">Rester connecté</label>
        </div>

        <button type="submit" class="btn-primary">Se connecter</button>
      </form>

      <p class="login-text">
        <br/>
        Pas encore de compte ? <router-link to="/register">Créer un compte</router-link>
      </p>

    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

export default {
  name: "LoginView",
  
  data() {
    return {
      email: "",
      password: "",
      keepConnected: false
    };
  },

  methods: {
    handleLogin() {
      const userStore = useUserStore()

      // 1. Récupérer utilisateurs stockés
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // 2. Vérifier si email + mdp correspondent
      const user = users.find(
        u => u.email === this.email && u.password === this.password
      );

      if (!user) {
        alert("Email ou mot de passe incorrect.");
        return;
      }

      // 3. Mettre à jour le store Pinia
      userStore.login({
        pseudo: user.pseudo,
        email: user.email
      });

      // 4. Gestion du keepConnected (optionnel si tu veux l'utiliser plus tard)
      if (this.keepConnected) {
        localStorage.setItem("keepConnected", "true");
      } else {
        localStorage.removeItem("keepConnected");
      }

      // 5. Redirection après connexion
      this.$router.push({ name: "home" });
    }
  }
};
</script>
