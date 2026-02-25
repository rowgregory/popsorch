import { AlertCircle } from 'lucide-react'
import { FC } from 'react'

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
    <div className="mb-2">
      <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
        {label} {isRequired && '*'}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent ${
          error ? 'border-red-500' : 'border-neutral-600'
        }`}
        placeholder={placeholder ?? 'Sqysh'}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default AdminInput
