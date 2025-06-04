import React, { ChangeEventHandler, FC } from 'react'

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
    <div className="flex flex-col gap-y-1">
      <label htmlFor={name} className="font-semibold font-lato text-13 text-white capitalize">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`${
          error ? 'border-blaze' : 'border-zinc-400'
        } w-full h-14 px-4 border-1 bg-transparent focus:outline-none focus:border-white`}
      >
        {items.map((question, i) => (
          <option key={i} value={i === 0 ? '' : question} disabled={i === 0}>
            {question}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AuthSelect
