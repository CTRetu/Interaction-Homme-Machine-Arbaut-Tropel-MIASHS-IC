<template>
  <div class="p-4 rounded-xl bg-white shadow border border-gray-200">
    <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>

    <div class="space-y-2">
      <div
        v-for="item in items"
        :key="item.name"
        class="flex items-center justify-between"
      >
        <span class="font-medium">{{ item.rank }}. {{ item.name }}</span>

        <div class="flex items-center gap-3">
          <span class="text-gray-600">{{ item.value }} $US</span>
          <span class="text-green-600 font-bold">▲ {{ item.change }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array
})
</script>
