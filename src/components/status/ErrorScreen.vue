<script setup>
import errorImage from '@/assets/img/error-image.svg'
import SvgIcon from '@/components/ui/SvgIcon.vue'

defineProps({
  message: { type: String, required: true },
})

const emit = defineEmits(['retry', 'close'])
</script>

<template>
  <div class="error-screen">
    <button class="error-screen__close" type="button" aria-label="Закрыть" @click="emit('close')">
      <SvgIcon name="close" color="#A0A3BD" />
    </button>
    <h2 class="error-screen__title">Что-то пошло не так</h2>
    <p class="error-screen__text">{{ message }}</p>
    <div class="error-screen__icon-wrap">
      <img :src="errorImage" class="error-screen__icon" alt="Ошибка" />
    </div>
    <div class="error-screen__actions">
      <button type="button" class="error-screen__button error-screen__button--secondary" @click="emit('close')">Вернуться к форме</button>
      <button type="button" class="error-screen__button error-screen__button--primary" @click="emit('retry')">Попробовать снова</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/error' as *;
</style>
