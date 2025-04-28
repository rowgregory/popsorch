interface ValidationErrors {
  firstName: string
  lastName: string
  email: string
  agreedToPrivacyStatement: boolean
}

const validateNewsletterForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = 'First name is required'
  }

  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = 'Last name is required'
  }

  if (!inputs?.email?.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) {
    newErrors.email = 'Invalid email format'
  }

  if (!inputs?.agreedToPrivacyStatement) {
    newErrors.agreedToPrivacyStatement = 'Please accept the privacy statement.'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateNewsletterForm
