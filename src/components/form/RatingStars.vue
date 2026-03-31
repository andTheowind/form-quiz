<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'

const model = defineModel({ default: 0 })
const hoverIndex = ref(0)

const getStarColor = (index) => {
  if (hoverIndex.value > 0) {
    return index <= hoverIndex.value ? '#FFB800' : '#D9DBE9'
  }
  return model.value > 0 && index <= model.value ? '#FFB800' : '#D9DBE9'
}

const isFilled = (index) => {
  if (hoverIndex.value > 0) return index <= hoverIndex.value
  return model.value > 0 && index <= model.value
}

function setRating(n) {
  model.value = n
}
</script>

<template>
  <div class="rating" role="img" :aria-label="`Оценка ${model || 'не выбрана'} из 5`" @mouseleave="hoverIndex = 0">
    <button
      v-for="n in 5"
      :key="n"
      type="button"
      class="rating__star"
      :class="{ 'rating__star--filled': isFilled(n) }"
      :aria-pressed="model === n"
      @mouseenter="hoverIndex = n"
      @focus="hoverIndex = n"
      @blur="hoverIndex = 0"
      @click="setRating(n)"
    >
      <SvgIcon name="star" :color="getStarColor(n)" :size="35" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/rating' as *;
</style>
