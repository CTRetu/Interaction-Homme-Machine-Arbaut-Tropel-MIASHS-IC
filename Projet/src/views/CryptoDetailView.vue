<template>
  <div class="crypto-detail">
    <br/>
    <!-- TITRE + LOGO -->
    <section class="header-section">
      <div class="title-row">
        <h1>{{ cryptoData.name || 'Chargement...' }}</h1>
        <img v-if="cryptoData.image" :src="cryptoData.image" alt="logo" class="crypto-logo" />
      </div>
    </section>

    <!-- CHIFFRES CLÉS -->
    <section class="key-stats card">
      <h2 class="section-title">Chiffres clés</h2>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="label">1 H</span>
          <div class="stat-value">
            <span
              :class="{ up: cryptoData.price_change_percentage_1h_in_currency > 0, down: cryptoData.price_change_percentage_1h_in_currency < 0 }"
              class="value"
            >
              {{ cryptoData.price_change_percentage_1h_in_currency > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_1h_in_currency) }}
            </span>
            <span
              class="arrow"
              :class="{ up: cryptoData.price_change_percentage_1h_in_currency > 0, down: cryptoData.price_change_percentage_1h_in_currency < 0 }"
            >
              {{ cryptoData.price_change_percentage_1h_in_currency > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">6 H</span>
          <div class="stat-value">
            <span
              :class="{ up: (cryptoData.price_change_percentage_24h_in_currency * 0.25) > 0, down: (cryptoData.price_change_percentage_24h_in_currency * 0.25) < 0 }"
              class="value"
            >
              {{ (cryptoData.price_change_percentage_24h_in_currency * 0.25) > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_24h_in_currency * 0.25) }}
            </span>
            <span
              class="arrow"
              :class="{ up: (cryptoData.price_change_percentage_24h_in_currency * 0.25) > 0, down: (cryptoData.price_change_percentage_24h_in_currency * 0.25) < 0 }"
            >
              {{ (cryptoData.price_change_percentage_24h_in_currency * 0.25) > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">12 H</span>
          <div class="stat-value">
            <span
              :class="{ up: (cryptoData.price_change_percentage_24h_in_currency * 0.5) > 0, down: (cryptoData.price_change_percentage_24h_in_currency * 0.5) < 0 }"
              class="value"
            >
              {{ (cryptoData.price_change_percentage_24h_in_currency * 0.5) > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_24h_in_currency * 0.5) }}
            </span>
            <span
              class="arrow"
              :class="{ up: (cryptoData.price_change_percentage_24h_in_currency * 0.5) > 0, down: (cryptoData.price_change_percentage_24h_in_currency * 0.5) < 0 }"
            >
              {{ (cryptoData.price_change_percentage_24h_in_currency * 0.5) > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">1 J</span>
          <div class="stat-value">
            <span
              :class="{ up: cryptoData.price_change_percentage_24h_in_currency > 0, down: cryptoData.price_change_percentage_24h_in_currency < 0 }"
              class="value"
            >
              {{ cryptoData.price_change_percentage_24h_in_currency > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_24h_in_currency) }}
            </span>
            <span
              class="arrow"
              :class="{ up: cryptoData.price_change_percentage_24h_in_currency > 0, down: cryptoData.price_change_percentage_24h_in_currency < 0 }"
            >
              {{ cryptoData.price_change_percentage_24h_in_currency > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">3 J</span>
          <div class="stat-value">
            <span
              :class="{ up: (cryptoData.price_change_percentage_7d_in_currency * 0.43) > 0, down: (cryptoData.price_change_percentage_7d_in_currency * 0.43) < 0 }"
              class="value"
            >
              {{ (cryptoData.price_change_percentage_7d_in_currency * 0.43) > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_7d_in_currency * 0.43) }}
            </span>
            <span
              class="arrow"
              :class="{ up: (cryptoData.price_change_percentage_7d_in_currency * 0.43) > 0, down: (cryptoData.price_change_percentage_7d_in_currency * 0.43) < 0 }"
            >
              {{ (cryptoData.price_change_percentage_7d_in_currency * 0.43) > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">7 J</span>
          <div class="stat-value">
            <span
              :class="{ up: cryptoData.price_change_percentage_7d_in_currency > 0, down: cryptoData.price_change_percentage_7d_in_currency < 0 }"
              class="value"
            >
              {{ cryptoData.price_change_percentage_7d_in_currency > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_7d_in_currency) }}
            </span>
            <span
              class="arrow"
              :class="{ up: cryptoData.price_change_percentage_7d_in_currency > 0, down: cryptoData.price_change_percentage_7d_in_currency < 0 }"
            >
              {{ cryptoData.price_change_percentage_7d_in_currency > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <div class="stat-item">
          <span class="label">15 J</span>
          <div class="stat-value">
            <span
              :class="{ up: cryptoData.price_change_percentage_14d_in_currency > 0, down: cryptoData.price_change_percentage_14d_in_currency < 0 }"
              class="value"
            >
              {{ cryptoData.price_change_percentage_14d_in_currency > 0 ? '+' : '' }}{{ formatPercent(cryptoData.price_change_percentage_14d_in_currency) }}
            </span>
            <span
              class="arrow"
              :class="{ up: cryptoData.price_change_percentage_14d_in_currency > 0, down: cryptoData.price_change_percentage_14d_in_currency < 0 }"
            >
              {{ cryptoData.price_change_percentage_14d_in_currency > 0 ? '▲' : '▼' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- GRAPHIQUE + PARAMÈTRES -->
    <section class="chart-section card">

      <div class="chart-area">
        <div class="chart-tabs">
          <button
            :class="['chart-tab', { active: activeTab === 'cours' }]"
            @click="activeTab = 'cours'; renderChart();"
          >
            Cours
          </button>
          <button
            :class="['chart-tab', { active: activeTab === 'trading' }]"
            @click="activeTab = 'trading'; renderChart();"
          >
            Trading View
          </button>
          <button
            :class="['chart-tab', { active: activeTab === 'volume' }]"
            @click="activeTab = 'volume'; renderChart();"
          >
            Volume
          </button>
          <button
            :class="['chart-tab', { active: activeTab === 'capitalisation' }]"
            @click="activeTab = 'capitalisation'; renderChart();"
          >
            Capitalisation
          </button>
          <button
            :class="['chart-tab', { active: activeTab === 'prediction' }]"
            @click="activeTab = 'prediction'; renderChart();"
          >
            Prédiction
          </button>
        </div>
        <div id="crypto-detail-chart" class="chart-placeholder"></div>
      </div>

      <div class="chart-params">
        <h3>Paramètres</h3>

        <label>Période :</label>
        <select v-model="period">
          <option value="7">1 semaine</option>
          <option value="30">1 mois</option>
          <option value="365">1 an</option>
        </select>

        <label>Comparaison :</label>
        <select v-model="comparison">
          <option value="">Aucune</option>
          <option value="ethereum">Ethereum</option>
          <option value="binancecoin">BNB</option>
        </select>

        <label>Devise :</label>
        <select v-model="currency">
          <option value="usd">$US</option>
          <option value="eur">€ EUR</option>
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

        <select disabled>
          <option>{{ cryptoData.symbol?.toUpperCase() || 'BTC' }}</option>
        </select>

        <!-- RESULTAT EN DEVISE -->
        <input type="text" :value="convertedValue" disabled />

        <select v-model="currency" @change="updateChart">
          <option value="usd">$US</option>
          <option value="eur">€ EUR</option>
        </select>
      </div>
    </section>

    <!-- CRYPTOS SIMILAIRES -->
    <section class="card related-cryptos">
      <h3>Cryptos similaires</h3>

      <div class="crypto-cards">
        <div class="mini-card" v-for="item in relatedCryptos" :key="item.id">
          <h4>{{ item.name }}</h4>
          <p>{{ formatPrice(item.current_price) }}</p>
          <span :class="{ up: item.price_change_percentage_24h_in_currency > 0, down: item.price_change_percentage_24h_in_currency < 0 }">
            {{ item.price_change_percentage_24h_in_currency > 0 ? '+' : '' }}{{ formatPercent(item.price_change_percentage_24h_in_currency) }}
          </span>
          <div :id="'mini-spark-' + item.id" class="mini-chart"></div>
        </div>
      </div>

      <RouterLink to="/crypto-table" class="btn-see-more">Voir plus →</RouterLink>
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
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import Highcharts from "highcharts/highstock";

const route = useRoute();

// Paramètres du graphique
const period = ref("7");
const comparison = ref("");
const currency = ref("usd");
const amount = ref(1);
const activeTab = ref("cours");

// Données de la crypto
const cryptoData = ref({
  name: '',
  symbol: '',
  image: '',
  current_price: 0,
  price_change_percentage_1h_in_currency: 0,
  price_change_percentage_24h_in_currency: 0,
  price_change_percentage_7d_in_currency: 0,
  price_change_percentage_14d_in_currency: 0,
});

const chartData = ref([]);
const comparisonChartData = ref([]);
const volumeData = ref([]);
const comparisonVolumeData = ref([]);
const marketCapData = ref([]);
const comparisonMarketCapData = ref([]);
const predictionData = ref([]);
const comparisonPredictionData = ref([]);
const relatedCryptos = ref([]);

/* UTILISATEUR CONNECTÉ (même logique que ArticleView) */
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

/* COMMENTAIRES (persistants par crypto) */
const newComment = ref("");
const comments = ref([]);
const storageKey = computed(() => `comments_crypto_${cryptoId.value}`);

function loadComments() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey.value) || "[]");
    comments.value = Array.isArray(stored) ? stored : [];
  } catch {
    comments.value = [];
  }
}

function addComment() {
  if (!newComment.value.trim() || !currentUser) return;
  comments.value.push({ id: Date.now(), author: currentUser.pseudo, text: newComment.value });
  localStorage.setItem(storageKey.value, JSON.stringify(comments.value));
  newComment.value = "";
}

/* BUY LINKS (CLIQUABLES) */
const buyLinks = [
  { name: "Binance", url: "https://www.binance.com" },
  { name: "Kraken", url: "https://www.kraken.com" },
  { name: "eToro", url: "https://www.etoro.com" },
];

/* (Ancien tableau de commentaires supprimé au profit du stockage persistant) */

/* CONVERTISSEUR */
const convertedValue = computed(() => {
  const price = cryptoData.value.current_price || 0;
  const convertedAmount = amount.value * price;
  return convertedAmount.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
});

// Récupérer l'ID de la crypto depuis l'URL
const cryptoId = computed(() => route.params.id || 'bitcoin');

// Récupérer les données de la crypto
async function fetchCryptoData() {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&ids=${cryptoId.value}&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=1h,24h,7d,14d`;

    const res = await fetch(url);
    const data = await res.json();

    if (data && data.length > 0) {
      cryptoData.value = data[0];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Récupérer les données historiques pour le graphique
async function fetchChartData() {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoId.value}/market_chart?vs_currency=${currency.value}&days=${period.value}`;

    const res = await fetch(url);

    if (res.status === 429) {
      alert('Trop de requêtes à l\'API. Veuillez patienter quelques secondes.');
      return;
    }

    const data = await res.json();

    if (data && data.prices) {
      chartData.value = data.prices.map(([timestamp, price]) => [timestamp, price]);
    }

    if (data && data.total_volumes) {
      volumeData.value = data.total_volumes.map(([timestamp, volume]) => [timestamp, volume]);
    }

    if (data && data.market_caps) {
      marketCapData.value = data.market_caps.map(([timestamp, cap]) => [timestamp, cap]);
    }

    // Calculer la prédiction basée sur les données historiques
    if (chartData.value.length > 0) {
      calculatePrediction();
    }

    // Si comparaison activée, récupérer aussi les données de comparaison
    if (comparison.value) {
      const compUrl = `https://api.coingecko.com/api/v3/coins/${comparison.value}/market_chart?vs_currency=${currency.value}&days=${period.value}`;
      const compRes = await fetch(compUrl);

      if (compRes.status === 429) {
        return;
      }

      const compData = await compRes.json();

      if (compData && compData.prices) {
        comparisonChartData.value = compData.prices.map(([timestamp, price]) => [timestamp, price]);
      }

      if (compData && compData.total_volumes) {
        comparisonVolumeData.value = compData.total_volumes.map(([timestamp, volume]) => [timestamp, volume]);
      }

      if (compData && compData.market_caps) {
        comparisonMarketCapData.value = compData.market_caps.map(([timestamp, cap]) => [timestamp, cap]);
      }

      // Calculer la prédiction pour la comparaison
      if (comparisonChartData.value.length > 0) {
        calculateComparisonPrediction();
      }
    } else {
      comparisonChartData.value = [];
      comparisonVolumeData.value = [];
      comparisonMarketCapData.value = [];
      comparisonPredictionData.value = [];
    }

    nextTick(() => {
      renderChart();
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du graphique:', error);
  }
}

// Récupérer les cryptos similaires
async function fetchRelatedCryptos() {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`;

    const res = await fetch(url);
    const data = await res.json();

    if (data && data.length > 0) {
      // Trouver l'index de la crypto actuelle
      const currentIndex = data.findIndex(c => c.id === cryptoId.value);

      // Prendre 6 cryptos proches de la crypto actuelle
      let related = [];
      if (currentIndex !== -1) {
        const start = Math.max(0, currentIndex - 3);
        const end = Math.min(data.length, currentIndex + 4);
        related = data.slice(start, end).filter(c => c.id !== cryptoId.value).slice(0, 6);
      } else {
        // Si non trouvé, prendre les 6 premières
        related = data.slice(0, 6);
      }

      relatedCryptos.value = related;

      nextTick(() => {
        renderMiniSparklines();
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cryptos similaires:', error);
  }
}

// Render les mini sparklines
function renderMiniSparklines() {
  relatedCryptos.value.forEach((coin) => {
    const containerId = 'mini-spark-' + coin.id;
    const el = document.getElementById(containerId);
    if (!el || !coin.sparkline_in_7d || !coin.sparkline_in_7d.price || coin.sparkline_in_7d.price.length === 0) return;

    const data = coin.sparkline_in_7d.price;
    const isUp = data[data.length - 1] > data[0];

    Highcharts.chart(containerId, {
      chart: {
        type: "line",
        backgroundColor: "transparent",
        height: 55,
        margin: [2, 0, 2, 0],
      },
      title: { text: null },
      credits: { enabled: false },
      legend: { enabled: false },
      xAxis: { visible: false },
      yAxis: { visible: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 8,
        borderWidth: 0,
        style: {
          color: '#fff',
          fontSize: '12px'
        },
        formatter: function() {
          const symbol = currency.value === 'usd' ? '$' : '€';
          return `<b>${coin.name}</b><br/>${symbol}${this.y.toFixed(2)}`;
        }
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: { enabled: false },
          color: isUp ? "#16a34a" : "#dc2626",
          states: {
            hover: {
              lineWidth: 2
            }
          }
        },
      },
      series: [{
        data: data,
      }],
    });
  });
}

// Render le graphique principal
function renderChart() {
  const el = document.getElementById('crypto-detail-chart');
  if (!el || chartData.value.length === 0) return;

  if (activeTab.value === 'cours') {
    renderCoursChart();
  } else if (activeTab.value === 'trading') {
    renderTradingChart();
  } else if (activeTab.value === 'volume') {
    renderVolumeChart();
  } else if (activeTab.value === 'capitalisation') {
    renderCapitalizationChart();
  } else if (activeTab.value === 'prediction') {
    renderPredictionChart();
  }
}

// Graphique Cours (area)
function renderCoursChart() {
  const isUp = chartData.value[chartData.value.length - 1][1] > chartData.value[0][1];

  const series = [{
    name: cryptoData.value.name,
    data: chartData.value,
    color: isUp ? '#16a34a' : '#dc2626',
    yAxis: 0,
    fillColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, isUp ? 'rgba(22, 163, 74, 0.4)' : 'rgba(220, 38, 38, 0.4)'],
        [1, 'rgba(0, 0, 0, 0)']
      ]
    },
  }];

  // Configuration des axes Y
  let yAxisConfig = [{
    title: {
      text: cryptoData.value.name,
      style: { color: isUp ? '#16a34a' : '#dc2626', fontWeight: 'bold' }
    },
    labels: {
      style: { color: isUp ? '#16a34a' : '#dc2626' },
      formatter: function() {
        return this.value.toLocaleString('fr-FR') + (currency.value === 'usd' ? ' $' : ' €');
      }
    },
    gridLineColor: '#1e293b',
    opposite: false
  }];

  // Si pas de comparaison, calculer une échelle dynamique pour mieux voir les variations
  if (!comparison.value || comparisonChartData.value.length === 0) {
    const prices = chartData.value.map(d => d[1]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    const margin = range * 0.05; // Marge de 5% pour une meilleure visualisation

    yAxisConfig[0].min = minPrice - margin;
    yAxisConfig[0].max = maxPrice + margin;
  }

  // Ajouter la série de comparaison si activée avec un deuxième axe Y
  if (comparison.value && comparisonChartData.value.length > 0) {
    const compIsUp = comparisonChartData.value[comparisonChartData.value.length - 1][1] > comparisonChartData.value[0][1];
    const compColor = compIsUp ? '#3b82f6' : '#f59e0b';

    series.push({
      name: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1),
      data: comparisonChartData.value,
      color: compColor,
      yAxis: 1,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, compIsUp ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'],
          [1, 'rgba(0, 0, 0, 0)']
        ]
      },
    });

    // Ajouter un deuxième axe Y pour la crypto de comparaison
    yAxisConfig.push({
      title: {
        text: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1),
        style: { color: compColor, fontWeight: 'bold' }
      },
      labels: {
        style: { color: compColor },
        formatter: function() {
          return this.value.toLocaleString('fr-FR') + (currency.value === 'usd' ? ' $' : ' €');
        }
      },
      gridLineColor: 'transparent',
      opposite: true
    });
  }

  Highcharts.chart('crypto-detail-chart', {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 380,
      marginBottom: 60,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: {
      enabled: comparison.value !== '',
      itemStyle: { color: '#94a3b8' }
    },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#94a3b8' } },
      gridLineColor: '#1e293b',
      lineColor: '#334155'
    },
    yAxis: yAxisConfig,
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      shared: true,
      crosshairs: true,
      split: false,
      formatter: function() {
        let tooltip = '<b>' + Highcharts.dateFormat('%e %b %Y', this.x) + '</b><br/>';
        this.points.forEach(point => {
          tooltip += '<span style="color:' + point.color + '">●</span> ' +
                     point.series.name + ': <b>' +
                     point.y.toLocaleString('fr-FR', {
                       minimumFractionDigits: 2,
                       maximumFractionDigits: 2,
                     }) + (currency.value === 'usd' ? ' $' : ' €') + '</b><br/>';
        });
        return tooltip;
      }
    },
    plotOptions: {
      area: {
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 3,
          states: {
            hover: {
              enabled: true,
              radius: 5
            }
          }
        },
        stickyTracking: false,
        states: { hover: { lineWidth: 3 } }
      }
    },
    series: series,
  });
}

// Graphique Trading View (candlestick)
function renderTradingChart() {
  // Transformer les données en format OHLC (Open, High, Low, Close)
  const ohlcData = [];
  const chunkSize = Math.max(1, Math.floor(chartData.value.length / 50));

  for (let i = 0; i < chartData.value.length; i += chunkSize) {
    const chunk = chartData.value.slice(i, i + chunkSize);
    if (chunk.length > 0) {
      const timestamp = chunk[0][0];
      const prices = chunk.map(d => d[1]);
      const open = prices[0];
      const close = prices[prices.length - 1];
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      ohlcData.push({
        x: timestamp,
        open: open,
        high: high,
        low: low,
        close: close,
        color: close >= open ? '#16a34a' : '#dc2626'
      });
    }
  }

  Highcharts.chart('crypto-detail-chart', {
    chart: {
      backgroundColor: 'transparent',
      height: 380,
      marginBottom: 60,
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#94a3b8' } },
      gridLineColor: '#1e293b',
      lineColor: '#334155'
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: { color: '#94a3b8' },
        formatter: function() {
          return this.value.toLocaleString('fr-FR') + (currency.value === 'usd' ? ' $' : ' €');
        }
      },
      gridLineColor: '#1e293b'
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      formatter: function() {
        return '<b>' + Highcharts.dateFormat('%e %b %Y', this.x) + '</b><br/>' +
               'Ouverture: <b>' + this.point.open.toFixed(2) + (currency.value === 'usd' ? ' $' : ' €') + '</b><br/>' +
               'Haut: <b>' + this.point.high.toFixed(2) + (currency.value === 'usd' ? ' $' : ' €') + '</b><br/>' +
               'Bas: <b>' + this.point.low.toFixed(2) + (currency.value === 'usd' ? ' $' : ' €') + '</b><br/>' +
               'Clôture: <b>' + this.point.close.toFixed(2) + (currency.value === 'usd' ? ' $' : ' €') + '</b>';
      }
    },
    plotOptions: {
      candlestick: {
        color: '#dc2626',
        upColor: '#16a34a',
        lineColor: '#dc2626',
        upLineColor: '#16a34a',
      }
    },
    series: [{
      type: 'candlestick',
      name: cryptoData.value.name,
      data: ohlcData,
    }]
  });
}

// Graphique Volume
function renderVolumeChart() {
  if (volumeData.value.length === 0) return;

  const series = [{
    name: cryptoData.value.name + ' Volume',
    data: volumeData.value,
    color: '#3b82f6',
    yAxis: 0
  }];

  let yAxisConfig = [{
    title: {
      text: cryptoData.value.name,
      style: { color: '#3b82f6', fontWeight: 'bold' }
    },
    labels: {
      style: { color: '#3b82f6' },
      formatter: function() {
        return (this.value / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€');
      }
    },
    gridLineColor: '#1e293b',
    opposite: false
  }];

  // Ajouter la comparaison si activée
  if (comparison.value && comparisonVolumeData.value.length > 0) {
    series.push({
      name: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1) + ' Volume',
      data: comparisonVolumeData.value,
      color: '#f59e0b',
      yAxis: 1
    });

    yAxisConfig.push({
      title: {
        text: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1),
        style: { color: '#f59e0b', fontWeight: 'bold' }
      },
      labels: {
        style: { color: '#f59e0b' },
        formatter: function() {
          return (this.value / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€');
        }
      },
      gridLineColor: 'transparent',
      opposite: true
    });
  }

  Highcharts.chart('crypto-detail-chart', {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 380,
      marginBottom: 60,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: {
      enabled: comparison.value !== '',
      itemStyle: { color: '#94a3b8' }
    },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#94a3b8' } },
      gridLineColor: '#1e293b',
      lineColor: '#334155'
    },
    yAxis: yAxisConfig,
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      shared: true,
      crosshairs: true,
      split: false,
      formatter: function() {
        let tooltip = '<b>' + Highcharts.dateFormat('%e %b %Y', this.x) + '</b><br/>';
        this.points.forEach(point => {
          tooltip += '<span style="color:' + point.color + '">●</span> ' +
                     point.series.name + ': <b>' +
                     (point.y / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€') + '</b><br/>';
        });
        return tooltip;
      }
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        stickyTracking: false
      }
    },
    series: series
  });
}

// Graphique Capitalisation
function renderCapitalizationChart() {
  if (marketCapData.value.length === 0) return;

  const isUp = marketCapData.value[marketCapData.value.length - 1][1] > marketCapData.value[0][1];

  const series = [{
    name: cryptoData.value.name,
    data: marketCapData.value,
    color: isUp ? '#16a34a' : '#dc2626',
    yAxis: 0,
    fillColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, isUp ? 'rgba(22, 163, 74, 0.4)' : 'rgba(220, 38, 38, 0.4)'],
        [1, 'rgba(0, 0, 0, 0)']
      ]
    },
  }];

  let yAxisConfig = [{
    title: {
      text: cryptoData.value.name,
      style: { color: isUp ? '#16a34a' : '#dc2626', fontWeight: 'bold' }
    },
    labels: {
      style: { color: isUp ? '#16a34a' : '#dc2626' },
      formatter: function() {
        return (this.value / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€');
      }
    },
    gridLineColor: '#1e293b',
    opposite: false
  }];

  // Si pas de comparaison, calculer une échelle dynamique
  if (!comparison.value || comparisonMarketCapData.value.length === 0) {
    const caps = marketCapData.value.map(d => d[1]);
    const minCap = Math.min(...caps);
    const maxCap = Math.max(...caps);
    const range = maxCap - minCap;
    const margin = range * 0.05;

    yAxisConfig[0].min = minCap - margin;
    yAxisConfig[0].max = maxCap + margin;
  }

  // Ajouter la comparaison si activée
  if (comparison.value && comparisonMarketCapData.value.length > 0) {
    const compIsUp = comparisonMarketCapData.value[comparisonMarketCapData.value.length - 1][1] > comparisonMarketCapData.value[0][1];
    const compColor = compIsUp ? '#3b82f6' : '#f59e0b';

    series.push({
      name: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1),
      data: comparisonMarketCapData.value,
      color: compColor,
      yAxis: 1,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, compIsUp ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'],
          [1, 'rgba(0, 0, 0, 0)']
        ]
      },
    });

    yAxisConfig.push({
      title: {
        text: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1),
        style: { color: compColor, fontWeight: 'bold' }
      },
      labels: {
        style: { color: compColor },
        formatter: function() {
          return (this.value / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€');
        }
      },
      gridLineColor: 'transparent',
      opposite: true
    });
  }

  Highcharts.chart('crypto-detail-chart', {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 380,
      marginBottom: 60,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: {
      enabled: comparison.value !== '',
      itemStyle: { color: '#94a3b8' }
    },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#94a3b8' } },
      gridLineColor: '#1e293b',
      lineColor: '#334155'
    },
    yAxis: yAxisConfig,
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      shared: true,
      crosshairs: true,
      split: false,
      formatter: function() {
        let tooltip = '<b>' + Highcharts.dateFormat('%e %b %Y', this.x) + '</b><br/>';
        this.points.forEach(point => {
          tooltip += '<span style="color:' + point.color + '">●</span> ' +
                     point.series.name + ': <b>' +
                     (point.y / 1000000000).toFixed(2) + 'B ' + (currency.value === 'usd' ? '$' : '€') + '</b><br/>';
        });
        return tooltip;
      }
    },
    plotOptions: {
      area: {
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 3,
          states: {
            hover: {
              enabled: true,
              radius: 5
            }
          }
        },
        stickyTracking: false,
        states: { hover: { lineWidth: 2 } }
      }
    },
    series: series
  });
}

// Calculer la prédiction
function calculatePrediction() {
  if (chartData.value.length < 10) return;

  // Adapter le nombre de points historiques selon la période
  let historyPoints = 30; // par défaut
  let futurePoints = 15; // par défaut

  if (period.value === '7') {
    historyPoints = Math.min(20, chartData.value.length);
    futurePoints = 7; // Prédire 7 jours
  } else if (period.value === '30') {
    historyPoints = Math.min(30, chartData.value.length);
    futurePoints = 15; // Prédire 15 jours
  } else if (period.value === '365') {
    historyPoints = Math.min(90, chartData.value.length);
    futurePoints = 30; // Prédire 30 jours
  }

  // Prendre les derniers points pour la prédiction
  const recentData = chartData.value.slice(-historyPoints);
  const lastTimestamp = recentData[recentData.length - 1][0];

  // Calculer la tendance (régression linéaire simple)
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = recentData.length;

  recentData.forEach((point, i) => {
    sumX += i;
    sumY += point[1];
    sumXY += i * point[1];
    sumX2 += i * i;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Générer les points de prédiction
  const predictionPoints = [];

  // Calculer l'intervalle de temps moyen pour plus de précision
  const timeIntervals = [];
  for (let i = 1; i < Math.min(10, recentData.length); i++) {
    timeIntervals.push(recentData[i][0] - recentData[i-1][0]);
  }
  const timeInterval = timeIntervals.reduce((a, b) => a + b, 0) / timeIntervals.length;

  // Ajouter les données historiques récentes
  predictionData.value = [...recentData];

  // Ajouter les prédictions futures
  for (let i = 1; i <= futurePoints; i++) {
    const futureTimestamp = lastTimestamp + (timeInterval * i);
    const predictedPrice = intercept + slope * (n + i - 1);

    // Ajouter une variation aléatoire pour rendre la prédiction plus réaliste
    const variance = predictedPrice * 0.02; // 2% de variance
    const adjustment = (Math.random() - 0.5) * variance;

    predictionPoints.push([futureTimestamp, predictedPrice + adjustment]);
  }

  predictionData.value = [...predictionData.value, ...predictionPoints];
}

// Calculer la prédiction pour la comparaison
function calculateComparisonPrediction() {
  if (comparisonChartData.value.length < 10) return;

  let historyPoints = 30;
  let futurePoints = 15;

  if (period.value === '7') {
    historyPoints = Math.min(20, comparisonChartData.value.length);
    futurePoints = 7;
  } else if (period.value === '30') {
    historyPoints = Math.min(30, comparisonChartData.value.length);
    futurePoints = 15;
  } else if (period.value === '365') {
    historyPoints = Math.min(90, comparisonChartData.value.length);
    futurePoints = 30;
  }

  const recentData = comparisonChartData.value.slice(-historyPoints);
  const lastTimestamp = recentData[recentData.length - 1][0];

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = recentData.length;

  recentData.forEach((point, i) => {
    sumX += i;
    sumY += point[1];
    sumXY += i * point[1];
    sumX2 += i * i;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const predictionPoints = [];
  const timeIntervals = [];
  for (let i = 1; i < Math.min(10, recentData.length); i++) {
    timeIntervals.push(recentData[i][0] - recentData[i-1][0]);
  }
  const timeInterval = timeIntervals.reduce((a, b) => a + b, 0) / timeIntervals.length;

  comparisonPredictionData.value = [...recentData];

  for (let i = 1; i <= futurePoints; i++) {
    const futureTimestamp = lastTimestamp + (timeInterval * i);
    const predictedPrice = intercept + slope * (n + i - 1);
    const variance = predictedPrice * 0.02;
    const adjustment = (Math.random() - 0.5) * variance;

    predictionPoints.push([futureTimestamp, predictedPrice + adjustment]);
  }

  comparisonPredictionData.value = [...comparisonPredictionData.value, ...predictionPoints];
}

// Graphique Prédiction
function renderPredictionChart() {
  if (predictionData.value.length === 0) return;

  // Adapter le nombre de points historiques selon la période
  let historyPoints = 30;
  if (period.value === '7') {
    historyPoints = Math.min(20, chartData.value.length);
  } else if (period.value === '30') {
    historyPoints = 30;
  } else if (period.value === '365') {
    historyPoints = 90;
  }

  const recentDataLength = Math.min(historyPoints, predictionData.value.length - 1);
  const historicalData = predictionData.value.slice(0, recentDataLength);
  const futureData = predictionData.value.slice(recentDataLength - 1);

  const isUp = futureData[futureData.length - 1][1] > historicalData[historicalData.length - 1][1];

  const series = [
    {
      name: cryptoData.value.name + ' Historique',
      data: historicalData,
      color: '#3b82f6',
      zIndex: 2
    },
    {
      name: cryptoData.value.name + ' Prédiction',
      data: futureData,
      color: isUp ? '#16a34a' : '#dc2626',
      dashStyle: 'ShortDash',
      zIndex: 1
    }
  ];

  // Ajouter la comparaison si activée
  if (comparison.value && comparisonPredictionData.value.length > 0) {
    const compRecentDataLength = Math.min(historyPoints, comparisonPredictionData.value.length - 1);
    const compHistoricalData = comparisonPredictionData.value.slice(0, compRecentDataLength);
    const compFutureData = comparisonPredictionData.value.slice(compRecentDataLength - 1);
    const compIsUp = compFutureData[compFutureData.length - 1][1] > compHistoricalData[compHistoricalData.length - 1][1];

    series.push(
      {
        name: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1) + ' Historique',
        data: compHistoricalData,
        color: '#a855f7',
        zIndex: 2
      },
      {
        name: comparison.value.charAt(0).toUpperCase() + comparison.value.slice(1) + ' Prédiction',
        data: compFutureData,
        color: compIsUp ? '#10b981' : '#f59e0b',
        dashStyle: 'ShortDash',
        zIndex: 1
      }
    );
  }

  Highcharts.chart('crypto-detail-chart', {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      height: 380,
      marginBottom: 60,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: {
      enabled: true,
      itemStyle: { color: '#94a3b8' }
    },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#94a3b8' } },
      gridLineColor: '#1e293b',
      lineColor: '#334155',
      plotLines: [{
        color: '#fbbf24',
        width: 2,
        value: historicalData[historicalData.length - 1][0],
        dashStyle: 'Dash',
        label: {
          text: 'Maintenant',
          style: { color: '#fbbf24' }
        }
      }]
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: { color: '#94a3b8' },
        formatter: function() {
          return this.value.toLocaleString('fr-FR') + (currency.value === 'usd' ? ' $' : ' €');
        }
      },
      gridLineColor: '#1e293b'
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      shared: true,
      crosshairs: true,
      split: false,
      formatter: function() {
        let tooltip = '<b>' + Highcharts.dateFormat('%e %b %Y', this.x) + '</b><br/>';
        this.points.forEach(point => {
          tooltip += '<span style="color:' + point.color + '">●</span> ' +
                     point.series.name + ': <b>' +
                     point.y.toLocaleString('fr-FR', {
                       minimumFractionDigits: 2,
                       maximumFractionDigits: 2,
                     }) + (currency.value === 'usd' ? ' $' : ' €') + '</b><br/>';
        });
        return tooltip;
      }
    },
    plotOptions: {
      line: {
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 3,
          states: {
            hover: {
              enabled: true,
              radius: 5
            }
          }
        },
        stickyTracking: false,
        states: { hover: { lineWidth: 2 } }
      }
    },
    series: series
  });
}

// Mettre à jour le graphique
async function updateChart() {
  await fetchCryptoData();
  await fetchChartData();
}

function formatPercent(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + " %" : "0.00 %";
}

function formatPrice(value) {
  return value
    ? value.toLocaleString("fr-FR", {
        style: "currency",
        currency: currency.value === 'usd' ? "USD" : "EUR",
      })
    : "-";
}

// Initialisation
onMounted(async () => {
  await fetchCryptoData();
  await fetchChartData();
  await fetchRelatedCryptos();
  loadComments();
});

// Watch pour changement de route
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchCryptoData();
    await fetchChartData();
    await fetchRelatedCryptos();
    loadComments();
  }
});

// Watch pour changement de période, comparaison ou devise avec debounce
let filterTimeout = null;
watch([period, comparison, currency], async () => {
  // Annuler le timeout précédent
  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }

  // Attendre 300ms avant de faire la requête pour éviter trop d'appels
  filterTimeout = setTimeout(async () => {
    await updateChart();
  }, 300);
});
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

.chart-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 2px solid #3a3a3a;
  padding-bottom: 0;
}

.chart-tab {
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  bottom: -2px;
}

.chart-tab:hover {
  color: var(--primary);
  background: rgba(251, 191, 36, 0.05);
}

.chart-tab.active {
  color: var(--primary);
  font-weight: 600;
  border-bottom-color: var(--primary);
  background: rgba(251, 191, 36, 0.08);
}

.chart-area h3 {
  color: var(--primary);
  margin-bottom: 10px;
}

.chart-placeholder {
  height: 380px;
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
.comments h2 {
  color: var(--primary);
}

.comments textarea {
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
  color: #fff;
  border-radius: 6px;
  margin-top: 12px;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
}

.btn-see-more:hover,
.btn-see-more:focus,
.btn-see-more:active,
.btn-see-more:visited {
  text-decoration: none;
  color: #fff;
}

/* Ensure publish button text is white */
.comments .btn-primary {
  color: #fff;
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
  color: #fff;
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
  color: #fff;
}

/* Arrow couleurs (restent identiques) */
:root.light .arrow.up { color: #3ddc84; }
:root.light .arrow.down { color: #ff5c5c; }

/* Mini chart */
:root.light .mini-chart {
  background: #eaeaea;
}


</style>
