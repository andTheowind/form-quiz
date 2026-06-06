<script setup>
import { inject } from 'vue'
import GradeSelect from '@/components/form/ui/GradeSelect.vue'

const formData = inject('formData')
</script>

<template>
  <div class="step-two">
    <div class="step-two__field step-two__field--grade">
      <label class="step-two__label" for="grade-mobile">Грейд</label>
      <GradeSelect v-model="formData.grade" field-id="grade-mobile" />
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
