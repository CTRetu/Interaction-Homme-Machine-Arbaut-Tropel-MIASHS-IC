<template>
  <main>
    <section class="card">
      <h2>Liste complète des crypto-monnaies</h2>

      <div class="crypto-table-wrapper">
        <table class="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Cours</th>
              <th>12 H</th>
              <th>24 H</th>
              <th>3 J</th>
              <th>7 J</th>
              <th>Volume 24 H</th>
              <th>Capitalisation</th>
              <th>Évolution 7 J</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="crypto in paginatedCryptos" :key="crypto.rank">
              <td>{{ crypto.rank }}</td>
              <td>
                <img :src="crypto.icon" class="coin-ico" />
                {{ crypto.name }}
              </td>
              <td>{{ crypto.price }}</td>
              <td :class="crypto.h12.class">{{ crypto.h12.value }}</td>
              <td :class="crypto.h24.class">{{ crypto.h24.value }}</td>
              <td :class="crypto.d3.class">{{ crypto.d3.value }}</td>
              <td :class="crypto.d7.class">{{ crypto.d7.value }}</td>
              <td>{{ crypto.volume24h }}</td>
              <td>{{ crypto.marketcap }}</td>
              <td></td> <!-- tu pourras mettre ton tracé / sparkline ici -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-footer">
        <button
          class="btn-primary"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ← Page précédente
        </button>

        <span>Page {{ currentPage }} / {{ totalPages }}</span>

        <button
          class="btn-primary"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Page suivante →
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";

// 50 entrées d'exemple pour illustrer 2 pages de 25
// Tu pourras remplacer ce tableau par de vraies données (API, etc.)
const cryptos = ref(
  Array.from({ length: 50 }).map((_, index) => {
    const rank = index + 1;
    return {
      rank,
      name: `Crypto ${rank}`,
      icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      price: "120 000 $US",
      h12: { value: "1,01%", class: "up" },
      h24: { value: "1,23%", class: "up" },
      d3:  { value: "0,30%", class: rank % 2 === 0 ? "down" : "up" },
      d7:  { value: "1,10%", class: "up" },
      volume24h: "45 000",
      marketcap: "100 000 000",
    };
  })
);

const perPage = 25;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(cryptos.value.length / perPage));

const paginatedCryptos = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return cryptos.value.slice(start, end);
});
</script>
