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

      // 1) Récupérer la liste des utilisateurs existants
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // 2) Vérifier que l'email n'est pas déjà utilisé
      const already = users.find(u => u.email === this.email);

      if (already) {
        alert("Un compte existe déjà avec cet email.");
        return;
      }

      // 3) Ajouter l'utilisateur
      users.push({
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
        keepConnected: this.keepConnected
      });

      // 4) Enregistrer dans localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // 5) Mettre l'utilisateur comme connecté
      localStorage.setItem("currentUser", JSON.stringify({
        pseudo: this.pseudo,
        email: this.email
      }));

      // 6) Redirection vers paramètres AVEC message
      this.$router.push({
        name: "settings",
        query: { created: "1" }
      });
    }
  }
};
</script>

