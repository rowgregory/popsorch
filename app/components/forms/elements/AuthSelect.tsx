import { LucideIcon } from 'lucide-react'
import { ChangeEventHandler, FC } from 'react'

interface AuthSelectProps {
  label: string
  value: any
  onChange: ChangeEventHandler<HTMLSelectElement>
  items: string[]
  name: string
  error?: string
}

const AuthSelect: FC<AuthSelectProps> = ({ label, value, onChange, items, name, error }) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={name} className="text-sm font-medium text-neutral-300 capitalize">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full py-3 px-4 bg-neutral-900/50 rounded-lg text-neutral-100 focus:outline-none transition-all appearance-none cursor-pointer ${
          error
            ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400'
            : 'border border-neutral-700 focus:ring-2 focus:ring-blaze focus:border-blaze'
        }`}
      >
        {items.map((question, i) => (
          <option key={i} value={i === 0 ? '' : question} disabled={i === 0}>
            {question}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
    </div>
  )
}

export default AuthSelect
