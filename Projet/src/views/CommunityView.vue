<template>
  <div class="community">

    <!-- TITRE + INTRO -->
    <section class="header-section">
      <br/>
      <h1>Communauté</h1>
      <p class="intro-text">
        Bienvenue dans l’espace Communauté. Vous retrouverez des articles, des commentaires et vous pouvez suivre des utilisateurs.
      </p>

      <button v-if="userStore.isLoggedIn" class="btn-primary publish-btn" @click="showModal = true">
        Publier un article
      </button>
      <p v-else class="text-muted">
        Vous devez être connecté pour publier un article.
      </p>
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
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

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
const showModal = ref(false);

/* ARTICLES PAR DÉFAUT */
const defaultArticles = [
  { id: 1, title: "Bitcoin : Tendance à la hausse confirmée ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Le Bitcoin a connu une hausse significative ces dernières semaines, atteignant des sommets historiques." },
  { id: 2, title: "Bitcoin : Un bon premier investissement ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Le Bitcoin reste un choix populaire pour les nouveaux investisseurs, mais il est important de comprendre les risques associés." },
  { id: 3, title: "Ethereum : quand investir et comment ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Ethereum continue d'innover avec ses smart contracts et sa transition vers la preuve d'enjeu." },
  { id: 4, title: "BNB : La meilleure crypto-monnaie du marché ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "BNB bénéficie de l'écosystème Binance et offre de nombreux avantages à ses détenteurs." },
  { id: 5, title: "Bitcoin : XXXXXXXXXX XXXXXXX XXXXX ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutouuuu", content: "Article sur Bitcoin avec des informations complémentaires." },
  { id: 6, title: "Solana : XXXXXXXXXXXXX XXXXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutu", content: "Solana se distingue par sa rapidité et ses faibles frais de transaction." },
  { id: 7, title: "Solana : XXXXXXXXXX XXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutoto", content: "Un autre article sur Solana explorant ses cas d'usage." },
  { id: 8, title: "BNB : XXXXXXXXXXXXXXX XXXXXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tata", content: "BNB continue d'évoluer dans l'écosystème crypto." },
];

/* ARTICLES CRÉÉS PAR L'UTILISATEUR */
const userArticles = ref(JSON.parse(localStorage.getItem("articles") || "[]"));

/* TOUS LES ARTICLES (utilisateur + défaut) */
const articles = ref([...userArticles.value, ...defaultArticles]);

/* ACTION : PUBLIER UN ARTICLE */
const publishArticle = () => {
  if (!userStore.isLoggedIn) {
    alert("Vous devez être connecté pour publier un article.");
    return;
  }

  if (!titleSubject.value || !newContent.value) return;

  const finalTitle = `${selectedCrypto.value} : ${titleSubject.value}`;

  const newArticle = {
    id: Date.now(),
    title: finalTitle,
    content: newContent.value,
    preview: newContent.value.slice(0, 40) + "...",
    author: userStore.user.pseudo,
  };

  userArticles.value.unshift(newArticle);
  articles.value.unshift(newArticle);
  localStorage.setItem("articles", JSON.stringify(userArticles.value));


  // Reset
  titleSubject.value = "";
  newContent.value = "";
  selectedCrypto.value = "Bitcoin";

  showModal.value = false;
};

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

.article-card-link {
  text-decoration: none;
  color: inherit;
}

.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 15px;
  border-radius: 10px;
  transition: 0.25s ease;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

/* PREVIEW */
.preview-text {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  flex-grow: 1;
}

/* AUTEUR */
.author {
  font-size: 13px;
  color: var(--text-light);
  margin-top: auto;
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
  gap: 12px;
  align-items: center;
}

.modal-actions .btn-primary {
  border: 1px solid transparent;
}

.btn-secondary {
  margin-top: auto;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
