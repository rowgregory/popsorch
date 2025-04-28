import React, { FC } from 'react'
import useAutofillDetection from '@/app/hooks/useAutofillDetection'
import { FloatingTextareaProps } from '@/app/types/form.types'

const FloatingTextarea: FC<FloatingTextareaProps> = ({ value, handleInput, submitted, error, name, capitalName }) => {
  const { inputRef, isAutofilled } = useAutofillDetection()

  return (
    <div className="relative w-full">
      <textarea
        ref={inputRef}
        id={name}
        name={name}
        value={value || ''}
        onChange={handleInput}
        rows={7}
        className={`peer bg-white dark:bg-duskypalm border border-gray-200 dark:border-deepseashadow light-admin-input dark:dark-admin-input pt-5 pb-1 px-4 w-full text-midnightabyss dark:text-white focus:outline-none focus:ring-1 focus:ring-aquablue dark:focus:ring-oceanicnocturne placeholder-transparent`}
        placeholder={capitalName}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 text-gray-500 transition-all cursor-text
  ${
    value || isAutofilled
      ? `top-2 text-xs ${submitted && error ? 'text-red-500' : ''}`
      : `top-[18px] peer-placeholder-shown:text-base ${
          submitted && error
            ? 'peer-placeholder-shown:text-red-500 text-red-500'
            : 'peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-smokysage'
        } peer-focus:top-2 peer-focus:text-xs`
  }`}
      >
        {submitted && error ? error : capitalName}
      </label>
    </div>
  )
}

export default FloatingTextarea
