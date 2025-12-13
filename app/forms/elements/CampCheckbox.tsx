import { FC, useRef } from 'react'

interface CampCheckboxProps {
  name: string
  value: string
  label: string
  handleToggle: any
  error?: string
}

const CampCheckbox: FC<CampCheckboxProps> = ({ name, value, label, handleToggle, error }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <div className="flex items-center gap-x-4">
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-9 h-9 border-1 border-blaze duration-150 cursor-pointer flex items-center justify-center rounded-sm`}
        >
          {value && <div className="w-5 h-5 bg-blaze"></div>}
        </div>
        <div className="text-sm font-lato text-white">{label}</div>
        <input
          ref={inputRef}
          type="checkbox"
          name={name}
          id={name}
          onChange={handleToggle}
          value={value || 'off'}
          className="hidden"
        />
      </div>
      {error && <div className="absolute text-13 text-blaze font-lato left-12 -bottom-4 mt-2">{error}</div>}
    </div>
  )
}

export default CampCheckbox
