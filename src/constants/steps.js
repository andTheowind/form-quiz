import StepOne from '@/components/form/steps/StepOne.vue'
import StepTwo from '@/components/form/steps/StepTwo.vue'
import { validateStepOne, validateStepTwo } from '@/utils/validation'

export const FORM_STEPS = [
  { component: StepOne, validate: validateStepOne },
  { component: StepTwo, validate: validateStepTwo },
]
