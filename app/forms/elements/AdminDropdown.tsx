import React, { FC } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

interface AdminDropdownProps {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  label: string
  error?: string
  options: { value: string; label: string }[]
  isRequired?: boolean
  placeholder?: string
}

const AdminDropdown: FC<AdminDropdownProps> = ({
  name,
  value,
  onChange,
  label,
  error,
  options,
  isRequired,
  placeholder = 'Select an option'
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-neutral-300 mb-2">
        {label} {isRequired && '*'}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 appearance-none cursor-pointer ${
            error ? 'border-red-500' : 'border-neutral-600'
          }`}
        >
          <option value="" disabled className="text-neutral-500">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-neutral-800 text-neutral-200">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default AdminDropdown
