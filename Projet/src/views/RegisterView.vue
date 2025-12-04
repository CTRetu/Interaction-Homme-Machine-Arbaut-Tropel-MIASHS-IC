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
          <br/> 
          <input type="checkbox" v-model="keepConnected" />
          <span> Rester connecté</span>
          <br/> <br/> 
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

      // Ici tu mettras plus tard un appel API
      console.log("Compte créé :", {
        pseudo: this.pseudo,
        email: this.email,
        keepConnected: this.keepConnected
      });

      alert("Compte créé avec succès !");
      this.$router.push("/login");
    }
  }
};
</script>

