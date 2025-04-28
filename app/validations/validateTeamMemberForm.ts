interface ValidationErrors {
  firstName: string
  lastName: string
  position: string
  imageUrl: string
  role: string
  bio: string
}

const validateTeamMemberForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = 'First name is required'
  }

  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = 'Last name is required'
  }
  if (!inputs?.position?.trim()) {
    newErrors.position = 'Position is required'
  }
  if (!inputs?.imageUrl?.trim()) {
    newErrors.imageUrl = 'Photo is required'
  }
  if (!inputs?.imageUrl?.trim()) {
    newErrors.imageUrl = 'Photo is required'
  }

  if (!inputs?.role?.trim()) {
    newErrors.role = 'Role is required'
  }
  if (!inputs?.bio?.trim()) {
    newErrors.bio = 'Bio is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateTeamMemberForm
