<script setup>
import successImage from '@/assets/img/succes-image.svg'

const emit = defineEmits(['home'])
</script>

<template>
  <div class="success">
    <img :src="successImage" class="success__icon" alt="Успешно" />
    <h2 class="success__title">Спасибо!</h2>
    <p class="success__text">Ваш ответ отправлен</p>
    <button type="button" class="success__button" @click="emit('home')">На главную</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/success' as *;
</style>
