interface ValidationErrors {
  name: string
  filename: string
  filePath: string
  externalLink: string
  description: string
  color: string
  level: string
}

export const sponsorInitialState = {
  name: '',
  filename: '',
  filePath: '',
  externalLink: '',
  description: '',
  color: '',
  level: ''
}

const validateSponsorForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }
  if (!inputs?.filename?.trim()) {
    newErrors.filename = 'Filename is required'
  }
  if (!inputs?.filePath?.trim()) {
    newErrors.filePath = 'FilePath is required'
  }
  if (!inputs?.externalLink?.trim()) {
    newErrors.externalLink = 'External link is required'
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = 'Description is required'
  }
  if (!inputs?.color?.trim()) {
    newErrors.color = 'Color is required'
  }
  if (!inputs?.level?.trim()) {
    newErrors.level = 'Level is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateSponsorForm
