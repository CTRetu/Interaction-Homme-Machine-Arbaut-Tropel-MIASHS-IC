<template>
  <div class="community">

    <!-- TITRE + INTRO -->
    <section class="header-section">
      <h1>Communauté</h1>
      <p class="intro-text">
        Bienvenue dans l’espace Communauté. Vous retrouverez des articles, des commentaires et vous pouvez suivre des utilisateurs.
      </p>

      <button class="btn-primary publish-btn" @click="showModal = true">
        Publier un article
      </button>
    </section>

    <!-- MODALE DE FORMULAIRE -->
    <div class="modal-backdrop" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <h2>Publier un article</h2>

        <!-- CHOIX CRYPTO -->
        <label>Crypto :</label>
        <select v-model="selectedCrypto">
          <option v-for="c in cryptoList" :key="c" :value="c">
            {{ c }}
          </option>
        </select>

        <!-- SUJET DU TITRE -->
        <label>Sujet de l’article :</label>
        <input type="text" v-model="titleSubject" placeholder="Entrez le sujet du titre..." />

        <!-- CONTENU -->
        <label>Contenu :</label>
        <textarea v-model="newContent" placeholder="Écrivez votre article..."></textarea>

        <!-- PSEUDO -->
        <label>Pseudo :</label>
        <input type="text" v-model="newAuthor" disabled />

        <!-- ACTIONS -->
        <div class="modal-actions">
          <button class="btn-secondary" @click="showModal = false">Annuler</button>
          <button class="btn-primary" @click="publishArticle">Publier</button>
        </div>
      </div>
    </div>

    <!-- ARTICLES -->
    <section class="articles-section card">
      <h2>Articles</h2>

      <div class="articles-grid">
        <RouterLink
          :to="`/community/articles/${item.id}`"
          class="article-card-link"
          v-for="item in articles"
          :key="item.id"
        >
          <div class="article-card">
            <h3>{{ item.title }}</h3>
            <p class="preview-text">{{ item.preview }}</p>
            <p class="author">Par @{{ item.author }}</p>
          </div>
        </RouterLink>
      </div>

      <RouterLink to="/community/articles/all" class="btn-see-more">
        Voir plus
      </RouterLink>

    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";

/* LISTE DES CRYPTOS DISPONIBLES */
const cryptoList = [
  "Bitcoin",
  "Ethereum",
  "BNB",
  "Solana",
  "Dogecoin",
  "XRP",
  "USDC",
];

/* FORMULAIRE */
const selectedCrypto = ref("Bitcoin"); // valeur par défaut
const titleSubject = ref("");
const newContent = ref("");
const newAuthor = ref("toto"); // pseudo par défaut
const showModal = ref(false);

/* ARTICLES INITIAUX */
const articles = ref([
  { id: 1, title: "Bitcoin : Tendance à la hausse confirmée ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi" },
  { id: 2, title: "Bitcoin : Un bon premier investissement ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi" },
  { id: 3, title: "Ethereum : quand investir et comment ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi" },
  { id: 4, title: "BNB : La meilleure crypto-monnaie du marché ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi" },
  { id: 5, title: "Bitcoin : XXXXXXXXXX XXXXXXX XXXXX ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutouuuu" },
  { id: 6, title: "Solana : XXXXXXXXXXXXX XXXXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutu" },
  { id: 7, title: "Solana : XXXXXXXXXX XXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutoto" },
  { id: 8, title: "BNB : XXXXXXXXXXXXXXX XXXXXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tata" },
]);

/* ACTION : PUBLIER UN ARTICLE */
const publishArticle = () => {
  if (!titleSubject.value || !newContent.value) return;

  const finalTitle = `${selectedCrypto.value} : ${titleSubject.value}`;

  articles.value.unshift({
      id: Date.now(),
      title: finalTitle,
      content: newContent.value,
      preview: newContent.value.slice(0, 40) + "...",
      author: newAuthor.value,
  });
  localStorage.setItem("articles", JSON.stringify(articles.value));


  // Reset
  titleSubject.value = "";
  newContent.value = "";
  selectedCrypto.value = "Bitcoin";

  showModal.value = false;
};

const stored = localStorage.getItem("articles");
if (stored) {
  articles.value = JSON.parse(stored);
}

</script>

<style scoped>

/* GLOBAL */
.community {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: var(--text-color);
}

/* HEADER */
.header-section h1 {
  font-size: 30px;
  margin-bottom: 5px;
  color: var(--primary);
}

.intro-text {
  max-width: 1000px;
  margin-bottom: 20px;
  color: var(--text-light);
}

/* ARTICLES */
.articles-section h2 {
  margin-bottom: 20px;
  color: var(--text-color);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 15px;
}

.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 15px;
  border-radius: 10px;
  transition: 0.25s ease;
}

.article-card:hover {
  transform: translateY(-3px);
}

/* TITRE */
.article-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

/* PREVIEW */
.preview-text {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
}

/* AUTEUR */
.author {
  font-size: 13px;
  color: var(--text-light);
}

/* BOUTON VOIR PLUS */
.btn-see-more {
  padding: 8px 12px;
  background: var(--primary);
  color: #fff;
  border-radius: 6px;
  margin-top: 15px;
  display: inline-block;
}

.btn-see-more:hover {
  background: var(--primary-hover);
}

/* ----- MODALE ----- */

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn .25s;
  z-index: 50;
}

.modal {
  background: var(--bg-secondary);
  padding: 25px;
  width: 420px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: slideIn .25s;
}

.modal h2 {
  color: var(--text-color);
}

.modal label {
  color: var(--text-light);
}

/* Inputs + selects + textarea */
.modal input,
.modal select,
.modal textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
}

.modal textarea {
  height: 100px;
  resize: none;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-secondary {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* CARD */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 12px;
  transition: 0.25s ease;
}

</style>
