<script setup>
import { GRADE_OPTIONS } from '@/constants/formOptions'

defineProps({
  fieldId: { type: String, default: 'grade' },
})

const model = defineModel({ default: '' })
</script>

<template>
  <div class="grade-select-wrap">
    <select
      :id="fieldId"
      v-model="model"
      class="grade-select"
      :class="{ 'grade-select--selected': model }"
    >
      <option v-for="opt in GRADE_OPTIONS" :key="opt.value || 'empty'" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/grade-select' as *;
</style>
