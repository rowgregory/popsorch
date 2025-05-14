interface ValidationErrors {
  instrument: string
}

export const campAppStepOneInitialState = {
  instrument: ''
}

const validateCampAppStepFourForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.instrument?.trim()) {
    newErrors.instrument = 'Instrument is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateCampAppStepFourForm
