export interface IForm {
  inputs: any
  handleInput: any
  handleSubmit: any
  loading: boolean
  errors?: any
  close?: () => void
  handleToggle?: any
  uploadingVideo?: boolean
  isUpdating?: boolean
  user?: null | undefined
  users?: null | undefined
  ref?: any
}

export interface FormActions {
  setInputs: (data: any) => void
  clearInputs: () => void
  setErrors: (errors: any) => void
  setSubmitted: (submitted: boolean) => void
  handleInput: (e: any) => void
  handleSelect: (e: any) => void
  handleToggle: (e: any) => void
  addVenue: (venue: any) => void
  addConcertDetails: (newId: string) => void
  updateConcertDetails: (eventDetailId: string) => void
  removeConcertDetails: (concertId: string) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFileDrop: (event: React.DragEvent<HTMLDivElement>) => void
  handleUploadProgress: (progress: any) => void
}
