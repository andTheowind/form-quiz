<script setup>
import { GRADE_OPTIONS } from '@/constants/formOptions'

defineProps({
  showGrade: { type: Boolean, required: true },
})

const comment = defineModel('comment', { default: '' })
const grade = defineModel('grade', { default: '' })
</script>

<template>
  <div class="step-two">
    <div class="step-two__field">
      <label class="step-two__label" for="comment">Дополнительная информация</label>
      <textarea id="comment" v-model="comment" class="step-two__textarea" rows="4" placeholder="Что понравилось и не понравилось" />
    </div>

    <div v-if="showGrade" class="step-two__field">
      <label class="step-two__label" for="grade2">Грейд</label>
      <div class="step-two__select-wrap">
        <select id="grade2" v-model="grade" class="step-two__select" :class="{ 'step-two__select--selected': grade }">
          <option v-for="opt in GRADE_OPTIONS" :key="opt.value || 'empty'" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style
  scoped
  lang="scss"
>
@use '@/assets/styles/components/step-two' as *;
</style>
