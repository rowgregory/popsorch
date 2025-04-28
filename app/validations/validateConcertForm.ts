interface ValidationErrors {
  name: string
  type: string
  pressRelease: string
  description: string
  imageUrl: string
  eventDetails: []
  allSeriesExternalLink: string
}

const validateConcertForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }
  if (!inputs?.type?.trim()) {
    newErrors.type = 'Concert type is required'
  }
  if (!inputs?.pressRelease?.trim()) {
    newErrors.pressRelease = 'Press release is required'
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = 'Description is required'
  }
  if (!inputs?.imageUrl) {
    newErrors.imageUrl = 'Photo is required'
  }
  if (inputs?.eventDetails.length === 0 || !inputs?.eventDetails) {
    newErrors.eventDetails = 'At least one show'
  }
  if (!inputs?.allSeriesExternalLink) {
    newErrors.allSeriesExternalLink = 'Audience View link required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateConcertForm
