interface ValidationErrors {
  name: string
  capacity: string
  accessibility: string
  parking: string
  immersiveEnvironment: string
  imageUrl: string
  address: string
}

const validateVenueForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!inputs?.capacity?.trim()) {
    newErrors.capacity = 'Capacity is required'
  }
  if (!inputs?.accessibility?.trim()) {
    newErrors.accessibility = 'Accessibility is required'
  }
  if (!inputs?.parking?.trim()) {
    newErrors.parking = 'Parking is required'
  }
  if (!inputs?.imageUrl?.trim()) {
    newErrors.imageUrl = 'Photo is required'
  }

  if (!inputs?.immersiveEnvironment?.trim()) {
    newErrors.immersiveEnvironment = 'Immersive environment is required'
  }
  if (!inputs?.address?.trim()) {
    newErrors.address = 'Address os required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateVenueForm
