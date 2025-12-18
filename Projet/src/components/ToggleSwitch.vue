<template>
  <div class="toggle">
    <span
      :class="{ active: modelValue }"
      @click="set(true)"
    >
      OUI
    </span>

    <span
      :class="{ active: !modelValue }"
      @click="set(false)"
    >
      NON
    </span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    set(value) {
      this.$emit("update:modelValue", value)
      this.$emit("change", value) // pour ton @change existant
    }
  }
}
</script>

<style scoped>
.toggle {
  display: flex;
  gap: 6px;
  margin-right: 50px;
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
