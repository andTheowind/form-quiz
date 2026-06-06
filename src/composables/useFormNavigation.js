import { computed, ref } from 'vue'
import { FORM_STEPS } from '@/constants/steps'

const TOTAL_STEPS = FORM_STEPS.length

export function useFormNavigation(formData, { onValidationError }) {
  const currentStep = ref(0)
  const transitionDirection = ref('forward')

  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => currentStep.value === TOTAL_STEPS - 1)
  const currentStepComponent = computed(() => FORM_STEPS[currentStep.value].component)

  function validateStep(stepIndex) {
    const validate = FORM_STEPS[stepIndex]?.validate
    if (!validate) return ''
    return validate(formData)
  }

  function goNext() {
    const error = validateStep(currentStep.value)
    if (error) { onValidationError(error); return }
    onValidationError('')
    transitionDirection.value = 'forward'
    currentStep.value++
  }

  function goBack() {
    onValidationError('')
    transitionDirection.value = 'backward'
    currentStep.value--
  }

  function validateAllSteps() {
    for (let i = 0; i < TOTAL_STEPS; i++) {
      const error = validateStep(i)
      if (error) return error
    }
    return ''
  }

  function resetNavigation() {
    currentStep.value = 0
    transitionDirection.value = 'forward'
  }

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    currentStepComponent,
    transitionDirection,
    goNext,
    goBack,
    validateAllSteps,
    resetNavigation,
  }
}
