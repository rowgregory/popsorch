import React, { FC, useState } from 'react'
import { FloatingInputProps } from '@/app/types/form.types'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import { eyeIcon, eyeSlashIcon } from '@/app/lib/icons'
import useAutofillDetection from '@/app/hooks/useAutofillDetection'
import Spinner from '@/app/components/common/Spinner'
import AuthArrowSVG from '@/app/components/svg/AuthArrowSVG'

const FloatingInput: FC<FloatingInputProps> = ({
  value,
  handleInput,
  submitted,
  error,
  name,
  capitalName,
  type,
  isLoading,
  showSubmitBtn,
  isLogin
}) => {
  const { inputRef, isAutofilled } = useAutofillDetection()
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={name}
        type={showPassword ? 'text' : type || 'text'}
        name={name}
        value={value || ''}
        onChange={handleInput}
        className={`h-[56px] peer bg-white dark:bg-black/70 border border-gray-400 dark:border-[#2d2d2d] light-admin-input dark:dark-admin-input pt-5 pb-1 px-4 w-full text-midnightabyss dark:text-white focus:outline-none focus:ring-1 focus:ring-aquablue dark:focus:ring-oceanicnocturne placeholder-transparent`}
        placeholder={capitalName}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 text-gray-500 transition-all cursor-text
  ${
    value || isAutofilled
      ? `top-2 text-xs ${submitted && error ? 'text-red-500' : ''}`
      : `top-[16px] peer-placeholder-shown:text-base ${
          submitted && error
            ? 'peer-placeholder-shown:text-red-500 text-red-500'
            : 'peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-smokysage'
        } peer-focus:top-2 peer-focus:text-xs`
  }`}
      >
        {submitted && error ? error : capitalName}
      </label>
      {type === 'password' && (
        <AwesomeIcon
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? eyeIcon : eyeSlashIcon}
          className={`${
            isLogin ? 'right-16' : 'right-4'
          } absolute top-1/2 -translate-y-1/2 transform w-6 h-6 text-[#9ca3af] dark:text-smokysage cursor-pointer`}
        />
      )}
      {showSubmitBtn && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className="flex items-center justify-center">
              <AuthArrowSVG />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default FloatingInput
