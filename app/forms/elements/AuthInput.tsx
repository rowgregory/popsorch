import React, { FC } from 'react'

interface AuthInputProps {
  name: string
  value: string
  onChange: any
  label: string
  error?: string
}

const AuthInput: FC<AuthInputProps> = ({ name, value, onChange, label, error }) => {
  return (
    <div className="flex flex-col gap-y-1 w-full relative">
      <div className="flex items-center gap-x-1">
        <label htmlFor={name} className="font-semibold font-lato text-13 text-white capitalize">
          {label}
        </label>
      </div>
      <input
        id={name}
        name={name}
        type="text"
        value={value || ''}
        onChange={onChange}
        className={`${
          error ? 'border-blaze' : 'border-zinc-400 focus:border-white'
        } camp-input w-full h-14 px-4 border-1 bg-transparent focus:outline-none `}
      />

      <div className="text-blaze font-changa text-13 absolute left-0 -bottom-6">{error}</div>
    </div>
  )
}

export default AuthInput
