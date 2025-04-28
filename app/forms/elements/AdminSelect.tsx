import React, { FC } from 'react'

interface AdminSelectProps {
  name: string
  value: string
  onChange: any
  label?: string
  error?: string
  list: string[]
}

const AdminSelect: FC<AdminSelectProps> = ({ name, value, onChange, label, error, list }) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-1">
        <label htmlFor={name} className="font-medium text-sm font-lato capitalize">
          {label ?? name}
        </label>
      </div>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        aria-label={label}
        className={`camp-input bg-transparent border-1 text-white py-3 px-6 placeholder:text-zinc-300 placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent ${
          error
            ? 'border-blaze hover:border-blazehover'
            : 'border-[#b2b2b2] hover:border-zinc-300 focus:border-zinc-300'
        }`}
      >
        {list.map((role: string, i: number) => (
          <option key={i} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AdminSelect
