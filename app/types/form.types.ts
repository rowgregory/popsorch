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
