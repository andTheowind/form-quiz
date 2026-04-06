<script setup>
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import RateField from '@/components/form/ui/RateField.vue'
import TagField from '@/components/form/ui/TagField.vue'
import SuccessScreen from '@/components/status/SuccessScreen.vue'
import ErrorScreen from '@/components/status/ErrorScreen.vue'
import { useFeedbackForm } from '@/composables/useFeedbackForm'
import { FORM_STEPS } from '@/constants/steps'

const BP_MOBILE = matchMedia('(max-width: 767px)')
const TOTAL_STEPS = FORM_STEPS.length

const { formData, resetFormData } = useFeedbackForm()
provide('formData', formData)

const currentStep = ref(0)
const isMobile = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === TOTAL_STEPS - 1)
const currentStepComponent = computed(() => FORM_STEPS[currentStep.value].component)

function updateIsMobile() {
  isMobile.value = BP_MOBILE.matches
}

onMounted(() => {
  updateIsMobile()
  BP_MOBILE.addEventListener('change', updateIsMobile)
})

onUnmounted(() => {
  BP_MOBILE.removeEventListener('change', updateIsMobile)
})

function validateCurrentStep() {
  const validate = FORM_STEPS[currentStep.value]?.validate
  if (!validate) return true
  const error = validate(formData)
  errorMessage.value = error
  return !error
}

function validateAllSteps() {
  for (const step of FORM_STEPS) {
    if (!step.validate) continue
    const error = step.validate(formData)
    if (error) {
      errorMessage.value = error
      return false
    }
  }
  return true
}

function resetForm() {
  resetFormData()
  currentStep.value = 0
  showSuccess.value = false
  showError.value = false
  errorMessage.value = ''
}

function onNext() {
  if (!validateCurrentStep()) {
    showError.value = true
    return
  }
  currentStep.value++
}

function onBack() {
  showError.value = false
  currentStep.value--
}

function onSubmit() {
  if (!validateAllSteps()) {
    showError.value = true
    return
  }
  showError.value = false
  showSuccess.value = true
}

function onRetry() {
  showError.value = false
}

function onAction(action) {
  const handlers = {
    cancel: resetForm,
    next: onNext,
    back: onBack,
    submit: onSubmit,
  }

  handlers[action]?.()
}

const formActions = computed(() => {
  if (!isMobile.value) {
    return [
      { label: 'Отменить', variant: 'secondary', action: 'cancel' },
      { label: 'Отправить', variant: 'primary', action: 'submit' },
    ]
  }
  return [
    isFirstStep.value
      ? { label: 'Отменить', variant: 'secondary', action: 'cancel' }
      : { label: 'Назад', variant: 'secondary', action: 'back' },
    isLastStep.value
      ? { label: 'Отправить', variant: 'primary', action: 'submit' }
      : { label: 'Далее', variant: 'primary', action: 'next' },
  ]
})

</script>

<template>
  <div class="form-shell">
    <SuccessScreen v-if="showSuccess" @home="resetForm" @close="resetForm" />
    <ErrorScreen v-else-if="showError" :message="errorMessage" @retry="onRetry" @close="resetForm" />

    <form v-else class="form" @submit.prevent>
      <CloseButton @close="resetForm" />
      <h2 class="form__title">Форма обратной связи</h2>

      <p v-if="isMobile" class="form__mobile-rate-hint">
        Пожалуйста, оцените свой опыт прохождения тестового
      </p>
      <div v-if="isMobile && isLastStep" class="form__mobile-rating">
        <RateField v-model:rating="formData.rating" :show-label="false" />
        <TagField v-model:quick-answers="formData.quickAnswers" :rating="formData.rating" />
      </div>

      <div v-if="!isMobile" class="form__desktop-rating">
        <RateField v-model:rating="formData.rating" />
        <TagField v-model:quick-answers="formData.quickAnswers" :rating="formData.rating" />
      </div>

      <div class="form__content">
        <template v-if="isMobile">
          <Transition name="form-step" mode="out-in">
            <component :is="currentStepComponent" :key="currentStep" />
          </Transition>
        </template>
        <template v-else>
          <component
            v-for="(step, index) in FORM_STEPS"
            :key="index"
            :is="step.component"
          />
        </template>
      </div>

      <div v-if="isMobile" class="form__progress" aria-label="Прогресс формы">
        <template v-for="(_, index) in FORM_STEPS" :key="index">
          <span
            class="form__progress-step"
            :class="{ 'form__progress-step--active': currentStep >= index }"
          >{{ index + 1 }}</span>
          <span v-if="index < TOTAL_STEPS - 1" class="form__progress-line" aria-hidden="true">
            <span
              class="form__progress-fill"
              :style="{ width: currentStep > index ? '100%' : '0%' }"
            ></span>
          </span>
        </template>
      </div>

      <div class="form__footer">
        <BaseButton
          v-for="btn in formActions"
          :key="btn.action"
          :variant="btn.variant"
          @click="onAction(btn.action)"
        >
          {{ btn.label }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<style
  scoped
  lang="scss"
>
@use '@/assets/styles/form' as *;
</style>
