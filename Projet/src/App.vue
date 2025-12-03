<template>
  <HeaderBar />

  <main>
    <RouterView />
  </main>
</template>

<script setup>
import HeaderBar from "./components/navigation/HeaderBar.vue";
</script>

<style>
main {
  padding-top: 100px; /* espace sous la navbar */
}
</style>
