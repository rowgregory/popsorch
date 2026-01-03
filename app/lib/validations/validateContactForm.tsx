interface ValidationErrors {
  name: string
  email: string
  message: string
}

export const contactInitialState = {
  name: '',
  email: '',
  message: ''
}

const validateContactForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!inputs?.email?.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) {
    newErrors.email = 'Invalid email format'
  }
  if (!inputs?.message?.trim()) {
    newErrors.message = 'Message is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateContactForm
