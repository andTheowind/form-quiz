<script setup>
import successImage from '@/assets/img/succes-image.svg'
import SvgIcon from '@/components/ui/SvgIcon.vue'

const emit = defineEmits(['home', 'close'])
</script>

<template>
  <div class="success">
    <button class="success__close" type="button" aria-label="Закрыть" @click="emit('close')">
      <SvgIcon name="close" color="#A0A3BD" />
    </button>
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
