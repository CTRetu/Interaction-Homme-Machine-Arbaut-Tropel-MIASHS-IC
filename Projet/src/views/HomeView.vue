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

      <div class="card">
        <h2>Tendance Générale</h2>
        <p>(Zone Tendance)</p>
      </div>

    <div class="card">
      <h2>Grands Gagnants 24H</h2>

      <table class="gagnants-table">
        <tbody>
          <tr>
            <td>1</td>
            <td>Bitcoin</td>
            <td><span class="trend-up">+12%</span></td>
            <td>$45 780</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ethereum</td>
            <td><span class="trend-up">+9%</span></td>
            <td>$25 678</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Solana</td>
            <td><span class="trend-up">+7%</span></td>
            <td>$12 345</td>
          </tr>
        </tbody>
      </table>
    </div>


      <div class="card">
        <h2>Grands Gagnants 12H</h2>
          <table class="gagnants-table">
            <tbody>
              <tr>
                <td>1</td>
                <td>Bitcoin</td>
                <td><span class="trend-up">+8%</span></td>
                <td>$30 055</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ethereum</td>
                <td><span class="trend-up">+6%</span></td>
                <td>$23 202</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Solana</td>
                <td><span class="trend-up">+6%</span></td>
                <td>$11 256</td>
              </tr>
            </tbody>
        </table>
      </div>
    </section>

    <!-- Section : Focus TOP 1 -->
    <section class="card big-card">
      <h2>Focus sur le TOP 1</h2>
    </section>

    <!-- Section : Tableau des cryptos -->
    <section class="card">
      <h2>Tableau récapitulatif des 10 crypto-monnaies les plus importantes</h2>

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
            Voir plus
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- Section : Communauté -->
    <section class="card">
      <h2>Communauté</h2>
      <p>(Zone articles / commentaires)</p>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import Highcharts from 'highcharts';

const cryptos = ref([]);

const topTenCryptos = computed(() => {
  return cryptos.value.slice(0, 10);
});

async function fetchCryptos() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=market_cap_desc&per_page=10&page=1" +
    "&sparkline=true&price_change_percentage=1h,24h,7d,14d";

  const res = await fetch(url);
  const data = await res.json();

  data.forEach(coin => {
    coin.sparkline = coin.sparkline_in_7d?.price || [];
  });

  cryptos.value = data;

  nextTick(() => {
    renderSparklines();
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
}

.intro-section h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
}

.intro-section p {
  max-width: 600px;
  font-size: 15px;
  color: var(--text-light);
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

.btn-primary {
  display: inline-block;
  padding: 10px 24px;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-see-more {
  margin-top: 20px;
}
</style>
