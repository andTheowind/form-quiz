<script setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'

defineEmits(['close'])
</script>

<template>
  <button type="button" class="close-btn" aria-label="Закрыть" @click="$emit('close')">
    <SvgIcon name="close" color="#A0A3BD" />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/close-button' as *;
</style>
