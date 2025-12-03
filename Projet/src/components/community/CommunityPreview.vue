<template>
  <div class="bg-white p-6 rounded-xl border shadow">
    <h2 class="text-2xl font-bold mb-4">Communauté</h2>

    <div class="grid grid-cols-3 gap-4">

      <div
        v-for="item in posts"
        :key="item.id"
        class="p-4 bg-[#FFF8EE] rounded-lg border"
      >
        <p class="font-semibold">@{{ item.author }}</p>
        <p class="text-sm text-gray-700 line-clamp-3">{{ item.text }}</p>
      </div>

    </div>

    <RouterLink
      to="/community"
      class="block text-right mt-4 text-blue-600 font-medium"
    >
      Voir plus →
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  posts: Array
})
</script>
