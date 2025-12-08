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

      // 3. Stocker l’utilisateur connecté
      localStorage.setItem("currentUser", JSON.stringify({
        pseudo: user.pseudo,
        email: user.email
      }));

      // 4. Gestion du keepConnected (optionnel si tu veux l'utiliser plus tard)
      if (this.keepConnected) {
        localStorage.setItem("keepConnected", "true");
      } else {
        localStorage.removeItem("keepConnected");
      }

      // 5. Redirection après connexion
      this.$router.push({ name: "settings" });
    }
  }
};
</script>
