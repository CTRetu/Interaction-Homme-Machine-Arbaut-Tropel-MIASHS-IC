<template>
  <div class="bg-white p-6 rounded-xl shadow border">
    <h2 class="text-2xl font-bold mb-4">
      Tableau récapitulatif des 10 crypto-monnaies les plus importantes
    </h2>

    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b">
          <th class="py-2">#</th>
          <th>Nom</th>
          <th>Cours</th>
          <th>12h</th>
          <th>24h</th>
          <th>Volume 24h</th>
          <th>Capitalisation</th>
          <th>7j</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(crypto, index) in data" :key="index" class="border-b">
          <td class="py-2">{{ index + 1 }}</td>
          <td class="font-semibold flex items-center gap-2">
            <span>{{ crypto.icon }}</span> {{ crypto.name }}
          </td>
          <td>{{ crypto.price }} $US</td>
          <td class="text-green-600">▲ {{ crypto.h12 }}%</td>
          <td class="text-green-600">▲ {{ crypto.h24 }}%</td>
          <td>{{ crypto.volume }}</td>
          <td>{{ crypto.cap }}</td>
          <td class="text-green-600">▲ {{ crypto.d7 }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: Array
})
</script>
