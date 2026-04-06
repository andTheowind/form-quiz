<script setup>
import { inject } from 'vue'
import { vMaska } from 'maska/vue'
import { GRADE_OPTIONS } from '@/constants/formOptions'

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

    <div class="step-one__field step-one__field--grade">
      <label class="step-one__label" for="grade">Грейд</label>
      <div class="step-one__select-wrap">
        <select
          id="grade"
          v-model="formData.grade"
          class="step-one__select"
          :class="{ 'step-one__select--selected': formData.grade }"
        >
          <option v-for="opt in GRADE_OPTIONS" :key="opt.value || 'empty'" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/step-one' as *;
</style>
