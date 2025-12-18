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
import { useUserStore } from "@/stores/userStore";

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
      const userStore = useUserStore();

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

      // 3. Créer l'objet utilisateur
      const currentUser = { pseudo: user.pseudo, email: user.email };

      // 4. Stocker dans localStorage pour persistance
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // 5. Mettre à jour le store Pinia
      userStore.login(currentUser);

      // 6. Gestion du keepConnected
      if (this.keepConnected) localStorage.setItem("keepConnected", "true");
      else localStorage.removeItem("keepConnected");

      // 7. Redirection
      this.$router.push({ name: "settings" });
    }
  }
};
</script>
