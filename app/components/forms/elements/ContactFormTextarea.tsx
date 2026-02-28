import { FC } from 'react'

interface ContactFormTextareaProps {
  name: string
  value: string
  onChange: any
  placeholder: string
  label?: string
  error?: string
  required?: boolean
}

const ContactFormTextarea: FC<ContactFormTextareaProps> = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required
}) => {
  return (
    <div className="flex flex-col w-full relative">
      <label htmlFor={name} className="sr-only">
        {label}
        {required && ' (required)'}
      </label>
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        rows={6}
        className={`camp-input bg-transparent border-1 text-white py-3 px-8 placeholder:text-white placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-1 focus-visible:ring-offset-blaze resize-y ${
          error
            ? 'border-blaze hover:border-blazehover'
            : 'border-[#b2b2b2] hover:border-zinc-300 focus:border-zinc-300'
        }`}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-blaze font-changa text-13 mt-1 px-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default ContactFormTextarea
