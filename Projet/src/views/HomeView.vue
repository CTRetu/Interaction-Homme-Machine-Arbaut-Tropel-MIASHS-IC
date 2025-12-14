<template>
  <div class="home">

    <!-- Bandeau d’intro -->
    <section class="intro-section">
      <h1>TOP CRYPTO</h1>
      <h2>Bienvenue sur Top Crypto !</h2>
      <p>
        Ceci est un site de visualisation des crypto-monnaies les plus importantes du marché actuel.
      </p>
      <h3>Améliorez vos suivis et analyses avec Top Crypto !</h3>
    </section>

    <!-- Section : Gagnants / Tendance -->
    <section class="flex-section">

      <div class="card tendance-card">
        <h2>🔥 Tendance Générale</h2>
        <div class="tendance-content">
          <div class="tendance-item">
            <div class="tendance-label">Capitalisation boursière</div>
            <div class="tendance-value">{{ formatPrice(totalMarketCap) }}</div>
            <div :class="['tendance-change', marketCapChange7d >= 0 ? 'positive' : 'negative']">
              <span v-if="marketCapChange7d >= 0">▲</span>
              <span v-else>▼</span>
              {{ Math.abs(marketCapChange7d).toFixed(2) }}%
            </div>
          </div>
          <div class="tendance-item">
            <div class="tendance-label">Volume</div>
            <div class="tendance-value">{{ formatPrice(totalVolume) }}</div>
            <div :class="['tendance-change', volumeChange7d >= 0 ? 'positive' : 'negative']">
              <span v-if="volumeChange7d >= 0">▲</span>
              <span v-else>▼</span>
              {{ Math.abs(volumeChange7d).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>

    <div class="card">
      <h2>Grands Gagnants 24H</h2>

      <table class="gagnants-table">
        <tbody>
          <tr v-for="(coin, index) in topGainers24h" :key="coin.id">
            <td>{{ index + 1 }}</td>
            <td class="coin-name">
              <img :src="coin.image" alt="" width="20" />
              {{ coin.name }}
            </td>
            <td><span class="trend-up">{{ formatPercent(coin.price_change_percentage_24h_in_currency) }}</span></td>
            <td>{{ formatPrice(coin.current_price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>


      <div class="card">
        <h2>Grands Gagnants 1H</h2>
          <table class="gagnants-table">
            <tbody>
              <tr v-for="(coin, index) in topGainers1h" :key="coin.id">
                <td>{{ index + 1 }}</td>
                <td class="coin-name">
                  <img :src="coin.image" alt="" width="20" />
                  {{ coin.name }}
                </td>
                <td><span class="trend-up">{{ formatPercent(coin.price_change_percentage_1h_in_currency) }}</span></td>
                <td>{{ formatPrice(coin.current_price) }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </section>

    <!-- Section : Focus TOP 1 -->
    <section class="card big-card focus-card">
      <h2>Focus sur le TOP 1</h2>
      
      <div v-if="topCrypto" class="focus-content">
        <div class="focus-header">
          <img :src="topCrypto.image" alt="" width="40" />
          <RouterLink :to="`/crypto/${topCrypto.id}`" class="crypto-name-link">
            <h3>{{ topCrypto.name }}</h3>
          </RouterLink>
        </div>
        
        <div class="focus-main">
          <div class="focus-chart-container">
            <div id="top-crypto-chart" class="top-crypto-chart"></div>
          </div>
          
          <div class="focus-evolution">
            <div class="evolution-header">
              <span class="chart-icon">📈</span>
              <h4>Évolution</h4>
            </div>
            <table class="evolution-table">
              <tbody>
                <tr>
                  <td>1 H</td>
                  <td :class="color(topCrypto.price_change_percentage_1h_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_1h_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_1h_in_currency)) }}
                  </td>
                </tr>
                <tr>
                  <td>24 H</td>
                  <td :class="color(topCrypto.price_change_percentage_24h_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_24h_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_24h_in_currency)) }}
                  </td>
                </tr>
                <tr>
                  <td>3 J</td>
                  <td :class="color(topCrypto.price_change_percentage_7d_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_7d_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_7d_in_currency * 0.43)) }}
                  </td>
                </tr>
                <tr>
                  <td>7 J</td>
                  <td :class="color(topCrypto.price_change_percentage_7d_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_7d_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_7d_in_currency)) }}
                  </td>
                </tr>
                <tr>
                  <td>14 J</td>
                  <td :class="color(topCrypto.price_change_percentage_14d_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_14d_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_14d_in_currency)) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="focus-price">
          <span class="price-label">Prix actuel :</span>
          <span class="price-value">{{ formatPrice(topCrypto.current_price) }}</span>
        </div>
      </div>
    </section>

    <!-- Section : Tableau des cryptos -->
    <section class="card">
      <RouterLink to="/crypto-table" class="table-title">
        <h2>Tableau récapitulatif des 10 crypto-monnaies les plus importantes</h2>
      </RouterLink>

      <div class="crypto-table-wrapper">
        <table class="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Cours</th>
              <th>1 H</th>
              <th>24 H</th>
              <th>7 J</th>
              <th>14 J</th>
              <th>Volume 24 H</th>
              <th>Capitalisation</th>
              <th>Évolution 7 J</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(coin, index) in topTenCryptos" :key="coin.id">
              <td>{{ index + 1 }}</td>
              <td style="text-align: left;" :title="coin.name"><img :src="coin.image" alt="" width="20" style="margin-right: 8px;" />{{ coin.name }}</td>
              <td>{{ formatPrice(coin.current_price) }}</td>
              <td :class="color(coin.price_change_percentage_1h_in_currency)">
                {{ formatPercent(coin.price_change_percentage_1h_in_currency) }}
              </td>
              <td :class="color(coin.price_change_percentage_24h_in_currency)">
                {{ formatPercent(coin.price_change_percentage_24h_in_currency) }}
              </td>
              <td :class="color(coin.price_change_percentage_7d_in_currency)">
                {{ formatPercent(coin.price_change_percentage_7d_in_currency) }}
              </td>
              <td :class="color(coin.price_change_percentage_14d_in_currency)">
                {{ formatPercent(coin.price_change_percentage_14d_in_currency) }}
              </td>
              <td>{{ formatPrice(coin.total_volume) }}</td>
              <td>{{ formatPrice(coin.market_cap) }}</td>

              <!-- Sparkline -->
              <td>
                <div :id="'spark-home-' + index" class="sparkline"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <RouterLink to="/crypto-table" class="btn-primary btn-see-more">
            Voir plus →
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- Section : Communauté -->
    <section class="card community-section">
      <RouterLink to="/community" class="community-title">
        <h2>Communauté</h2>
      </RouterLink>
      
      <div class="community-carousel">
        <div class="community-item" v-for="item in communityItems" :key="item.id">
          <RouterLink v-if="item.type === 'Article'" :to="item.link" class="community-card-link">
            <div class="community-card">
              <div class="community-header">
                <h3>{{ item.type }}</h3>
                <div class="community-author">{{ item.author }}</div>
              </div>
              <div class="community-content">
                <h4 v-if="item.title">{{ item.title }}</h4>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </RouterLink>
          <div v-else class="community-card">
            <div class="community-header">
              <h3>{{ item.type }}</h3>
              <div class="community-author">{{ item.author }}</div>
            </div>
            <div class="community-content">
              <h4 v-if="item.title">{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
        
        <RouterLink to="/community" class="btn-voir-plus">
          Voir plus →
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import Highcharts from 'highcharts';

const cryptos = ref([]);

const communityItems = ref([
  {
    id: 1,
    type: 'Commentaire',
    author: '@tutu',
    content: 'Le marché des cryptos montre des signes de reprise impressionnants. Les volumes d\'échange augmentent de manière significative.'
  },
  {
    id: 2,
    type: 'Article',
    author: '@tuti',
    title: 'Bitcoin : Tendance à la hausse confirmée ?',
    content: 'Les analystes prévoient une continuation de la tendance haussière pour Bitcoin dans les prochaines semaines...',
    link: '/community/articles/1'
  },
  {
    id: 3,
    type: 'Article',
    author: '@titi',
    title: 'Ethereum 2.0 : L\'avenir de la DeFi',
    content: 'Ethereum continue de dominer l\'écosystème DeFi avec une augmentation constante du nombre de validateurs...',
    link: '/community/articles/2'
  },
  {
    id: 4,
    type: 'Commentaire',
    author: '@tata',
    content: 'La diversification reste la clé dans l\'investissement crypto. Ne jamais mettre tous ses œufs dans le même panier !'
  }
]);

const topTenCryptos = computed(() => {
  return cryptos.value.slice(0, 10);
});

const topGainers24h = computed(() => {
  return [...cryptos.value]
    .filter(coin => coin.price_change_percentage_24h_in_currency > 0)
    .sort((a, b) => b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency)
    .slice(0, 5);
});

const topGainers1h = computed(() => {
  return [...cryptos.value]
    .filter(coin => coin.price_change_percentage_1h_in_currency > 0)
    .sort((a, b) => b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency)
    .slice(0, 5);
});

const totalMarketCap = computed(() => {
  return cryptos.value.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
});

const totalVolume = computed(() => {
  return cryptos.value.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
});

const marketCapChange7d = computed(() => {
  if (cryptos.value.length === 0) return 0;
  const totalChange = cryptos.value.reduce((sum, coin) => {
    return sum + (coin.price_change_percentage_7d_in_currency || 0);
  }, 0);
  return totalChange / cryptos.value.length;
});

const volumeChange7d = computed(() => {
  if (cryptos.value.length === 0) return 0;
  const totalChange = cryptos.value.reduce((sum, coin) => {
    return sum + (coin.price_change_percentage_7d_in_currency || 0);
  }, 0);
  return totalChange / cryptos.value.length;
});

const topCrypto = computed(() => {
  return cryptos.value.length > 0 ? cryptos.value[0] : null;
});

async function fetchCryptos() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1" +
    "&sparkline=true&price_change_percentage=1h,24h,7d,14d";

  const res = await fetch(url);
  const data = await res.json();

  data.forEach(coin => {
    coin.sparkline = coin.sparkline_in_7d?.price || [];
  });

  cryptos.value = data;

  nextTick(() => {
    sortCryptos();
  });
}

function sortCryptos() {
  // Trier par capitalisation décroissante pour avoir le vrai TOP 1
  cryptos.value.sort((a, b) => b.market_cap - a.market_cap);
  nextTick(() => {
    renderSparklines();
    renderTopCryptoChart();
  });
}

function renderSparklines() {
  topTenCryptos.value.forEach((coin, index) => {
    const containerId = 'spark-home-' + index;
    const el = document.getElementById(containerId);
    if (!el || !coin.sparkline || coin.sparkline.length === 0) return;

    const options = sparklineOptions(coin.sparkline);
    Highcharts.chart(containerId, options);
  });
}

function renderTopCryptoChart() {
  const el = document.getElementById('top-crypto-chart');
  if (!el || !topCrypto.value || !topCrypto.value.sparkline || topCrypto.value.sparkline.length === 0) return;

  const data = topCrypto.value.sparkline;
  const isUp = data[data.length - 1] > data[0];

  Highcharts.chart('top-crypto-chart', {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: topCrypto.value.current_price.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'USD',
      }),
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: '700'
      }
    },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      type: 'datetime',
      labels: {
        style: { color: '#94a3b8' },
        formatter: function() {
          const date = new Date(Date.now() - (168 - this.value) * 3600000);
          return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        }
      },
      gridLineColor: '#1e293b',
      lineColor: '#334155'
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: { color: '#94a3b8' },
        formatter: function() {
          return this.value.toLocaleString('fr-FR') + ' $';
        }
      },
      gridLineColor: '#1e293b'
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: { color: '#ffffff' },
      formatter: function() {
        return '<b>' + this.y.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'USD',
        }) + '</b>';
      }
    },
    plotOptions: {
      area: {
        lineWidth: 3,
        marker: { enabled: false },
        color: isUp ? '#16a34a' : '#dc2626',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, isUp ? 'rgba(22, 163, 74, 0.4)' : 'rgba(220, 38, 38, 0.4)'],
            [1, 'rgba(0, 0, 0, 0)']
          ]
        },
        states: {
          hover: {
            lineWidth: 3
          }
        }
      }
    },
    series: [{
      data: data,
    }],
  });
}

function sparklineOptions(data) {
  const isUp = data[data.length - 1] > data[0];

  return {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 40,
      width: 120,
      margin: [2, 0, 2, 0],
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: { visible: false },
    yAxis: { visible: false },
    tooltip: {
      enabled: true,
      formatter: function() {
        return this.y.toFixed(2) + ' $US';
      }
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: { enabled: false },
        color: isUp ? "#16a34a" : "#dc2626",
      },
    },
    series: [
      {
        data,
      },
    ],
  };
}

function formatPrice(value) {
  return value
    ? value.toLocaleString("fr-FR", {
        style: "currency",
        currency: "USD",
      })
    : "-";
}

function formatPercent(value) {
  return value !== undefined ? value.toFixed(2) + " %" : "-";
}

function color(value) {
  return value > 0 ? "positive" : "negative";
}

fetchCryptos();
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0;
}

/* Intro */
.intro-section {
  margin-bottom: 20px;
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.intro-section h1 {
  font-size: 56px;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.intro-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
}

.intro-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary);
  margin-top: 24px;
  font-style: italic;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .flex-section .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .flex-section {
    flex-direction: column;
  }
  
  .flex-section .card {
    flex: 1 1 100%;
  }
}

.intro-section p {
  max-width: 700px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
  color: #cbd5e1;
}

/* Section horizontale */
.flex-section {
  display: flex;
  gap: 20px;
}

/* Cards */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 12px;
  flex: 1;
}

.big-card {
  min-height: 250px;
}

/* Table styles */
.crypto-table-wrapper {
  overflow-x: auto;
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.crypto-table thead {
  background-color: var(--bg-tertiary);
}

.crypto-table th {
  padding: 12px;
  text-align: right;
  font-weight: 600;
  color: var(--text-secondary);
}

.crypto-table th:first-child,
.crypto-table td:first-child {
  text-align: center;
}

.crypto-table th:nth-child(2),
.crypto-table td:nth-child(2) {
  text-align: left;
}

.crypto-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.crypto-table tbody tr:hover {
  background-color: var(--bg-tertiary);
}

.crypto-table td {
  padding: 12px;
  text-align: right;
  color: var(--text-primary);
}

.crypto-table img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}

.crypto-table .positive {
  color: #16a34a;
  font-weight: 500;
}

.crypto-table .negative {
  color: #dc2626;
  font-weight: 500;
}

.sparkline {
  height: 40px;
}

.table-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


/* Styles pour les tableaux de gagnants */
.gagnants-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-top: 16px;
}

.gagnants-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}

.gagnants-table td:first-child {
  font-weight: 600;
  color: var(--text-secondary);
  width: 30px;
}

.gagnants-table td.coin-name {
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}

.gagnants-table td.coin-name img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.gagnants-table td:last-child {
  text-align: right;
  font-weight: 500;
}

.gagnants-table .trend-up {
  color: #16a34a;
  font-weight: 600;
}

@media (max-width: 480px) {
  .gagnants-table {
    font-size: 12px;
  }
  
  .gagnants-table td {
    padding: 8px 4px;
  }
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 32px;
  background-color: var(--primary);
  color: white !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.btn-see-more {
  margin-top: 20px;
}

/* Tendance Générale */
.tendance-card {
  min-height: auto;
}

.tendance-content {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tendance-item {
  flex: 1;
  min-width: 200px;
}

.tendance-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}

.tendance-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.tendance-change {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tendance-change.positive {
  color: #16a34a;
}

.tendance-change.negative {
  color: #dc2626;
}

/* Section Communauté */
.community-title {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s;
}

.community-title:hover {
  transform: translateX(4px);
}

.community-section h2 {
  margin-bottom: 24px;
  color: var(--primary);
  cursor: pointer;
}

.table-title {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s;
}

.table-title:hover {
  transform: translateX(4px);
}

.table-title h2 {
  cursor: pointer;
}

.community-carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 16px;
  scroll-behavior: smooth;
}

.community-carousel::-webkit-scrollbar {
  height: 8px;
}

.community-carousel::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 4px;
}

.community-carousel::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.community-carousel::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

.community-item {
  flex: 0 0 280px;
  min-width: 280px;
}

.community-card {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.community-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.community-header {
  margin-bottom: 12px;
}

.community-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.community-author {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.community-content {
  flex: 1;
}

.community-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.community-content p {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.community-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.btn-voir-plus {
  flex: 0 0 auto;
  align-self: center;
  display: inline-block;
  padding: 12px 32px;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s;
  white-space: nowrap;
  margin-left: 20px;
}

.btn-voir-plus:hover {
  background-color: var(--primary-hover);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .tendance-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .tendance-item {
    min-width: 100%;
  }
  
  .intro-section h1 {
    font-size: 40px;
  }
  
  .intro-section h2 {
    font-size: 22px;
  }
  
  .intro-section h3 {
    font-size: 18px;
  }
  
  .community-item {
    flex: 0 0 240px;
    min-width: 240px;
  }
  
  .btn-voir-plus {
    margin-left: 0;
    margin-top: 20px;
  }
}

/* Focus TOP 1 */
.focus-card {
  min-height: auto;
}

.focus-content {
  margin-top: 20px;
}

.focus-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-color);
}

.focus-header img {
  width: 40px;
  height: 40px;
}

.crypto-name-link {
  text-decoration: none;
  transition: transform 0.2s;
  color: var(--text-primary);
}

.crypto-name-link:hover {
  transform: translateX(4px);
  color: var(--primary);
}

.crypto-name-link h3 {
  color: inherit;
}

.focus-header h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
}

.focus-main {
  display: flex;
  gap: 30px;
  margin-bottom: 24px;
}

.focus-chart-container {
  flex: 1;
  min-width: 0;
}

.top-crypto-chart {
  width: 100%;
  height: 300px;
}

.focus-evolution {
  flex: 0 0 250px;
  background: var(--bg-tertiary);
  border: 2px solid var(--primary);
  border-radius: 8px;
  padding: 20px;
}

.evolution-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.chart-icon {
  font-size: 20px;
}

.evolution-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.evolution-table {
  width: 100%;
  border-collapse: collapse;
}

.evolution-table tr {
  border-bottom: 1px solid var(--border-color);
}

.evolution-table tr:last-child {
  border-bottom: none;
}

.evolution-table td {
  padding: 12px 8px;
  font-size: 15px;
}

.evolution-table td:first-child {
  color: var(--text-secondary);
  font-weight: 500;
}

.evolution-table td:last-child {
  text-align: right;
  font-weight: 600;
  font-size: 16px;
}

.evolution-table td.positive {
  color: #16a34a;
}

.evolution-table td.negative {
  color: #dc2626;
}

.focus-price {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.price-label {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
}

.price-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

@media (max-width: 1024px) {
  .focus-main {
    flex-direction: column;
  }
  
  .focus-evolution {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .focus-header h3 {
    font-size: 22px;
  }
  
  .top-crypto-chart {
    height: 250px;
  }
  
  .price-value {
    font-size: 20px;
  }
}
</style>
