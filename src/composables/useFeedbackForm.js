import { reactive } from 'vue'

const initialState = () => ({
  fullName: '',
  email: '',
  phone: '',
  grade: '',
  comment: '',
  rating: 0,
  quickAnswers: [],
})

export function useFeedbackForm() {
  const formData = reactive(initialState())

  function resetFormData() {
    Object.assign(formData, initialState())
  }

  return {
    formData,
    resetFormData,
  }
}
