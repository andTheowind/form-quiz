import { ref } from 'vue'

export function useFormStatus() {
  const showSuccess = ref(false)
  const showError = ref(false)
  const errorMessage = ref('')
  const stepError = ref('')

  function setStepError(message) {
    stepError.value = message
  }

  function submitSuccess() {
    stepError.value = ''
    showSuccess.value = true
  }

  function submitFailure(message) {
    errorMessage.value = message
    showError.value = true
  }

  function retry() {
    showError.value = false
    errorMessage.value = ''
  }

  function resetStatus() {
    showSuccess.value = false
    showError.value = false
    errorMessage.value = ''
    stepError.value = ''
  }

  return {
    showSuccess,
    showError,
    errorMessage,
    stepError,
    setStepError,
    submitSuccess,
    submitFailure,
    retry,
    resetStatus,
  }
}
