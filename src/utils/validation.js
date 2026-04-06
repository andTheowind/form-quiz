const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RU_PHONE_COMPLETE_LENGTH = 18 // "+7 (900) 123 45 67"

export function validateStepOne(formData) {
  if (!formData.fullName.trim()) {
    return 'Укажите ФИО'
  }

  if (!EMAIL_RE.test(formData.email.trim())) {
    return 'Укажите корректный email'
  }

  if (formData.phone.length < RU_PHONE_COMPLETE_LENGTH) {
    return 'Укажите телефон в формате +7 (900) 123 45 67'
  }

  if (!formData.grade) {
    return 'Выберите грейд'
  }

  return ''
}

export function validateStepTwo(formData) {
  if (formData.rating < 1 || formData.rating > 5) {
    return 'Пожалуйста, выберите оценку от 1 до 5 звёзд'
  }

  return ''
}
