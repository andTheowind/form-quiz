<script setup>
import { inject } from 'vue'
import { GRADE_OPTIONS } from '@/constants/formOptions'

const formData = inject('formData')
</script>

<template>
  <div class="step-two">
    <div class="step-two__field">
      <label class="step-two__label" for="grade">Грейд</label>
      <div class="step-two__select-wrap">
        <select
          id="grade"
          v-model="formData.grade"
          class="step-two__select"
          :class="{ 'step-two__select--selected': formData.grade }"
        >
          <option v-for="opt in GRADE_OPTIONS" :key="opt.value || 'empty'" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="step-two__field">
      <label class="step-two__label" for="comment">Дополнительная информация</label>
      <textarea
        id="comment"
        v-model="formData.comment"
        class="step-two__textarea"
        rows="4"
        placeholder="Что понравилось и не понравилось"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/step-two' as *;
</style>
