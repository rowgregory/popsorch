'use client'

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

export type Inputs = {
  [key: string]: string | number | boolean | undefined | unknown
}

export type Errors = {
  [key: string]: string
}

export type UseFormHook = {
  inputs: Inputs
  errors: Errors
  handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  handleToggle: (event: ChangeEvent<HTMLInputElement>) => void
  setInputs: Dispatch<SetStateAction<Inputs>>
  setErrors: Dispatch<SetStateAction<Errors>>
  submitted: boolean
  setSubmitted: Dispatch<SetStateAction<boolean>>
}

const useForm = (
  fields: Record<string, string | number | boolean | [] | object | undefined | null>,
  validateForm?: (inputs: Inputs, setErrors: (errors: Errors) => void, name?: string) => unknown,
  data?: Inputs
): UseFormHook => {
  const [inputs, setInputs] = useState<Inputs>(fields)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (data) {
      setInputs((prev) => ({
        ...prev,
        ...data
      }))
    }
  }, [data])

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))

    if (validateForm) {
      validateForm({ ...inputs, [name]: value }, setErrors, name)
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))

    if (validateForm) {
      validateForm({ ...inputs, [name]: value }, setErrors, name)
    }
  }

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setInputs((prev) => ({
      ...prev,
      [name]: checked
    }))

    if (validateForm) {
      validateForm({ ...inputs, [name]: checked }, setErrors, name)
    }
  }

  return {
    inputs,
    errors,
    handleInput,
    handleSelect,
    handleToggle,
    setInputs,
    setErrors,
    submitted,
    setSubmitted
  }
}

export default useForm
