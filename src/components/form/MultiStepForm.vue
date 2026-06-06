<script setup>
import { computed, provide } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import RateField from '@/components/form/ui/RateField.vue'
import TagField from '@/components/form/ui/TagField.vue'
import SuccessScreen from '@/components/status/SuccessScreen.vue'
import ErrorScreen from '@/components/status/ErrorScreen.vue'
import { useFeedbackForm } from '@/composables/useFeedbackForm'
import { useBreakpoint } from '@/composables/useBreakpoint'
import { useFormNavigation } from '@/composables/useFormNavigation'
import { useFormStatus } from '@/composables/useFormStatus'
import { FORM_STEPS } from '@/constants/steps'

const TOTAL_STEPS = FORM_STEPS.length

const { formData, resetFormData } = useFeedbackForm()
provide('formData', formData)

const isMobile = useBreakpoint('(max-width: 768px)')

const {
  showSuccess, showError, errorMessage, stepError,
  setStepError, submitSuccess, retry, resetStatus,
} = useFormStatus()

const {
  currentStep, isFirstStep, isLastStep,
  currentStepComponent, transitionDirection,
  goNext, goBack, validateAllSteps, resetNavigation,
} = useFormNavigation(formData, { onValidationError: setStepError })

function resetForm() {
  resetFormData()
  resetNavigation()
  resetStatus()
}

function onSubmit() {
  const error = validateAllSteps()
  if (error) { setStepError(error); return }
  submitSuccess()
}

function onAction(action) {
  const handlers = {
    cancel: resetForm,
    next: goNext,
    back: goBack,
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
    <ErrorScreen
      v-else-if="showError"
      :message="errorMessage"
      @retry="retry"
      @close="retry"
    />

    <form v-else class="form" @submit.prevent>
      <CloseButton @close="resetForm" />
      <h2 class="form__title">Форма обратной связи</h2>

      <p v-if="isMobile && isLastStep" class="form__mobile-rate-hint">
        Пожалуйста, оцените свой опыт прохождения тестового
      </p>
      <div v-if="isMobile && isLastStep" class="form__mobile-rating">
        <RateField v-model:rating="formData.rating" :show-label="false" />
        <TagField
          v-model:quick-answers="formData.quickAnswers"
          :rating="formData.rating"
        />
      </div>

      <div v-if="!isMobile" class="form__desktop-rating">
        <RateField v-model:rating="formData.rating" />
        <TagField
          v-model:quick-answers="formData.quickAnswers"
          :rating="formData.rating"
        />
      </div>

      <div class="form__content">
        <template v-if="isMobile">
          <Transition
            name="form-step"
            mode="out-in"
            :enter-from-class="`form-step-enter-from form-step-enter-from--${transitionDirection}`"
            :leave-to-class="`form-step-leave-to form-step-leave-to--${transitionDirection}`"
          >
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

      <p v-if="stepError" class="form__step-error" role="alert">
        {{ stepError }}
      </p>

      <div v-if="isMobile" class="form__progress" aria-label="Прогресс формы">
        <template v-for="(_, index) in FORM_STEPS" :key="index">
          <span
            class="form__progress-step"
            :class="{ 'form__progress-step--active': currentStep >= index }"
            >{{ index + 1 }}</span
          >
          <span
            v-if="index < TOTAL_STEPS - 1"
            class="form__progress-line"
            aria-hidden="true"
          >
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

<style scoped lang="scss">
@use "@/assets/styles/form" as *;
</style>
