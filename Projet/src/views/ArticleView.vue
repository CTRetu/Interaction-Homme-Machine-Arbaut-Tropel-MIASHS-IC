<template>
  <div class="article-view">
    <br/>
    <!-- Bouton retour -->
    <RouterLink to="/community" class="btn-back">
      ⬅ Retour
    </RouterLink>

    <!-- Titre + auteur -->
    <section class="header-section">
      <h1>{{ article.title }}</h1>

      <p class="meta">
        <strong>Auteur :</strong> @{{ article.author }}
      </p>
    </section>

    <!-- Contenu de l’article -->
    <section class="article-content card">
      <p>{{ article.content }}</p>
    </section>

    <!-- Commentaires -->
    <section class="comments card">
      <h2>Commentaires</h2>

      <!-- UTILISATEUR CONNECTÉ -->
      <div v-if="currentUser">
        <textarea
          v-model="newComment"
          placeholder="Écrire un commentaire..."
        ></textarea>

        <button class="btn-primary" @click="addComment">
          Publier
        </button>
        <br/>
        <br/>
      </div>

      <!-- UTILISATEUR NON CONNECTÉ -->
      <p v-else class="text-muted">
        Vous devez être connecté pour écrire un commentaire.
      </p>

      <!-- LISTE DES COMMENTAIRES -->
      <div class="comment" v-for="c in comments" :key="c.id">
        <p class="author">@{{ c.author }}</p>
        <p class="text">{{ c.text }}</p>
      </div>

      <button class="btn-see-more">Voir plus</button>
    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

/* ROUTE */
const route = useRoute();
const articleId = route.params.id;

/* UTILISATEUR CONNECTÉ */
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

/* ARTICLE PERMANENT */
const builtInArticles = [
  {
    id: 1,
    title: "Bitcoin : Tendance à la hausse confirmée ?",
    author: "tutu",
    content:
      "Le Bitcoin a connu une hausse significative ces dernières semaines, atteignant des sommets historiques. De nombreux analystes s'accordent à dire que cette tendance pourrait se poursuivre, soutenue par une adoption croissante et des investissements institutionnels."
  }
];

/* ARTICLES CRÉÉS PAR L’UTILISATEUR */
const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");

/* FUSION */
const allArticles = [...builtInArticles, ...storedArticles];

/* ARTICLE COURANT */
const article =
  allArticles.find(a => a.id == articleId) || {
    title: "Cet article n'est pas disponible",
    author: "inconnu",
    content: "Aucun contenu disponible."
  };

/* COMMENTAIRES (persistants par article) */
const storageKey = `comments_article_${articleId}`;

const comments = ref(
  JSON.parse(localStorage.getItem(storageKey)) || [
    { id: 1, author: "tutu", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." },
    { id: 2, author: "titi", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." },
    { id: 3, author: "titi", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX..." }
  ]
);

const newComment = ref("");

function addComment() {
  if (!newComment.value.trim()) return;

  comments.value.push({
    id: Date.now(),
    author: currentUser.pseudo,
    text: newComment.value
  });

  localStorage.setItem(storageKey, JSON.stringify(comments.value));
  newComment.value = "";
}
</script>

<style scoped>
.article-view {
  padding: 20px 40px;
  max-width: 900px;
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: var(--text-color);
}


/* BOUTONS */
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

.btn-back:hover,
.btn-follow:hover,
.reply:hover {
  background: var(--bg-body);
}

.btn-see-more {
  padding: 8px 12px;
  background: var(--primary);
  color: #000;
  border-radius: 6px;
  margin-top: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-see-more:hover {
  opacity: 0.85;
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* CONTENU */
.article-content p {
  color: var(--text-color);
  margin-bottom: 16px;
}

/* COMMENTAIRES */
.comments h2 {
  color: var(--primary);
}

.comments textarea {
  width: 100%;
  height: 110px;
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  margin-bottom: 12px;
}

.comment {
  border-top: 1px solid var(--border-color);
  padding: 12px 0;
}

.comment .author {
  font-weight: 700;
  color: var(--primary); /* même couleur que crypto */
  margin-bottom: 4px;
}

.comment .text {
  color: var(--text-light);
  font-size: 15px;
  line-height: 1.5;
}

</style>
