<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v),
  },
})
</script>

<template>
  <button type="button" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/button' as *;
</style>
