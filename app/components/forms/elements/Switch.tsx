import Spinner from '@/app/components/common/Spinner'
import { FC, useRef } from 'react'

interface SwitchProps {
  enabled: any
  onChange: any
  isLoading?: boolean
  name: string
}

const Switch: FC<SwitchProps> = ({ enabled, onChange, isLoading, name }) => {
  const inputRef = useRef(null) as any

  return (
    <button
      type="button"
      onClick={(e: any) => {
        e.stopPropagation()
        inputRef?.current?.click()
      }}
      className={`relative w-20 h-10 flex items-center rounded-full transition-colors duration-300 bg-zinc-800 border-1 border-zinc-700`}
    >
      <span
        className={`absolute left-2 w-7 h-7 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
          enabled ? `translate-x-9 bg-linear-to-r from-blaze to-sunburst` : 'translate-x-0 bg-zinc-900'
        }`}
      >
        {isLoading && (
          <Spinner fill={enabled ? 'fill-white' : `fill-blaze`} track={`${enabled ? `text-blaze` : 'text-duskgray'}`} />
        )}
      </span>
      <input
        name={name}
        ref={inputRef}
        type="checkbox"
        checked={enabled || false}
        onChange={onChange}
        className="hidden"
      />
    </button>
  )
}

export default Switch
