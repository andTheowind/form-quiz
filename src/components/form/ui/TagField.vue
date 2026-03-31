<script setup>
import { computed, watch } from 'vue'
import { QUICK_ANSWER_TAGS_BY_RATING } from '@/constants/quickAnswerTags'

const props = defineProps({
  rating: { type: Number, required: true },
})

const quickAnswers = defineModel('quickAnswers', { default: () => [] })

const tags = computed(() => {
  if (props.rating < 1 || props.rating > 5) return []
  return QUICK_ANSWER_TAGS_BY_RATING[props.rating] ?? []
})

function select(tag) {
  if (quickAnswers.value.includes(tag)) {
    quickAnswers.value = []
  } else {
    quickAnswers.value = [tag]
  }
}

watch(
  () => props.rating,
  () => {
    quickAnswers.value = []
  },
)
</script>

<template>
  <div v-if="rating > 0 && tags.length" class="tag-field">
    <div class="tag-field__answers" role="radiogroup" :aria-label="'Ответы для оценки ' + rating">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        role="radio"
        class="tag-field__answer"
        :class="{ 'tag-field__answer--active': quickAnswers.includes(tag) }"
        :aria-checked="quickAnswers.includes(tag)"
        @click="select(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/tag-field' as *;
</style>
