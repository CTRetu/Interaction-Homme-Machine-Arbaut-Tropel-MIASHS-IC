<template>
  <div class="app-container">
    <HeaderBar />

    <main>
      <RouterView />
    </main>

    <FooterBar />
  </div>
</template>

<script setup>
import HeaderBar from "./components/navigation/HeaderBar.vue";
import FooterBar from "./components/navigation/FooterBar.vue";
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding-top: 1000px; /* espace sous la navbar */
  flex: 1;
}
</style>
