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
      // Partie API ou authentification à brancher plus tard
      console.log("Tentative de connexion :", {
        email: this.email,
        keepConnected: this.keepConnected
      });

      // Simu connexion OK
      alert("Connexion réussie !");
      this.$router.push("/");
    }
  }
};
</script>
