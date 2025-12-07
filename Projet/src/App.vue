<template>
  <HeaderBar />

  <main>
    <RouterView />
  </main>

  <FooterBar />
</template>

<script setup>
import HeaderBar from "./components/navigation/HeaderBar.vue";
import FooterBar from "./components/navigation/FooterBar.vue";
</script>

<style>
main {
  padding-top: 100px; /* espace sous la navbar */
}
</style>
