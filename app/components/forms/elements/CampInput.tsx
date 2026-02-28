import { FC } from 'react'

interface CampInputProps {
  name: string
  value: string
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url'
}

const CampInput: FC<CampInputProps> = ({ name, value, handleInput, placeholder, error, required, type = 'text' }) => (
  <div className="flex flex-col w-full relative">
    <label htmlFor={name} className="sr-only">
      {placeholder}
      {required && ' (required)'}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value || ''}
      onChange={handleInput}
      placeholder={placeholder}
      required={required}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`camp-input bg-transparent border-1 py-3 px-8 placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-1 focus-visible:ring-offset-blaze focus:placeholder:text-transparent ${
        error
          ? 'border-blaze hover:border-blazehover placeholder:text-sunburst'
          : 'border-zinc-400 hover:border-zinc-300 focus:border-zinc-300 placeholder:text-white'
      }`}
    />
    {error && (
      <p id={`${name}-error`} role="alert" className="text-blaze font-changa text-13 mt-1 px-1">
        {error}
      </p>
    )}
  </div>
)

export default CampInput
