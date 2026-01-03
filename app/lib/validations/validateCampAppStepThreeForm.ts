interface ValidationErrors {
  parentFirstName: string
  parentLastName: string
  parentEmailAddress: string
  parentPhoneNumber: string
  consent: boolean
}

export const campAppStepOneInitialState = {
  parentFirstName: '',
  parentLastName: '',
  parentEmailAddress: '',
  parentPhoneNumber: '',
  consent: false
}

const validateCampAppStepThreeForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.parentFirstName?.trim()) {
    newErrors.parentFirstName = 'First name is required'
  }

  if (!inputs?.parentLastName?.trim()) {
    newErrors.parentLastName = 'Last name is required'
  }

  if (!inputs?.parentEmailAddress?.trim()) {
    newErrors.parentEmailAddress = 'Email is required'
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.parentEmailAddress)) {
    newErrors.parentEmailAddress = 'Invalid email format'
  }

  if (!inputs?.parentPhoneNumber?.trim()) {
    newErrors.parentPhoneNumber = 'Phone Number is required'
  } else if (!/^\d{10}$/.test(inputs.parentPhoneNumber)) {
    newErrors.parentPhoneNumber = 'Phone Number must be 10 digits'
  }

  if (!inputs?.consent) {
    newErrors.consent = 'Confirm your consent by checking the box'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateCampAppStepThreeForm
