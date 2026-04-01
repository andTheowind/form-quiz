<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import StepOne from '@/components/form/steps/StepOne.vue'
import StepTwo from '@/components/form/steps/StepTwo.vue'
import RateField from '@/components/form/ui/RateField.vue'
import TagField from '@/components/form/ui/TagField.vue'
import SuccessScreen from '@/components/status/SuccessScreen.vue'
import ErrorScreen from '@/components/status/ErrorScreen.vue'
import { useFeedbackForm } from '@/composables/useFeedbackForm'
import { validateEntireForm, validateStepOne } from '@/utils/validation'

const BP_MOBILE = 768

const { formData, resetFormData } = useFeedbackForm()

const currentStep = ref(1)
const isMobile = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

function updateIsMobile() {
  isMobile.value = window.innerWidth < BP_MOBILE
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

function validateStep1() {
  const validationError = validateStepOne(formData)
  errorMessage.value = validationError
  return !validationError
}

function validateForm() {
  const validationError = validateEntireForm(formData)
  errorMessage.value = validationError
  return !validationError
}

function resetForm() {
  resetFormData()
  currentStep.value = 1
  showSuccess.value = false
  showError.value = false
  errorMessage.value = ''
}

function onCancel() {
  resetForm()
}

function onNext() {
  if (!validateStep1()) {
    showError.value = true
    return
  }
  currentStep.value = 2
}

function onBack() {
  showError.value = false
  currentStep.value = 1
}

function onSubmit() {
  if (!validateForm()) {
    showError.value = true
    return
  }
  showError.value = false
  showSuccess.value = true
}

function onRetry() {
  showError.value = false
}

const footerButtons = computed(() => {
  if (!isMobile.value) {
    return [
      { label: 'Отменить', variant: 'secondary', action: 'cancel' },
      { label: 'Отправить', variant: 'primary', action: 'submit' },
    ]
  }
  if (currentStep.value === 1) {
    return [
      { label: 'Отменить', variant: 'secondary', action: 'cancel' },
      { label: 'Далее', variant: 'primary', action: 'next' },
    ]
  }
  return [
    { label: 'Назад', variant: 'secondary', action: 'back' },
    { label: 'Отправить', variant: 'primary', action: 'submit' },
  ]
})

function handleFooter(action) {
  if (action === 'cancel') onCancel()
  else if (action === 'next') onNext()
  else if (action === 'back') onBack()
  else if (action === 'submit') onSubmit()
}

const showStepOne = computed(() => !isMobile.value || currentStep.value === 1)
const showStepTwo = computed(() => !isMobile.value || currentStep.value === 2)

const gradeOnStepOne = computed(() => !isMobile.value)
const gradeOnStepTwo = computed(() => isMobile.value)

const progressPercent = computed(() => {
  if (currentStep.value === 1) return 0
  if (formData.quickAnswers.length > 0) return 100
  return 50
})
</script>

<template>
  <div class="form-shell">
    <SuccessScreen v-if="showSuccess" @home="resetForm" @close="resetForm" />
    <ErrorScreen v-else-if="showError" :message="errorMessage" @retry="onRetry" @close="resetForm" />

    <form v-else class="form">
      <button @click="onCancel" class="form__close" type="button" aria-label="Закрыть форму">
        <SvgIcon name="close" color="#A0A3BD" />
      </button>
      <h2 class="form__title">Форма обратной связи</h2>
      <p v-if="isMobile" class="form__mobile-rate-hint">
        Пожалуйста, оцените свой опыт прохождения тестового
      </p>
      <div v-if="isMobile && currentStep === 2" class="form__mobile-rating">
        <RateField v-model:rating="formData.rating" :show-label="false" />
        <TagField v-model:quick-answers="formData.quickAnswers" :rating="formData.rating" />
      </div>

      <div v-if="!isMobile" class="form__desktop-rating">
        <RateField v-model:rating="formData.rating" />
        <TagField v-model:quick-answers="formData.quickAnswers" :rating="formData.rating" />
      </div>

      <div class="form__desktop-layout">
        <template v-if="isMobile">
          <Transition name="form-step" mode="out-in">
            <StepOne
              v-if="showStepOne"
              v-model:full-name="formData.fullName"
              v-model:email="formData.email"
              v-model:phone="formData.phone"
              v-model:grade="formData.grade"
              :show-grade="gradeOnStepOne"
            />
            <StepTwo
              v-else
              v-model:comment="formData.comment"
              v-model:grade="formData.grade"
              :show-grade="gradeOnStepTwo"
            />
          </Transition>
        </template>
        <template v-else>
          <StepOne
            v-model:full-name="formData.fullName"
            v-model:email="formData.email"
            v-model:phone="formData.phone"
            v-model:grade="formData.grade"
            :show-grade="gradeOnStepOne"
          />
          <StepTwo
            v-model:comment="formData.comment"
            v-model:grade="formData.grade"
            :show-grade="gradeOnStepTwo"
          />
        </template>
      </div>

      <div v-if="isMobile" class="form__progress" aria-label="Прогресс формы">
        <span class="form__progress-step" :class="{ 'form__progress-step--active': currentStep === 1 || currentStep === 2}">1</span>
        <span class="form__progress-line" aria-hidden="true">
          <span class="form__progress-fill" :style="{ width: progressPercent + '%' }"></span>
        </span>
        <span class="form__progress-step" :class="{ 'form__progress-step--active': progressPercent === 100 }">2</span>
      </div>

      <div class="form__footer">
        <button v-for="btn in footerButtons" :key="btn.label" type="button" class="form__button"
          :class="btn.variant === 'primary' ? 'form__button--primary' : 'form__button--secondary'"
          @click="handleFooter(btn.action)">
          {{ btn.label }}
        </button>
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
