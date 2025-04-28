import React, { FC } from 'react'

interface CampSelectProps {
  name: string
  value: string
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
}

const CampSelect: FC<CampSelectProps> = ({ name, value, handleInput, options }) => {
  return (
    <div className="flex flex-col w-full relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleInput}
        aria-label="How did you hear about the Pops?"
        className="bg-transparent border-1 py-3 px-8 text-sm w-full rounded-sm focus:outline-none focus:border-zinc-300 focus:duration-300 text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CampSelect
