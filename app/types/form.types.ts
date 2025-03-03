import { ChangeEvent } from 'react'

export interface FloatingInputProps {
  value: string
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  submitted: boolean
  error: string
  name: string
  capitalName: string
  type?: string
  isLoading?: boolean
  showSubmitBtn?: boolean
  isLogin?: boolean
}

export interface FloatingTextareaProps {
  value: string
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void
  submitted: boolean
  error: string
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
