import { ChangeEvent } from 'react'

export interface FloatingInputProps {
  value: string | any
  handleInput: any
  submitted: boolean
  error?: string
  name: string
  capitalName: string
  type?: string
  isLoading?: boolean
  showSubmitBtn?: boolean
  isLogin?: boolean
}

export interface FloatingTextareaProps {
  value: string | any
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void
  submitted: boolean
  error?: string
  name: string
  capitalName: string
}

export interface FloatingSelectProps {
  value: string
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  submitted: boolean
  error: string
  name: string
  capitalName: string
  options: string[]
}

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
