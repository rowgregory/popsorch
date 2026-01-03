import { AlertCircle } from 'lucide-react'
import { FC } from 'react'

interface AdminSelectProps {
  name: string
  value: string
  onChange: any
  label?: string
  error?: string
  list: string[]
  isRequired?: boolean
}

const AdminSelect: FC<AdminSelectProps> = ({ name, value, onChange, label, error, list, isRequired = false }) => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
        {label} {isRequired && '*'}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        aria-label={label}
        className={`w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
          error ? 'border-red-500' : 'border-neutral-600'
        }`}
      >
        {list.map((role: string, i: number) => (
          <option key={i} value={role}>
            {role}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default AdminSelect
