import { AlertCircle } from 'lucide-react'
import { FC } from 'react'

interface AdminTextareaProps {
  name: string
  value: string
  onChange: any
  label?: string
  subLabel?: string
  error?: string
  rows?: number
  placeholder?: string
  isRequired?: boolean
}

const AdminTextarea: FC<AdminTextareaProps> = ({ name, value, onChange, label, subLabel, error, rows, isRequired }) => {
  return (
    <div className="mb-2">
      <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
        {label} {isRequired && '*'}
      </label>
      {subLabel && <p className="text-xs text-neutral-400 mb-3">{subLabel}</p>}
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
          error ? 'border-red-500' : 'border-neutral-600'
        }`}
        rows={rows ?? 10}
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

export default AdminTextarea
