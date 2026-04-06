<script setup>
import { inject } from 'vue'
import { vMaska } from 'maska/vue'

const formData = inject('formData')
</script>

<template>
  <div class="step-one">
    <div class="step-one__field">
      <label class="step-one__label" for="fullName">ФИО</label>
      <input
        id="fullName"
        v-model="formData.fullName"
        class="step-one__input"
        type="text"
        autocomplete="name"
        placeholder="Иван Иванов"
      />
    </div>

    <div class="step-one__field">
      <label class="step-one__label" for="email">Почта</label>
      <input
        id="email"
        v-model="formData.email"
        class="step-one__input"
        type="email"
        autocomplete="email"
        placeholder="Текст"
      />
    </div>

    <div class="step-one__field">
      <label class="step-one__label" for="phone">Номер телефона</label>
      <input
        id="phone"
        v-model="formData.phone"
        v-maska="{ mask: '+7 (###) ### ## ##' }"
        class="step-one__input"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="+7 (000) 000 00 00"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/step-one' as *;
</style>
