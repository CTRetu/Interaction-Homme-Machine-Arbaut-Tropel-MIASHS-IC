<template>
  <footer class="footer-bar">
    <div class="footer-content">

      <div class="footer-left">
        Projet M2 MIASHS IC, UGA - Module IHM 2
      </div>

      <RouterLink to="/" class="footer-center">
        TOP CRYPTO
      </RouterLink>

      <div class="footer-right">
        Auteurs : Jean-Baptiste Arbaut & Célia Tropel
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>

.footer-content {
  max-width: 1400px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left,
.footer-right {
  font-size: 14px;
  color: var(--text-dark);
  opacity: 0.8;
  transition: 0.3s ease;
}

.footer-center {
  font-size: 26px;
  font-weight: 800;
  text-decoration: none;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
  transition: 0.3s ease;
}

.footer-center:hover {
  opacity: 0.8;
}

@media (max-width: 800px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
  }

  .footer-center {
    font-size: 22px;
  }
}
</style>
