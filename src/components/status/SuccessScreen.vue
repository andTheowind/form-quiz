<script setup>
import successImage from '@/assets/img/succes-image.svg'
import StatusCard from '@/components/ui/StatusCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const emit = defineEmits(['home', 'close'])
</script>

<template>
  <StatusCard
    title="Спасибо, ваш ответ отправлен"
    text="Свяжемся с вами в ближайшее время"
    :image="successImage"
    image-alt="Успешно"
    @close="emit('close')"
  >
    <template #actions>
      <BaseButton variant="primary" @click="emit('home')">На главную</BaseButton>
    </template>
  </StatusCard>
</template>
