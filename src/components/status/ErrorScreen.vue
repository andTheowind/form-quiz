<script setup>
import errorImage from '@/assets/img/error-image.svg'

defineProps({
  message: { type: String, required: true },
})

const emit = defineEmits(['retry'])
</script>

<template>
  <div class="error-screen">
    <img :src="errorImage" class="error-screen__icon" alt="Ошибка" />
    <h2 class="error-screen__title">Ошибка</h2>
    <p class="error-screen__text">{{ message }}</p>
    <button type="button" class="error-screen__button" @click="emit('retry')">Вернуться к форме</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/error' as *;
</style>
