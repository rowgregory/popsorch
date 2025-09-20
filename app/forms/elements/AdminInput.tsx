import { AlertCircle } from 'lucide-react'
import React, { FC } from 'react'

interface AdminInputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  error?: string
  placeholder?: string
  isRequired?: false
}

const AdminInput: FC<AdminInputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  error,
  placeholder,
  isRequired
}) => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
        {label} {isRequired && '*'}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
          error ? 'border-red-500' : 'border-neutral-600'
        }`}
        placeholder={placeholder ?? 'Sqysh'}
      />
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default AdminInput
