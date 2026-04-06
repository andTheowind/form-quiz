<script setup>
import errorImage from '@/assets/img/error-image.svg'
import StatusCard from '@/components/ui/StatusCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  message: { type: String, required: true },
})

const emit = defineEmits(['retry', 'close'])
</script>

<template>
  <StatusCard
    title="Что-то пошло не так"
    :text="message"
    :image="errorImage"
    image-alt="Ошибка"
    @close="emit('close')"
  >
    <template #actions>
      <BaseButton variant="secondary" @click="emit('close')">Закрыть</BaseButton>
      <BaseButton variant="primary" @click="emit('retry')">Попробовать снова</BaseButton>
    </template>
  </StatusCard>
</template>
