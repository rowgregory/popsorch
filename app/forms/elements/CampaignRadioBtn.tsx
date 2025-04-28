import { FC, useRef } from 'react'

interface CampRadioBtnProps {
  name: string
  label: string
  value: string
  selected: string
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CampRadioBtn: FC<CampRadioBtnProps> = ({ name, label, value, selected, handleInput }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <label
      className={`col-span-12 1315:col-span-2 flex items-center gap-x-2 text-sm cursor-pointer ${
        selected === value ? 'text-blaze' : 'text-white'
      }`}
    >
      <div
        onClick={() => inputRef.current?.click()}
        className="w-6 h-6 border-2 flex items-center justify-center border-blaze rounded-full"
      >
        {selected === value && <div className="w-3 h-3 bg-blaze rounded-full"></div>}
      </div>
      <div className="text-sm font-lato text-white">{label}</div>
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={handleInput}
        className="hidden"
      />
    </label>
  )
}

export default CampRadioBtn
