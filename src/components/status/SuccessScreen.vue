<script setup>
import successImage from '@/assets/img/succes-image.svg'

const emit = defineEmits(['home'])
</script>

<template>
  <div class="success">
    <h2 class="success__title">Спасибо, ваш ответ отправлен</h2>
    <p class="success__text">Свяжемся с вами в ближайшее время</p>
    <div class="success__icon-wrap">
      <img :src="successImage" class="success__icon" alt="Успешно" />
    </div>
    <button type="button" class="success__button" @click="emit('home')">На главную</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/success' as *;
</style>
