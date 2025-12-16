<template>
  <div class="toggle">
    <span :class="{ active: value }" @click="value = true">OUI</span>
    <span :class="{ active: !value }" @click="value = false">NON</span>
  </div>
</template>

<script>
export default {
  data() {
    return { value: false };
  }
};
</script>

<style scoped>
.toggle {
  display: flex;
  gap: 6px;
}

.toggle span {
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #d5b679;
}

.toggle span.active {
  background: #d18c00;
  color: white;
}
</style>
