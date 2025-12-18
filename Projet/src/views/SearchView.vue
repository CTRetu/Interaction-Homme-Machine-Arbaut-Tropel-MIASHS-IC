<template>
  <div class="search-view">
    <h1 class="page-title">Résultats de recherche</h1>

    <!-- BARRE DE RECHERCHE -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher des articles..."
        @input="performSearch"
        class="search-input"
      />
      <p class="result-count">{{ filteredArticles.length }} résultat(s) trouvé(s)</p>
    </div>

    <!-- RÉSULTATS -->
    <section class="results-section">
      <div v-if="filteredArticles.length === 0" class="no-results">
        <p>Aucun article ne correspond à votre recherche.</p>
      </div>

      <div v-else class="articles-grid">
        <RouterLink
          :to="`/community/articles/${article.id}`"
          class="article-card-link"
          v-for="article in filteredArticles"
          :key="article.id"
        >
          <div class="article-card">
            <h3>{{ article.title }}</h3>
            <p class="preview-text">{{ getPreview(article) }}</p>
            <p class="author">Par @{{ article.author }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = ref("");

/* ARTICLES PERMANENTS (PAR DÉFAUT) */
const builtInArticles = [
  { id: 1, title: "Bitcoin : Tendance à la hausse confirmée ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Le Bitcoin a connu une hausse significative ces dernières semaines, atteignant des sommets historiques. De nombreux analystes s'accordent à dire que cette tendance pourrait se poursuivre, soutenue par une adoption croissante et des investissements institutionnels." },
  { id: 2, title: "Bitcoin : Un bon premier investissement ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Le Bitcoin reste un choix populaire pour les nouveaux investisseurs, mais il est important de comprendre les risques associés." },
  { id: 3, title: "Ethereum : quand investir et comment ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "Ethereum continue d'innover avec ses smart contracts et sa transition vers la preuve d'enjeu." },
  { id: 4, title: "BNB : La meilleure crypto-monnaie du marché ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "titi", content: "BNB bénéficie de l'écosystème Binance et offre de nombreux avantages à ses détenteurs." },
  { id: 5, title: "Bitcoin : XXXXXXXXXX XXXXXXX XXXXX ?", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutouuuu", content: "Article sur Bitcoin avec des informations complémentaires." },
  { id: 6, title: "Solana : XXXXXXXXXXXXX XXXXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutu", content: "Solana se distingue par sa rapidité et ses faibles frais de transaction." },
  { id: 7, title: "Solana : XXXXXXXXXX XXXXXXX XXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tutoto", content: "Un autre article sur Solana explorant ses cas d'usage." },
  { id: 8, title: "BNB : XXXXXXXXXXXXXXX XXXXXXXX", preview: "XXXXXXXXXXXX XXXXX XXXX...", author: "tata", content: "BNB continue d'évoluer dans l'écosystème crypto." },
];

/* ARTICLES DU LOCALSTORAGE (seulement les articles créés par l'utilisateur) */
const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");

/* TOUS LES ARTICLES (articles par défaut + articles utilisateur) */
const allArticles = ref([...storedArticles, ...builtInArticles]);

/* FILTRAGE */
const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) {
    return allArticles.value;
  }

  const query = searchQuery.value.toLowerCase();

  return allArticles.value.filter(article => {
    const titleMatch = article.title.toLowerCase().includes(query);
    const authorMatch = article.author.toLowerCase().includes(query);
    const contentMatch = article.content && article.content.toLowerCase().includes(query);

    return titleMatch || authorMatch || contentMatch;
  });
});

/* FONCTION POUR OBTENIR UN APERÇU */
function getPreview(article) {
  if (article.preview) {
    return article.preview;
  }
  if (article.content) {
    return article.content.slice(0, 100) + "...";
  }
  return "Aucun contenu disponible";
}

/* RECHERCHE */
function performSearch() {
  // La recherche se fait automatiquement via computed
}

/* INIT */
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
  }
});
</script>

<style scoped>
.search-view {
  padding: 30px 40px;
  max-width: 1400px;
  margin: 0 auto;
  color: var(--text-color);
}

.page-title {
  font-size: 28px;
  color: var(--primary);
  margin-bottom: 25px;
}

.search-container {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 16px;
  margin-bottom: 10px;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
}

.result-count {
  color: var(--text-light);
  font-size: 14px;
}

.results-section {
  margin-top: 20px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: var(--text-light);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.article-card-link {
  text-decoration: none;
}

.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 10px;
  transition: 0.25s ease;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
}

.article-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.preview-text {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 12px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex-grow: 1;
}

.author {
  font-size: 13px;
  color: var(--primary);
  font-weight: 600;
  margin-top: auto;
}
</style>
