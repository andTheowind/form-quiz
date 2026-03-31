<script setup>
import RatingStars from '@/components/form/RatingStars.vue'

defineProps({
  showLabel: { type: Boolean, default: true },
})

const rating = defineModel('rating', { default: 0 })
</script>

<template>
  <div class="rate-field">
    <label v-if="showLabel" class="rate-field__label">Пожалуйста, оцените свой опыт прохождения тестового</label>
    <RatingStars v-model="rating" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/rate-field' as *;
</style>
