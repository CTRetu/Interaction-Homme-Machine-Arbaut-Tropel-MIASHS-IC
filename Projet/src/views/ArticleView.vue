<template>
  <div class="article-view">

    <!-- Bouton retour -->
    <RouterLink to="/community" class="btn-back">
      ⬅ Retour
    </RouterLink>

    <!-- Titre + auteur -->
    <section class="header-section">
      <h1>{{ article.title }}</h1>

      <p class="meta">
        <strong>Auteur :</strong> @{{ article.author }}
        <button class="btn-follow">Suivre l’auteur</button>
      </p>
    </section>

    <!-- Contenu de l’article -->
    <section class="article-content card">
      <p>{{ article.content }}</p>
    </section>

    <!-- Commentaires -->
    <section class="comments card">
      <h2>Commentaires</h2>

      <textarea placeholder="Se connecter pour ecrire un commentaire..."></textarea>

      <div class="comment" v-for="c in comments" :key="c.id">
        <p class="author">@{{ c.author }}</p>
        <p class="text">{{ c.text }}</p>
        <button class="reply">Répondre</button>
      </div>

      <button class="btn-see-more">Voir plus</button>
    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

/* Récupération du paramètre ID dans l'URL */
const route = useRoute();
const articleId = route.params.id;

/* ----------------------------- */
/*   ARTICLE PERMANENT (ID 1)   */
/* ----------------------------- */
const builtInArticles = [
  {
    id: 1,
    title: "Bitcoin : Tendance à la hausse confirmée ?",
    author: "tutu",
    content:
      "Le Bitcoin a connu une hausse significative ces dernières semaines, atteignant des sommets historiques. De nombreux analystes s'accordent à dire que cette tendance pourrait se poursuivre, soutenue par une adoption croissante et des investissements institutionnels."
  }
];

/* -------------------------------------- */
/*   ARTICLES CRÉÉS PAR L’UTILISATEUR     */
/* -------------------------------------- */
let stored = JSON.parse(localStorage.getItem("articles") || "[]");

/* ----------------------------- */
/*   FUSION DES DEUX SOURCES    */
/* ----------------------------- */
const allArticles = [...builtInArticles, ...stored];

/* ----------------------------- */
/*   SÉLECTION DE L’ARTICLE     */
/* ----------------------------- */
const article = allArticles.find((a) => a.id == articleId) || {
  title: "Cet article n'est pas disponible",
  author: "inconnu",
  content: "Aucun contenu disponible."
};

/* Commentaires fictifs */
const comments = ref([
  { id: 1, author: "tutu", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." },
  { id: 2, author: "titi", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." },
  { id: 3, author: "titi", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." }
]);
</script>

<style scoped>
.article-view {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: var(--text-color);
}

/* BOUTON RETOUR + BOUTON SUIVRE + BOUTON RÉPONDRE */
.btn-back,
.btn-follow,
.reply {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s ease;
  width: auto;
  max-width: fit-content;
}

/* HOVER */
.btn-back:hover,
.btn-follow:hover,
.reply:hover {
  background: var(--bg-body);
}

/* Pour que "Répondre" ne soit plus un simple lien */
.reply {
  margin-top: 5px;
  padding: 4px 10px;
}

/* Bouton "Voir plus" reste noir comme dans Community */
.btn-see-more {
  padding: 8px 12px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  display: inline-block;
  margin-top: 15px;
  border: none;
}


/* HEADER */
.header-section h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--primary);
}

.meta {
  display: flex;
  gap: 20px;
  color: var(--text-light);
}

/* CARD */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 12px;
}

/* ARTICLE CONTENT */
.article-content p {
  color: var(--text-color);
  margin-bottom: 16px;
}

/* COMMENTAIRES */
textarea {
  width: 100%;
  height: 90px;
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
}

.comments h2 {
  color: var(--primary);
}

.comment {
  border-top: 1px solid var(--border-color);
  padding: 10px 0;
}

.comment .author {
  font-weight: 600;
  color: var(--text-color);
}

.comment .text {
  color: var(--text-light);
}
</style>
