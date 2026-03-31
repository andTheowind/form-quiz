<script setup>
import { vMaska } from 'maska/vue'
import { GRADE_OPTIONS } from '@/constants/formOptions'

defineProps({
  showGrade: { type: Boolean, required: true },
})

const fullName = defineModel('fullName', { default: '' })
const email = defineModel('email', { default: '' })
const grade = defineModel('grade', { default: '' })
const phone = defineModel('phone', { default: '' })
</script>

<template>
  <div class="step-one">
    <div class="step-one__field">
      <label class="step-one__label" for="fullName">ФИО</label>
      <input
        id="fullName"
        v-model="fullName"
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
        v-model="email"
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
        v-model="phone"
        v-maska="{ mask: '+7 (###) ### ## ##' }"
        class="step-one__input"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="+7 (000) 000 00 00"
      />
    </div>

    <div v-if="showGrade" class="step-one__field">
      <label class="step-one__label" for="grade">Грейд</label>
      <div class="step-one__select-wrap">
        <select id="grade" v-model="grade" class="step-one__select">
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
