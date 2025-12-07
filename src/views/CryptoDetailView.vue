<template>
  <div class="crypto-detail">

    <!-- TITRE + LOGO -->
    <section class="header-section">
      <div class="title-row">
        <h1>{{ cryptoName }}</h1>
        <img :src="cryptoLogo" alt="logo" class="crypto-logo" />
      </div>
    </section>


    <!-- CHIFFRES CLÉS -->
    <section class="key-stats card">
      <h2 class="section-title">Chiffres clés</h2>

      <div class="stats-grid">
        <div v-for="item in stats" :key="item.label" class="stat-item">
          <span class="label">{{ item.label }}</span>

          <div class="stat-value">
            <span
              :class="{ up: item.value > 0, down: item.value < 0 }"
              class="value"
            >
              {{ item.value > 0 ? '+' : '' }}{{ item.value }}%
            </span>

            <span
              class="arrow"
              :class="{ up: item.value > 0, down: item.value < 0 }"
            >
              {{ item.value > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- GRAPHIQUE + PARAMÈTRES -->
    <section class="chart-section card">

      <div class="chart-area">
        <h3>Cours</h3>
        <div class="chart-placeholder">[Graphique Highcharts ici]</div>
      </div>

      <div class="chart-params">
        <h3>Paramètres</h3>

        <label>Période :</label>
        <select>
          <option>1 semaine</option>
          <option>1 mois</option>
          <option>1 an</option>
        </select>

        <label>Comparaison :</label>
        <select>
          <option>Aucune</option>
          <option>BTC</option>
          <option>ETH</option>
        </select>

        <label>Devise :</label>
        <select>
          <option>$US</option>
          <option>€ EUR</option>
        </select>
      </div>
    </section>

    <!-- LIEUX D’ACHATS -->
    <section class="card buy-section">
      <h3>Lieux d’achat</h3>

      <ul>
        <li v-for="site in buyLinks" :key="site.name">
          <a :href="site.url" target="_blank">{{ site.name }}</a>
        </li>
      </ul>

      <button class="btn-see-more">Voir plus</button>
    </section>

    <!-- CONVERTISSEUR -->
    <section class="card converter-section">
      <h3>Convertisseur</h3>

      <div class="converter-grid">
        <!-- INPUT CRYPTO -->
        <input type="number" v-model.number="amount" />

        <select v-model="cryptoSymbol">
          <option>BTC</option>
          <option>ETH</option>
          <option>SOL</option>
        </select>

        <!-- RESULTAT EN USD -->
        <input type="text" :value="convertedValue" disabled />

        <select disabled>
          <option>$US</option>
        </select>
      </div>
    </section>

    <!-- CRYPTOS SIMILAIRES -->
    <section class="card related-cryptos">
      <h3>Cryptos similaires</h3>

      <div class="crypto-cards">
        <div class="mini-card" v-for="item in related" :key="item.name">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price }} $US</p>
          <span :class="{ up: item.evo > 0, down: item.evo < 0 }">
            {{ item.evo > 0 ? '+' : '' }}{{ item.evo }}%
          </span>
          <div class="mini-chart">[Mini Chart]</div>
        </div>
      </div>

      <button class="btn-see-more">Voir plus</button>
    </section>

    <!-- COMMENTAIRES -->
    <section class="card comments-section">
      <h3>Commentaires</h3>

      <textarea placeholder="Se connecter pour écrire un commentaire..."></textarea>

      <div class="comment" v-for="com in comments" :key="com.id">
        <p><strong>@{{ com.user }}</strong></p>
        <p>{{ com.text }}</p>
      </div>

      <button class="btn-see-more">Voir plus</button>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cryptoSymbol = ref("BTC");

// Toujours Bitcoin par défaut pour l'instant
const cryptoName = "Bitcoin";
const cryptoLogo = "https://cryptologos.cc/logos/bitcoin-btc-logo.png";


/* CHIFFRES CLÉS */
const stats = [
  { label: "1 H", value: 1.19 },
  { label: "6 H", value: 1.13 },
  { label: "12 H", value: 1.23 },
  { label: "1 J", value: 1.02 },
  { label: "3 J", value: 1.04 },
  { label: "7 J", value: 1.05 },
  { label: "15 J", value: 1.14 },
];

/* BUY LINKS (CLIQUABLES) */
const buyLinks = [
  { name: "Binance", url: "https://www.binance.com" },
  { name: "Kraken", url: "https://www.kraken.com" },
  { name: "eToro", url: "https://www.etoro.com" },
];

/* CONVERTISSEUR (local) */
const amount = ref(1);
const cryptoPrices = {
  BTC: 115990,
  ETH: 3250,
  SOL: 148
};

const convertedValue = computed(() => {
  const price = cryptoPrices[cryptoSymbol.value] || 0;
  return (amount.value * price).toLocaleString("fr-FR");
});

/* CRYPTOS SIMILAIRES */
const related = [
  { name: "Ethereum", price: "3 250", evo: +1.23 },
  { name: "XRP", price: "0,56", evo: -2.56 },
  { name: "Solana", price: "148", evo: +1.56 },
  { name: "BNB", price: "528", evo: +2.45 },
];

/* COMMENTAIRES */
const comments = [
  { id: 1, user: "tutu", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
  { id: 2, user: "gfd", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
  { id: 3, user: "qthj", text: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
];
</script>

<style scoped>

/* ————————————————————————————————
   GLOBAL PAGE STRUCTURE
———————————————————————————————— */
.crypto-detail {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #f5f5f5;
}


/* -———————————————————————————————————————
   TITRE + LOGO
———————————————————————————————— */

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-row h1 {
  margin: 0;
  padding: 0;
  font-size: 34px;
  font-weight: 800;
  color: var(--primary);
}

.crypto-logo {
  width: 45px;
  height: 45px;
}


/* ————————————————————————————————
   HEADER (Titre + Logo)
———————————————————————————————— */
.header-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-section h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
}

.crypto-logo {
  width: 42px;
  height: 42px;
}

/* ————————————————————————————————
   CHIFFRES CLÉS
———————————————————————————————— */
.section-title {
  font-size: 22px;
  color: var(--primary);
  margin-bottom: 8px;
  font-weight: bold;
}

.key-stats {
  background: #1f1f1f;
  border: 1px solid #3b3b3b;
  padding: 18px;
  border-radius: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stat-item {
  background: #262626;
  padding: 14px;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  text-align: center;
}

.label {
  font-size: 13px;
  color: #bbbbbb;
}

.stat-value {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 18px;
}

.value.up { color: #3ddc84; font-weight: 600; }
.value.down { color: #ff5c5c; font-weight: 600; }

.arrow.up { color: #3ddc84; }
.arrow.down { color: #ff5c5c; }

/* ————————————————————————————————
   GRAPHIQUE + PARAMÈTRES
———————————————————————————————— */
.card {
  background: #1f1f1f;
  border: 1px solid #3a3a3a;
  padding: 20px;
  border-radius: 12px;
}

.chart-section {
  display: flex;
  gap: 20px;
}

.chart-area {
  flex: 3;
}

.chart-area h3 {
  color: var(--primary);
  margin-bottom: 10px;
}

.chart-placeholder {
  height: 260px;
  border: 2px dashed #666;
  background: #2a2a2a;
  border-radius: 10px;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* PARAMETRES */
.chart-params {
  flex: 1;
  background: #262626;
  border: 1px solid #444;
  padding: 18px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chart-params h3 {
  color: var(--primary);
}

.chart-params label {
  font-size: 14px;
  color: #ddd;
}

.chart-params select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #1f1f1f;
  color: white;
}

/* ————————————————————————————————
   LIEUX D'ACHAT
———————————————————————————————— */
.buy-section ul {
  padding-left: 20px;
}

.buy-section li {
  margin: 4px 0;
}

.buy-section a {
  color: var(--primary);
  text-decoration: underline;
}

/* ————————————————————————————————
   CONVERTISSEUR
———————————————————————————————— */
.converter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.converter-grid input,
.converter-grid select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #2a2a2a;
  color: white;
  font-size: 15px;
}

/* ————————————————————————————————
   CRYPTOS SIMILAIRES
———————————————————————————————— */
.crypto-cards {
  display: flex;
  gap: 18px;
}

.mini-card {
  flex: 1;
  background: #262626;
  border: 1px solid #444;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.mini-card h4 {
  color: var(--primary);
  margin-bottom: 6px;
}

.mini-card span.up { color: #3ddc84; }
.mini-card span.down { color: #ff5c5c; }

.mini-chart {
  width: 100%;
  height: 55px;
  background: #333;
  border-radius: 6px;
  margin-top: 8px;
}

/* ————————————————————————————————
   COMMENTAIRES
———————————————————————————————— */
.comments-section h3 {
  color: var(--primary);
}

.comments-section textarea {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #555;
  padding: 12px;
  background: #2a2a2a;
  color: white;
  font-size: 15px;
}

.comment {
  border-top: 1px solid #444;
  padding-top: 10px;
  padding-bottom: 8px;
}

.comment p strong {
  color: var(--primary);
}

.btn-see-more {
  padding: 8px 12px;
  background: var(--primary);
  color: #000;
  border-radius: 6px;
  margin-top: 12px;
  font-weight: bold;
}


/* -------------------------------------------------------------------
   🌙 DARK MODE — appliqué lorsque <html class="dark">
------------------------------------------------------------------- */
:root.dark .crypto-detail {
  background: var(--bg-primary);
  color: var(--text-color);
}

/* Cards et blocs */
:root.dark .card,
:root.dark .key-stats,
:root.dark .stat-item,
:root.dark .chart-params,
:root.dark .mini-card,
:root.dark .converter-grid input,
:root.dark .converter-grid select,
:root.dark .comments-section textarea {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-color);
}

/* Placeholder graphique */
:root.dark .chart-placeholder {
  background: #2a2a2a;
  border-color: #555;
  color: #aaa;
}

/* Stat valeurs */
:root.dark .label {
  color: var(--text-light);
}

/* Liens d'achat */
:root.dark .buy-section a {
  color: var(--primary);
}

/* Inputs convertisseur */
:root.dark input,
:root.dark select,
:root.dark textarea {
  background: var(--bg-secondary);
  color: var(--text-color);
  border-color: var(--border-color);
}

/* Bouton Voir plus */
:root.dark .btn-see-more {
  background: var(--primary);
  color: #000;
}

/* -------------------------------------------------------------------
   ☀️ LIGHT MODE — appliqué lorsque <html class="light">
------------------------------------------------------------------- */
:root.light .crypto-detail {
  background: #f9f4eb; /* fond clair comme ta maquette */
  color: #222;
}

/* Cards et composant */
:root.light .card,
:root.light .key-stats,
:root.light .stat-item,
:root.light .chart-params,
:root.light .mini-card,
:root.light .converter-grid input,
:root.light .converter-grid select,
:root.light .comments-section textarea {
  background: white;
  border-color: #ddd;
  color: #222;
}

/* Placeholder graphique */
:root.light .chart-placeholder {
  background: #fafafa;
  border-color: #ccc;
  color: #666;
}

/* Label chiffres clés */
:root.light .label {
  color: #555;
}

/* Convertisseur */
:root.light input,
:root.light select,
:root.light textarea {
  background: white;
  border-color: #ccc;
  color: #222;
}

/* Bouton voir plus */
:root.light .btn-see-more {
  background: var(--primary);
  color: #000;
}

/* Arrow couleurs (restent identiques) */
:root.light .arrow.up { color: #3ddc84; }
:root.light .arrow.down { color: #ff5c5c; }

/* Mini chart */
:root.light .mini-chart {
  background: #eaeaea;
}


</style>
