<script setup>
import { inject } from 'vue'

const formData = inject('formData')
</script>

<template>
  <div class="step-two">
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
