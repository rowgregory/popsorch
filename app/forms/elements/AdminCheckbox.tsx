import Spinner from '@/app/components/common/Spinner'
import { FC, useRef } from 'react'

interface AdminCheckboxProps {
  name: string
  value: boolean
  label: string
  handleToggle: any
  error?: string
  isLoading: boolean
  colors?: any
}

const AdminCheckbox: FC<AdminCheckboxProps> = ({ name, value, label, handleToggle, error, isLoading, colors }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <div className="flex items-center gap-x-4">
        <div className="uppercase font-changa text-12 text-white">{label}</div>
        {isLoading ? (
          <Spinner fill="fill-sky-500" track="text-midnightblack" wAndH="w-6 h-6" />
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className={`${
              colors?.border ?? 'border-sky-500'
            } w-6 h-6 border-2  duration-300 cursor-pointer flex items-center justify-center rounded-sm`}
          >
            {value && <div className={`w-3 h-3 ${colors?.bg ?? 'bg-sky-500'}`}></div>}
          </div>
        )}
        <input
          ref={inputRef}
          type="checkbox"
          name={name}
          id={name}
          onChange={handleToggle}
          checked={value || false}
          className="hidden"
        />
      </div>
      {error && (
        <div className={`${colors?.text ?? 'text-sky-500'} absolute text-13 font-lato left-12 -bottom-4 mt-2`}>
          {error}
        </div>
      )}
    </div>
  )
}

export default AdminCheckbox
