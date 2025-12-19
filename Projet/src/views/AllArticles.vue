<template>
  <div class="all-articles">

    <h1 class="page-title">Tous les articles</h1>
    <RouterLink to="/community" class="btn-back">
      ⬅ Retour
    </RouterLink>

    <section class="articles-table card">

      <table>
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Titre</th>
            <th>Auteur</th>
          </tr>
        </thead>

        <tbody>
          <RouterLink
            v-for="a in articles"
            :key="a.id"
            :to="`/community/articles/${a.id}`"
            class="table-row-link"
          >
            <tr>
              <td class="coin-cell">
                <img :src="a.icon" class="coin-icon" />
                {{ a.crypto }}
              </td>
              <td>{{ a.title }}</td>
              <td class="author">@{{ a.author }}</td>
            </tr>
          </RouterLink>
        </tbody>
      </table>

      <div class="table-footer">
        <button class="btn-next">
          Page suivante ➡️
        </button>
      </div>

    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";

/* ICÔNES PAR DÉFAUT POUR LES CRYPTOS */
const cryptoIcons = {
  "Bitcoin": "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  "Ethereum": "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  "BNB": "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  "Solana": "https://cryptologos.cc/logos/solana-sol-logo.png",
  "Dogecoin": "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  "XRP": "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  "USDC": "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
};

/* ARTICLES PERMANENTS */
const builtInArticles = [
  { id: 1, crypto: "Bitcoin", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", title: "Tendance à la hausse confirmée ?", author: "titi" },
  { id: 2, crypto: "Bitcoin", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", title: "Un bon premier investissement ?", author: "titi" },
  { id: 3, crypto: "Ethereum", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png", title: "Quand investir et comment ?", author: "titoutou" },
  { id: 4, crypto: "BNB", icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png", title: "La meilleure crypto-monnaie du marché", author: "tio" },
  { id: 5, crypto: "Solana", icon: "https://cryptologos.cc/logos/solana-sol-logo.png", title: "XXXXXXXXXXXXXXXXXXXXXXXXX", author: "totototo" },
  { id: 6, crypto: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", title: "XXXXXXXXXXXXXXXXXXXXXXXXX", author: "tita" },
  { id: 7, crypto: "Dogecoin", icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png", title: "XXXXXXXXXXXXXXXXXXXXXX", author: "tutu" },
  { id: 8, crypto: "Solana", icon: "https://cryptologos.cc/logos/solana-sol-logo.png", title: "XXXXXXXXXXXXXXXXXXXXXXXX", author: "tuti" },
  { id: 9, crypto: "XRP", icon: "https://cryptologos.cc/logos/xrp-xrp-logo.png", title: "XXXXXXXXXXXXXXXXXXXXXXXX", author: "titi" },
  { id: 10, crypto: "Dogecoin", icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png", title: "XXXXXXXXXXXXXXXXXXXX", author: "tututu" },
];

/* ARTICLES DU LOCALSTORAGE */
const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");

/* AJOUTER LES ICÔNES AUX ARTICLES STOCKÉS ET EXTRAIRE LA CRYPTO DU TITRE */
const processedStoredArticles = storedArticles.map(article => {
  // Extraire la crypto du titre (format: "Bitcoin : Sujet")
  const cryptoMatch = article.title.match(/^([^:]+)\s*:/);
  const crypto = cryptoMatch ? cryptoMatch[1].trim() : "Bitcoin";

  return {
    ...article,
    crypto: crypto,
    icon: cryptoIcons[crypto] || cryptoIcons["Bitcoin"]
  };
});

/* FUSION DES ARTICLES */
const articles = ref([...processedStoredArticles, ...builtInArticles]);
</script>

<style scoped>
/* GLOBAL */
.all-articles {
  padding: 30px;
  background: var(--bg-primary);
  color: var(--text-color);
}

/* TITRE */
.page-title {
  font-size: 28px;
  color: var(--primary);
  margin-bottom: 25px;
}

/* BOUTON RETOUR */
.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 14px;
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s ease;
}

.btn-back:hover {
  background: var(--primary-hover);
}

/* TABLEAU CONTAINER */
.articles-table {
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 12px;
  background: var(--bg-secondary);
}

/* TABLE COMPLETE */
.articles-table table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-secondary);
}

/* EN-TÊTE */
thead {
  background: var(--table-header);
}

thead th {
  text-align: left;
  padding: 14px 18px;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
}

/* LIGNES ALTERNÉES */
tbody tr:nth-child(even) {
  background: var(--table-even);
}

tbody tr:nth-child(odd) {
  background: var(--table-odd);
}

tbody tr:hover {
  background: var(--table-hover);
  cursor: pointer;
}

/* CELLULES */
td {
  padding: 14px 18px;
  font-size: 15px;
  color: var(--text-color);
  vertical-align: middle;
}

/* CRYPTO + ICONES */
.coin-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.coin-icon {
  width: 24px;
}

/* AUTEUR */
.author {
  font-weight: 600;
  color: var(--text-light);
}

/* LIEN GLOBAL */
.table-row-link {
  text-decoration: none;
  color: inherit;
  display: contents;
}

/* FOOTER TABLE */
.table-footer {
  margin-top: 15px;
  text-align: right;
}

/* BOUTON PAGE SUIVANTE */
.btn-next {
  padding: 8px 14px;
  background: var(--primary);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn-next:hover {
  background: var(--primary-hover);
}

/* ------------------------------------------------------- */
/*                     🌙 DARK MODE                       */
/* ------------------------------------------------------- */

:root.dark .articles-table {
  background: var(--bg-secondary);
}

:root.dark thead {
  background: #3a3220;
}

:root.dark tbody tr:nth-child(even),
:root.dark tbody tr:nth-child(odd) {
  background: #2a2a2a;
}

:root.dark tbody tr:hover {
  background: #3a3a3a;
}

:root.dark td,
:root.dark th {
  color: #eee !important;
}

:root.dark .btn-back {
  background: #3a3220;
  border-color: #8a723c;
}

:root.dark .btn-back:hover {
  background: #4a3a23;
}

/* ------------------------------------------------------- */
/*                     ☀️ LIGHT MODE                      */
/* ------------------------------------------------------- */

:root.light .articles-table {
  background: white;
}

:root.light thead {
  background: #f4dca2;
}

:root.light tbody tr:nth-child(even) {
  background: #fcf5e6;
}

:root.light tbody tr:nth-child(odd) {
  background: #fffdf7;
}

:root.light tbody tr:hover {
  background: #f1e6c5;
}


</style>