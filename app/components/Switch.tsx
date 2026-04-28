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
      className="relative w-20 h-10 flex items-center rounded-full transition-colors duration-300 bg-zinc-800 border border-zinc-700"
    >
      <span
        className={`absolute left-2 w-7 h-7 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
          enabled ? 'translate-x-9 bg-linear-to-r from-blaze to-sunburst' : 'translate-x-0 bg-zinc-900'
        }`}
      >
        {isLoading && (
          <svg
            className={`w-4 h-4 animate-spin ${enabled ? 'text-white' : 'text-blaze'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className={`opacity-75 ${enabled ? 'fill-white' : 'fill-blaze'}`}
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
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
