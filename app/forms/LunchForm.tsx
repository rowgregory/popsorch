import React, { FC } from 'react'
import { Errors, Inputs } from '../hooks/useForm'
import FloatingInput from './elements/FloatingInput'

const lunchForm = (inputs: Inputs, errors: Errors) => [
  {
    name: 'name',
    value: inputs.name || '',
    label: 'Name',
    error: errors.name
  },
  {
    name: 'patronCount',
    type: 'number',
    value: inputs.patronCount || '',
    label: 'Patron Count',
    error: errors.patronCount
  },
  {
    name: 'lunchTime',
    value: inputs.lunchTime || '',
    label: 'Lunch Time',
    error: errors.lunchTime
  },
  {
    name: 'lunchLocation',
    value: inputs.lunchLocation || '',
    label: 'Lunch Location',
    error: errors.lunchLocation
  },
  {
    name: 'host',
    value: inputs.host || '',
    label: 'Host',
    error: errors.host
  },
  {
    name: 'description',
    value: inputs.description || '',
    label: 'Description',
    error: errors.description
  }
]

const LunchForm: FC<{
  onSubmit: any
  inputs: Inputs
  submitted: boolean
  errors: Errors
  handleInput: (e: any) => void
  error: any
  isLoading: boolean
  isUpdating: boolean
  setInputs: any
}> = ({ onSubmit, inputs, submitted, errors, handleInput, error, isLoading, isUpdating }) => {
  const updateText = isUpdating ? 'Update' : 'Create'
  return (
    <form onSubmit={onSubmit} className="w-full mx-auto flex flex-col gap-y-3">
      <h1 className="mb-1 font-semibold text-xl text-center">{updateText} Lunch</h1>
      {lunchForm(inputs, errors).map((item: any, i) => (
        <FloatingInput
          key={i}
          type={item.type || 'text'}
          value={item.value}
          handleInput={handleInput}
          submitted={submitted}
          error={item.error}
          name={item.name}
          capitalName={item.label}
          isLoading={isLoading}
        />
      ))}
      {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}
      <button className="bg-blaze text-white px-5 py-3 mt-10 uppercase font-semibold">{updateText}</button>
    </form>
  )
}

export default LunchForm
