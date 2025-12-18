<template>
  <div class="register-container">
    <div class="register-card">

      <h1>S’inscrire</h1>

      <form @submit.prevent="handleRegister">
        <label>Pseudo</label>
        <input type="text" v-model="pseudo" required />

        <label>Email</label>
        <input type="email" v-model="email" required />

        <label>Mot de passe</label>
        <input type="password" v-model="password" required />

        <label>Confirmer le mot de passe</label>
        <input type="password" v-model="passwordConfirm" required />

        <div class="keep-connected">
          <input type="checkbox" v-model="keepConnected" id="keepConnectedRegister" />
          <label for="keepConnectedRegister">Rester connecté</label>
        </div>

        <button type="submit" class="btn-primary">S'inscrire</button>
      </form>

      <p class="login-text">
        <br/>
        Déjà un compte ? <router-link to="/login">Se connecter ici</router-link>
      </p>

    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  name: "RegisterView",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      passwordConfirm: "",
      keepConnected: false
    };
  },

  methods: {
    handleRegister() {
      if (this.password !== this.passwordConfirm) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const already = users.find(u => u.email === this.email);

      if (already) {
        alert("Un compte existe déjà avec cet email.");
        return;
      }

      users.push({
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
        keepConnected: this.keepConnected
      });

      localStorage.setItem("users", JSON.stringify(users));

      const currentUser = { pseudo: this.pseudo, email: this.email };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      if (this.keepConnected) localStorage.setItem("keepConnected", "true");
      else localStorage.removeItem("keepConnected");

      // Pinia
      const userStore = useUserStore();
      userStore.login(currentUser);

      this.$router.push({
        name: "settings",
        query: { created: "1" }
      });
    }
  }
};
</script>
