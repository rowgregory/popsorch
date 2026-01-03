import { FC } from 'react'

interface CampInputProps {
  name: string
  value: string
  handleInput: any
  placeholder: string
  error?: string
}

const CampInput: FC<CampInputProps> = ({ name, value, handleInput, placeholder, error }) => (
  <div className="flex flex-col w-full relative">
    <input
      id={name}
      name={name}
      value={value || ''}
      onChange={handleInput}
      placeholder={error ? error : placeholder}
      aria-label={placeholder}
      className={`camp-input bg-transparent border-1 py-3 px-8  placeholder:text-11 placeholder:uppercase placeholder:italic text-sm w-full rounded-sm focus:outline-none focus:placeholder:text-transparent ${
        error
          ? 'border-blaze hover:border-blazehover placeholder:text-sunburst'
          : 'border-zinc-400 hover:border-zinc-300 focus:border-zinc-300 placeholder:text-white'
      }`}
    />
  </div>
)

export default CampInput
