<script setup>
import CloseButton from '@/components/ui/CloseButton.vue'

defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
})

defineEmits(['close'])
</script>

<template>
  <div class="status-card">
    <CloseButton @close="$emit('close')" />
    <h2 class="status-card__title">{{ title }}</h2>
    <p v-if="text" class="status-card__text">{{ text }}</p>
    <div v-if="image" class="status-card__icon-wrap">
      <img :src="image" class="status-card__icon" :alt="imageAlt" />
    </div>
    <div v-if="$slots.actions" class="status-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/status-card' as *;
@use '@/assets/styles/core' as *;

.status-card__actions :deep(.btn) {
  width: 100%;

  @media (min-width: $bp-mobile) {
    max-width: $status-action-btn-max-width;
  }
}
</style>
