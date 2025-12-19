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
    <!-- Section : Tableau de bord (si connecté) -->
    <section v-if="userStore.isLoggedIn" class="card dashboard-section">
      <div class="dashboard-header">
        <h2>📊 Mon Tableau de Bord</h2>
        <RouterLink to="/settings" class="dashboard-settings-link">Personnaliser</RouterLink>
      </div>

      <div class="dashboard-grid">
        <div v-for="widgetId in userDashboard" :key="widgetId" class="dashboard-slot">
          <div class="dash-item">
          
            <!-- Widget Nombre -->
            <div v-if="dashboardWidgets[widgetId]?.type === 'number'" class="widget-number">
              <div class="widget-content">
                <h3 class="widget-title" :title="dashboardWidgets[widgetId].title">{{ dashboardWidgets[widgetId].title }}</h3>
                <p class="widget-value"
                   :class="{ 'positive': dashboardWidgets[widgetId].value.includes('+'), 'negative': dashboardWidgets[widgetId].value.includes('-') }"
                   :title="'Valeur actuelle : ' + dashboardWidgets[widgetId].value">
                  {{ dashboardWidgets[widgetId].value }}
                </p>

                <table class="mini-table">
                  <tr v-for="row in getNumberWidgetPageRows(widgetId)" :key="row.key">
                    <td>{{ row.label }}</td>
                    <td class="right">{{ row.value }}</td>
                  </tr>
                </table>
              </div>

              <div class="table-pagination" v-if="getNumberWidgetTotalPages(widgetId) > 1">
                <button @click="goToTablePage(widgetId, 1)">&laquo;</button>
                <button @click="changeTablePage(widgetId, -1)">&lsaquo;</button>
                <span>
                  Page {{ tablePageByWidget[widgetId] || 1 }} / {{ getNumberWidgetTotalPages(widgetId) }}
                </span>
                <button @click="changeTablePage(widgetId, 1)">&rsaquo;</button>
                <button @click="goToTablePage(widgetId, getNumberWidgetTotalPages(widgetId))">&raquo;</button>
              </div>
            </div>

            <!-- Widget Tableau -->
            <div v-if="dashboardWidgets[widgetId]?.type === 'table'" class="widget-table">
              <div class="widget-content">
                <h3 class="widget-title" :title="dashboardWidgets[widgetId].title">{{ dashboardWidgets[widgetId].title }}</h3>

                <table class="mini-table">
                  <tr v-for="row in getTablePageRows(widgetId)" :key="row.key">
                    <td>{{ row.label }}</td>
                    <td class="right" :class="{ 'positive': typeof row.value === 'string' && row.value.includes('HAUSSE'), 'negative': typeof row.value === 'string' && row.value.includes('VOLATILITÉ') }">{{ row.value }}</td>
                  </tr>
                </table>
              </div>

              <div class="table-pagination" v-if="getTotalTablePages(widgetId) > 1">
                <button @click="goToTablePage(widgetId, 1)">&laquo;</button>
                <button @click="changeTablePage(widgetId, -1)">&lsaquo;</button>
                <span>
                  Page {{ tablePageByWidget[widgetId] || 1 }} / {{ getTotalTablePages(widgetId) }}
                </span>
                <button @click="changeTablePage(widgetId, 1)">&rsaquo;</button>
                <button @click="goToTablePage(widgetId, getTotalTablePages(widgetId))">&raquo;</button>
              </div>
            </div>

            <!-- Widget Graphique -->
            <div v-if="dashboardWidgets[widgetId]?.type === 'chart'" class="widget-chart">
              <h3 class="widget-title" :title="'Graphique : ' + dashboardWidgets[widgetId].name">{{ dashboardWidgets[widgetId].name }}</h3>
              
              <div class="chart-controls">
                <label>
                  Crypto :
                  <select
                    v-model="selectedCryptoByWidget[widgetId]"
                    @change="onDashboardChartCryptoChange(widgetId)"
                    class="crypto-select"
                  >
                    <option
                      v-for="item in userPortfolio"
                      :key="item.symbol"
                      :value="item.id"
                    >
                      {{ item.symbol }}
                    </option>
                  </select>
                </label>
              </div>
              
              <div :id="'dashboard-chart-' + widgetId" class="dashboard-chart-container" :title="'Évolution du portefeuille'"></div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Section : Gagnants / Tendance -->
    <section class="flex-section">

      <div class="card tendance-card">
        <h2>🔥 Tendance Générale</h2>
        <div class="tendance-content">
          <div class="tendance-item">
            <div class="tendance-label">Capitalisation boursière</div>
            <div class="tendance-value" :title="'Somme totale de toutes les capitalisations boursières'">{{ formatPrice(totalMarketCap) }}</div>
            <div :class="['tendance-change', marketCapChange7d >= 0 ? 'positive' : 'negative']" :title="'Variation sur 7 jours'">
              <span v-if="marketCapChange7d >= 0">▲</span>
              <span v-else>▼</span>
              {{ Math.abs(marketCapChange7d).toFixed(2) }}%
            </div>
          </div>
          <div class="tendance-item">
            <div class="tendance-label">Volume</div>
            <div class="tendance-value" :title="'Volume total des échanges sur 24 heures'">{{ formatPrice(totalVolume) }}</div>
            <div :class="['tendance-change', volumeChange7d >= 0 ? 'positive' : 'negative']" :title="'Variation sur 7 jours'">
              <span v-if="volumeChange7d >= 0">▲</span>
              <span v-else>▼</span>
              {{ Math.abs(volumeChange7d).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>

    <div class="card">
      <h2>🏅 Grands Gagnants 24H</h2>

      <table class="gagnants-table">
        <tbody>
          <tr v-for="(coin, index) in topGainers24h" :key="coin.id">
            <td>{{ index + 1 }}</td>
            <td class="coin-name">
              <img :src="coin.image" alt="" width="20" />
              {{ coin.name }}
            </td>
            <td><span class="trend-up" :title="'Variation sur 24 heures'">{{ formatPercent(coin.price_change_percentage_24h_in_currency) }}</span></td>
            <td :title="'Prix actuel de ' + coin.name">{{ formatPrice(coin.current_price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>


      <div class="card">
        <h2>🏅 Grands Gagnants 1H</h2>
          <table class="gagnants-table">
            <tbody>
              <tr v-for="(coin, index) in topGainers1h" :key="coin.id">
                <td>{{ index + 1 }}</td>
                <td class="coin-name">
                  <img :src="coin.image" alt="" width="20" />
                  {{ coin.name }}
                </td>
                <td><span class="trend-up" :title="'Variation sur 1 heure'">{{ formatPercent(coin.price_change_percentage_1h_in_currency) }}</span></td>
                <td :title="'Prix actuel de ' + coin.name">{{ formatPrice(coin.current_price) }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </section>

    <!-- Section : Focus TOP 1 -->
    <section class="card big-card focus-card">
      <h2>🎯 Focus sur le TOP 1</h2>
      
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
                  <td>12 H</td>
                  <td :class="color(topCrypto.price_change_percentage_24h_in_currency)">
                    <span v-if="topCrypto.price_change_percentage_24h_in_currency > 0">▲</span>
                    <span v-else>▼</span>
                    {{ formatPercent(Math.abs(topCrypto.price_change_percentage_24h_in_currency * 0.5)) }}
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
      <div class="sort-indicator">
        <span class="sort-text">Trié par : Capitalisation boursière ↓</span>
      </div>

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
              <td style="text-align: left;" :title="coin.name">
                <RouterLink :to="`/crypto/${coin.id}`" class="crypto-name-link-table">
                  <img :src="coin.image" alt="" width="20" style="margin-right: 8px;" />{{ coin.name }}
                </RouterLink>
              </td>
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
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import Highcharts from 'highcharts';
import { useUserStore } from '@/stores/userStore';

// Désactiver l'avertissement d'accessibilité Highcharts
Highcharts.setOptions({
  accessibility: {
    enabled: false
  }
});

const userStore = useUserStore();
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

// Portefeuille fictif de l'utilisateur (3 cryptos)
const userPortfolio = ref([
  // Quantités fictives revues pour un total ~ 1000 $US
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', quantity: 0.01 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', quantity: 0.1 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', quantity: 3 }
]);

// Configuration du tableau de bord (synchronisée avec le store)
const userDashboard = computed(() => userStore.dashboardConfig);

// Pagination page per widget (tables + numbers)
const tablePageByWidget = ref({});

// Crypto sélectionnée par widget graphique
const selectedCryptoByWidget = ref({});

// Définition de tous les widgets (synchronisés avec SettingsView)
const dashboardWidgets = ref({
  gain24h: {
    type: 'number',
    title: 'Gains / Pertes sur 24h',
    value: '+ 0,00 %',
    detailType: 'change24h',
    pageSize: 3
  },
  gainTotal: {
    type: 'number',
    title: 'Gains / Pertes totales',
    value: '+ 0 $US',
    detailType: 'value',
    pageSize: 3
  },
  evolution24h: {
    type: 'chart',
    name: 'Évolution 24h',
    detailType: '24h'
  },
  performance3d: {
    type: 'chart',
    name: 'Performance 3 jours',
    detailType: '3d'
  },
  performance7d: {
    type: 'chart',
    name: 'Performance 7 jours',
    detailType: '7d'
  },
  investDetails: {
    type: 'table',
    title: 'Détails investissements',
    source: 'ownedCryptos',
    pageSize: 3
  },
  investTotal: {
    type: 'number',
    title: 'Total investi',
    value: '1 000 $US',
    detailType: 'value',
    pageSize: 3
  },
  cryptoReco: {
    type: 'table',
    title: 'Recommandations Crypto',
    source: 'static',
    pageSize: 2,
    rows: [
      { key: 'avax', label: 'Avalanche (AVAX)', value: 'Tendance : HAUSSE' },
      { key: 'link', label: 'Chainlink (LINK)', value: 'Tendance : FORTE HAUSSE' },
      { key: 'dot', label: 'Polkadot (DOT)', value: 'Stabilité : ÉLEVÉE' },
      { key: 'arb', label: 'Arbitrum (ARB)', value: 'Volatilité : ÉLEVÉE' }
    ]
  }
});

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
    if (userStore.isLoggedIn) {
      calculateTotalPortfolioValue();
      renderDashboardCharts();
    }
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

  // Calculer le min et max des données pour ajuster l'échelle
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;
  const yMin = minValue - (range * 0.02);
  const yMax = maxValue + (range * 0.02);

  // Détecter le thème actuel
  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const gridColor = isDarkMode ? '#334155' : '#cbd5e1';
  const tooltipBg = isDarkMode ? '#1e293b' : '#ffffff';

  Highcharts.chart('top-crypto-chart', {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: null
    },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      type: 'datetime',
      labels: {
        style: { color: textColor },
        formatter: function() {
          const date = new Date(Date.now() - (168 - this.value) * 3600000);
          return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        }
      },
      gridLineColor: gridColor,
      lineColor: gridColor
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: { color: textColor },
        formatter: function() {
          return this.value.toLocaleString('fr-FR') + ' $';
        }
      },
      gridLineColor: gridColor,
      min: yMin,
      max: yMax
    },
    tooltip: {
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      style: { color: textColor },
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

function formatDollar(value) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatSigned(value) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  const abs = Math.abs(value);
  return `${sign}${abs}`;
}

function formatPercent(value) {
  return value !== undefined ? value.toFixed(2) + " %" : "-";
}

function color(value) {
  return value > 0 ? "positive" : "negative";
}

// Fonctions pour le tableau de bord
function getPortfolioRows() {
  return userPortfolio.value.map(item => {
    const crypto = cryptos.value.find(c => c.id === item.id);
    if (!crypto) return null;
    
    return {
      symbol: item.symbol,
      name: item.name,
      quantity: item.quantity,
      currentPrice: crypto.current_price,
      value: crypto.current_price * item.quantity,
      change24h: crypto.price_change_percentage_24h_in_currency
    };
  }).filter(Boolean);
}

function calculateTotalPortfolioValue() {
  const rows = getPortfolioRows();
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  // Fictional invested total to mirror Settings
  const investedTotal = 1000;
  const diff = total - investedTotal;
  dashboardWidgets.value.gainTotal.value = `${diff >= 0 ? '+' : '-'} ${formatDollar(Math.abs(Math.round(diff)))} $US`;

  // Compute 24h weighted percent change for portfolio
  const yesterdayTotal = rows.reduce((sum, row) => {
    const pct = row.change24h || 0;
    const factor = 1 + pct / 100;
    const yesterday = factor !== 0 ? row.value / factor : row.value;
    return sum + yesterday;
  }, 0);
  const pctChange = yesterdayTotal > 0 ? ((total - yesterdayTotal) / yesterdayTotal) * 100 : 0;
  const pctFormatted = Math.abs(pctChange).toFixed(2).replace('.', ',');
  dashboardWidgets.value.gain24h.value = `${pctChange >= 0 ? '+ ' : '- '}${pctFormatted} %`;
}

function renderDashboardCharts() {
  if (!userStore.isLoggedIn) return;
  
  userDashboard.value.forEach(widgetId => {
    if (dashboardWidgets.value[widgetId]?.type === 'chart') {
      renderSingleDashboardChart(widgetId);
    }
  });
}

function renderSingleDashboardChart(widgetId) {
  const containerId = 'dashboard-chart-' + widgetId;
  const el = document.getElementById(containerId);
  if (!el) return;

  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return;

  // Obtenir la crypto sélectionnée ou la première du portefeuille
  const selectedCryptoId = selectedCryptoByWidget.value[widgetId] || userPortfolio.value[0]?.id;
  const selectedCrypto = cryptos.value.find(c => c.id === selectedCryptoId);
  if (!selectedCrypto) return;

  let data = [];
  let categories = [];
  const detailType = widget.detailType;

  // Récupérer les données selon la période
  if (detailType === '24h' && selectedCrypto.sparkline_in_7d?.price) {
    // Prendre les dernières 24 données (sur 168 points pour 7 jours)
    const allData = selectedCrypto.sparkline_in_7d.price;
    data = allData.slice(-24);
    categories = Array.from({ length: 24 }, (_, i) => `${i}h`);
  } else if (detailType === '3d' && selectedCrypto.sparkline_in_7d?.price) {
    // Prendre les dernières 72 données (3 jours)
    const allData = selectedCrypto.sparkline_in_7d.price;
    data = allData.slice(-72);
    categories = Array.from({ length: 72 }, (_, i) => `H${i}`);
  } else if (detailType === '7d' && selectedCrypto.sparkline_in_7d?.price) {
    // Prendre 7 points représentatifs sur 7 jours
    const allData = selectedCrypto.sparkline_in_7d.price;
    const step = Math.floor(allData.length / 7);
    data = Array.from({ length: 7 }, (_, i) => allData[i * step]);
    categories = ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7'];
  } else {
    return; // Pas de données disponibles
  }

  const isUp = data.length > 0 && data[data.length - 1] > data[0];
  
  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const gridColor = isDarkMode ? '#334155' : '#cbd5e1';

  // Déterminer des positions de ticks lisibles pour l'axe des X
  let tickPositions = undefined;
  if (detailType === '24h') {
    tickPositions = [0, 6, 12, 18, 23];
  } else if (detailType === '3d') {
    tickPositions = [0, 12, 24, 36, 48, 60, 71];
  } else if (detailType === '7d') {
    tickPositions = [0, 1, 2, 3, 4, 5, 6];
  }

  Highcharts.chart(containerId, {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      height: 140,
      margin: [10, 10, 36, 60]
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: categories,
      visible: true,
      lineColor: gridColor,
      tickColor: gridColor,
      tickLength: 4,
      tickPositions: tickPositions,
      labels: {
        enabled: true,
        style: { color: textColor, fontSize: '11px', fontWeight: '600' },
        y: 14
      }
    },
    yAxis: {
      visible: true,
      gridLineColor: gridColor,
      title: { text: '$US', style: { color: textColor } },
      labels: {
        style: { color: textColor },
        align: 'right',
        x: 0
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      style: { color: textColor },
      valueDecimals: 2,
      valueSuffix: ' $US'
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: { enabled: false },
        color: isUp ? '#16a34a' : '#dc2626'
      }
    },
    series: [{
      name: selectedCrypto.symbol.toUpperCase(),
      data: data
    }]
  });
}

function onDashboardChartCryptoChange(widgetId) {
  renderSingleDashboardChart(widgetId);
}

// ---------- Tableaux paginés et widgets number ----------
function getAllTableRows(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return [];

  if (widget.source === 'ownedCryptos') {
    const rows = getPortfolioRows();
    return rows.map(r => ({ key: r.symbol, label: `${r.name} (${r.symbol})`, value: `${formatDollar(Math.round(r.value))} $US` }));
  }

  if (widget.source === 'static') {
    return widget.rows || [];
  }

  return widget.rows || [];
}

function getTablePageRows(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return [];
  const rows = getAllTableRows(widgetId);
  const pageSize = widget.pageSize || 4;
  const currentPage = tablePageByWidget.value[widgetId] || 1;
  const start = (currentPage - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

function getTotalTablePages(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return 1;
  if (widget.type === 'number') return getNumberWidgetTotalPages(widgetId);
  const rows = getAllTableRows(widgetId);
  const pageSize = widget.pageSize || 4;
  return Math.max(1, Math.ceil(rows.length / pageSize));
}

function goToTablePage(widgetId, page) {
  const total = getTotalTablePages(widgetId);
  const p = Math.min(Math.max(page, 1), total);
  tablePageByWidget.value[widgetId] = p;
}

function changeTablePage(widgetId, delta) {
  const current = tablePageByWidget.value[widgetId] || 1;
  goToTablePage(widgetId, current + delta);
}

function getNumberWidgetRows(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return [];

  if (widget.detailType === 'change24h') {
    const rows = getPortfolioRows();
    return rows.map(r => ({ key: r.symbol, label: r.symbol, value: `${formatSigned(Math.round(r.value * (r.change24h || 0) / 100))} $US` }));
  }

  if (widget.detailType === 'value') {
    const rows = getPortfolioRows();
    return rows.map(r => ({ key: r.symbol, label: r.symbol, value: `${formatDollar(Math.round(r.value))} $US` }));
  }

  return [];
}

function getNumberWidgetPageRows(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return [];
  const rows = getNumberWidgetRows(widgetId);
  const pageSize = widget.pageSize || 4;
  const currentPage = tablePageByWidget.value[widgetId] || 1;
  const start = (currentPage - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

function getNumberWidgetTotalPages(widgetId) {
  const widget = dashboardWidgets.value[widgetId];
  if (!widget) return 1;
  const rows = getNumberWidgetRows(widgetId);
  const pageSize = widget.pageSize || 4;
  return Math.max(1, Math.ceil(rows.length / pageSize));
}

// Observer pour détecter les changements de thème
let themeObserver = null;

onMounted(() => {
  fetchCryptos();
  
  // Initialiser les cryptos sélectionnées pour les graphiques
  userDashboard.value.forEach(widgetId => {
    if (dashboardWidgets.value[widgetId]?.type === 'chart') {
      selectedCryptoByWidget.value[widgetId] = userPortfolio.value[0]?.id || 'bitcoin';
    }
  });
  // Initialiser la pagination pour les widgets number
  userDashboard.value.forEach(widgetId => {
    const widget = dashboardWidgets.value[widgetId];
    if (widget && widget.type === 'number' && !tablePageByWidget.value[widgetId]) {
      tablePageByWidget.value[widgetId] = 1;
    }
  });
  
  // Observer les changements de classe sur l'élément html (dark/light mode)
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Re-render les graphiques quand le thème change
        nextTick(() => {
          renderSparklines();
          renderTopCryptoChart();
          renderDashboardCharts();
        });
      }
    });
  });
  
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

onUnmounted(() => {
  if (themeObserver) {
    themeObserver.disconnect();
  }
});
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
  color: var(--text-primary);
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
  color: var(--text-secondary);
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

/* Table styles are managed globally in assets/style.css to match themes */
.crypto-table .sparkline { height: 40px; width: 120px; }

.table-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* -------- DASHBOARD GRID (mirror Settings) -------- */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.dashboard-slot {
  height: 210px;
  position: relative;
}

.dash-item {
  background: #ffe9c4;
  border: 2px solid #d4b07a;
  border-radius: 14px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

/* -------- WIDGETS STYLES -------- */
.widget-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #7a5600;
  margin-bottom: 10px;
}

.widget-number { text-align: center; }
.widget-value { font-size: 30px; font-weight: bold; margin: 8px 0; }
.widget-value.positive { color: #16a34a; }
.widget-value.negative { color: #dc2626; }

.mini-table { width: 100%; font-size: 13px; }
.mini-table td { padding: 3px 5px; }
.mini-table .right { text-align: right; }

.widget-table table { width: 100%; }
.widget-table td { border-bottom: 1px solid #e4cfa6; padding: 5px 8px; }
.widget-table .right { text-align: right; }

.table-pagination { margin-top: 6px; display: flex; justify-content: center; gap: 6px; font-size: 13px; }
.table-pagination button { background: #e0a74f; color: white; border-radius: 6px; border: none; padding: 3px 6px; cursor: pointer; }
.table-pagination button:hover { background: #cf8e2f; }

.chart-controls { text-align: center; margin-bottom: 4px; }
.crypto-select { background: transparent; border: 1px solid #cfa45a; border-radius: 6px; padding: 4px 6px; color: #7a5600; font-weight: bold; }
.dashboard-chart-container { height: 150px; width: 100%; }

/* -------- RESPONSIVE -------- */
@media (max-width: 900px) {
  .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .dashboard-slot { height: auto; min-height: 220px; }
  .dash-item { height: auto; }
  .dashboard-chart-container { height: 190px !important; }
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

.sort-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 10px 16px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  border-left: 3px solid var(--primary);
}

.sort-icon {
  font-size: 18px;
}

.sort-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.crypto-name-link-table {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: color 0.2s;
}

.crypto-name-link-table:hover {
  color: var(--primary);
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
