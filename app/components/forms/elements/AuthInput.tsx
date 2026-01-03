import { LucideIcon } from 'lucide-react'
import { FC } from 'react'

interface AuthInputProps {
  name: string
  value: string
  onChange: any
  label: string
  error?: string
  type?: string
  icon?: LucideIcon
}

const AuthInput: FC<AuthInputProps> = ({ name, value, onChange, label, error, type = 'text', icon }) => {
  const IconComponent = icon
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={name} className="text-sm font-medium text-neutral-300 capitalize">
        {label}
      </label>
      <div className="relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={onChange}
          className={`w-full py-3 px-4 ${
            IconComponent ? 'pl-10' : ''
          } bg-neutral-900/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all ${
            error
              ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400'
              : 'border border-neutral-700 focus:ring-2 focus:ring-blaze focus:border-blaze'
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
    </div>
  )
}

export default AuthInput
