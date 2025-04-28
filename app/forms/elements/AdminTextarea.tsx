import React, { FC } from 'react'

interface AdminTextareaProps {
  name: string
  value: string
  onChange: any
  label?: string
  error?: string
  rows?: number
}

const AdminTextarea: FC<AdminTextareaProps> = ({ name, value, onChange, label, error, rows }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-1">
        <label htmlFor={name} className="font-medium text-sm font-lato capitalize">
          {label ?? name}
        </label>
      </div>
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`camp-input bg-transparent border-1 text-white py-3 px-8 placeholder:text-zinc-300 placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent ${
          error
            ? 'border-blaze hover:border-blazehover'
            : 'border-[#b2b2b2] hover:border-zinc-300 focus:border-zinc-300'
        }`}
        rows={rows ?? 10}
      ></textarea>
    </div>
  )
}

export default AdminTextarea
