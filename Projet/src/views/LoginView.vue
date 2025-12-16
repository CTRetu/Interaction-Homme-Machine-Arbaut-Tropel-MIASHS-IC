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
          <br/>
          <input type="checkbox" v-model="keepConnected" />
          <span> Rester connecté</span>
          <br/><br/>
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
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        u => u.email === this.email && u.password === this.password
      );

      if (!user) {
        alert("Email ou mot de passe incorrect.");
        return;
      }

      // currentUser localStorage
      const currentUser = { pseudo: user.pseudo, email: user.email };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // keepConnected
      if (this.keepConnected) localStorage.setItem("keepConnected", "true");
      else localStorage.removeItem("keepConnected");

      // Pinia
      const userStore = useUserStore();
      userStore.login(currentUser);

      // Redirection
      this.$router.push({ name: "settings" });
    }
  }
};
</script>
