interface ValidationErrors {
  studentFirstName: string
  studentLastName: string
  grade: string
  school: string
  studentEmailAddress: string
  studentPhoneNumber: string
}

export const campAppStepOneInitialState = {
  studentFirstName: '',
  studentLastName: '',
  grade: '',
  school: '',
  studentEmailAddress: '',
  studentPhoneNumber: ''
}

const validateCampAppStepOneForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.studentFirstName?.trim()) {
    newErrors.studentFirstName = 'First name is required'
  }

  if (!inputs?.studentLastName?.trim()) {
    newErrors.studentLastName = 'Last name is required'
  }
  if (!inputs?.grade?.trim()) {
    newErrors.grade = 'Grade is required'
  }
  if (!inputs?.school?.trim()) {
    newErrors.school = 'School is required'
  }

  if (!inputs?.studentEmailAddress?.trim()) {
    newErrors.studentEmailAddress = 'Studnet email is required'
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.studentEmailAddress)) {
    newErrors.studentEmailAddress = 'Invalid studebt email format'
  }

  if (!inputs?.studentPhoneNumber?.trim()) {
    newErrors.studentPhoneNumber = 'Student phone number is required'
  } else if (!/^\d{10}$/.test(inputs.studentPhoneNumber)) {
    newErrors.studentPhoneNumber = 'Student phone number must be 10 digits'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateCampAppStepOneForm
