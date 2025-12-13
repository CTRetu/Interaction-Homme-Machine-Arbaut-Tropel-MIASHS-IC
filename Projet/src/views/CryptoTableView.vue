<template>
  <div class="crypto-container">
    <br /> 
    <h1 class="page-title">Tableau récapitulatif des crypto-monnaies</h1>

    <div class="sort-container">
      <label>Trier par :</label>
      <select v-model="sortOption" @change="sortCryptos">
        <option value="price_desc">Prix décroissant</option>
        <option value="price_asc">Prix croissant</option>
        <option value="name_asc">Nom A-Z</option>
        <option value="name_desc">Nom Z-A</option>
      </select>
    </div>

    <table>
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
        <tr v-for="(coin, index) in paginatedCryptos" :key="coin.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
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
            <div :id="'spark-' + ((currentPage - 1) * itemsPerPage + index)" class="sparkline"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  data() {
    return {
      cryptos: [],
      currentPage: 1,
      itemsPerPage: 25,
      sortOption: 'price_desc',
    };
  },

  mounted() {
    this.fetchCryptos();
  },

  computed: {
    paginatedCryptos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.cryptos.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.cryptos.length / this.itemsPerPage);
    },
  },

  methods: {
    async fetchCryptos() {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1" +
        "&sparkline=true&price_change_percentage=1h,24h,7d,14d";

      const res = await fetch(url);
      const data = await res.json();

      // Assigner les sparklines
      data.forEach(coin => {
        coin.sparkline = coin.sparkline_in_7d?.price || [];
      });

      this.cryptos = data;

      this.$nextTick(() => {
        this.sortCryptos();
      });
    },

    renderSparklines() {
      this.paginatedCryptos.forEach((coin, index) => {
        const containerId = 'spark-' + ((this.currentPage - 1) * this.itemsPerPage + index);
        const el = document.getElementById(containerId);
        if (!el || !coin.sparkline || coin.sparkline.length === 0) return;

        const options = this.sparklineOptions(coin.sparkline);
        Highcharts.chart(containerId, options);
      });
    },

    sparklineOptions(data) {
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
    },

    formatPrice(value) {
      return value
        ? value.toLocaleString("fr-FR", {
            style: "currency",
            currency: "USD",
          })
        : "-";
    },

    formatPercent(value) {
      return value !== undefined ? value.toFixed(2) + " %" : "-";
    },

    color(value) {
      return value > 0 ? "positive" : "negative";
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$nextTick(() => this.renderSparklines());
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$nextTick(() => this.renderSparklines());
      }
    },

    sortCryptos() {
      if (this.sortOption === 'price_desc') {
        this.cryptos.sort((a, b) => b.current_price - a.current_price);
      } else if (this.sortOption === 'price_asc') {
        this.cryptos.sort((a, b) => a.current_price - b.current_price);
      } else if (this.sortOption === 'name_asc') {
        this.cryptos.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortOption === 'name_desc') {
        this.cryptos.sort((a, b) => b.name.localeCompare(a.name));
      }
      this.currentPage = 1;
      this.$nextTick(() => this.renderSparklines());
    },
  },
};
</script>
