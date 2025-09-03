interface ValidationErrors {
  name: string
  filename: string
  externalLink: string
  level: string
  amount: string
}

export const sponsorInitialState = {
  name: '',
  filename: '',
  externalLink: '',
  level: '',
  amount: ''
}

const validateSponsorForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }
  if (!inputs?.filename?.trim()) {
    newErrors.filename = 'Image is required'
  }
  if (!inputs?.externalLink?.trim()) {
    newErrors.externalLink = 'External link is required'
  }
  if (!inputs?.level?.trim()) {
    newErrors.level = 'Level is required'
  }
  if (!inputs?.amount?.trim()) {
    newErrors.amount = 'Amount is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateSponsorForm
