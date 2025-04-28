interface ValidationErrors {
  name: string
  review: string
}

const validateTestimonialForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!inputs?.review?.trim()) {
    newErrors.review = 'Review is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateTestimonialForm
