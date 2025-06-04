import React, { FC } from 'react'

interface AdminInputProps {
  name: string
  value: string
  onChange: any
  label?: string
  error?: string
  placeholder?: string
}

const AdminInput: FC<AdminInputProps> = ({ name, value, onChange, label, error, placeholder }) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-1">
        <label htmlFor={name} className="font-medium text-sm font-lato capitalize">
          {label ?? name}
        </label>
      </div>
      <input
        id={name}
        name={name}
        type="text"
        value={value || ''}
        onChange={onChange}
        aria-label={label}
        className={`camp-input bg-transparent border-1 text-white py-3 px-6 placeholder:text-white placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent ${
          error
            ? 'border-blaze hover:border-blazehover'
            : 'border-[#b2b2b2] hover:border-zinc-300 focus:border-zinc-300'
        }`}
        placeholder={placeholder}
      />
    </div>
  )
}

export default AdminInput
