import { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import Spinner from '../components/common/Spinner'
import AuthInput from './elements/AuthInput'
import Link from 'next/link'
import AuthSelect from './elements/AuthSelect'
import { securityQuestions } from '@/public/data/auth.data'
import { AuthFormProps } from '../types/auth.types'

const ForgotPasswordForm: FC<AuthFormProps> = ({ handleSubmit, isLoading, error }) => {
  const dispatch = useAppDispatch()
  const { forgotPasswordForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput, handleSelect } = createFormActions('forgotPasswordForm', dispatch)

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="max-w-lg w-full mx-auto relative">
        <h1 className="font-semibold text-3xl">Hi there,</h1>
        <h1 className="font-bold text-3xl mb-14 text-blaze">Sorry you&apos;re having trouble</h1>
        <div className="flex flex-col gap-y-7">
          <AuthInput
            name="email"
            value={forgotPasswordForm?.inputs?.email}
            onChange={handleInput}
            label="Email"
            error={forgotPasswordForm?.errors?.email}
          />
          <AuthSelect
            label="Security Question"
            value={forgotPasswordForm?.inputs?.securityQuestion}
            onChange={handleSelect}
            items={securityQuestions}
            name="securityQuestion"
            error={forgotPasswordForm?.errors?.securityQuestion}
          />
          <AuthInput
            name="securityAnswer"
            value={forgotPasswordForm?.inputs?.securityAnswer}
            onChange={handleInput}
            label="Security Answer"
            error={forgotPasswordForm?.errors?.securityAnswer}
          />
        </div>
        {error && (
          <div className="font-changa text-12 font-semibold text-blaze absolute bottom-24 left-1/2 -translate-x-1/2">
            {error}
          </div>
        )}
        <button
          className="w-full bg-blaze mt-12 text-white font-changa uppercase text-13 py-3 font-semibold"
          type="submit"
        >
          {isLoading ? <Spinner fill="fill-white" track="text-blaze" /> : 'Verify'}
        </button>
        <div className="w-full flex items-center justify-center mt-7">
          <Link href="/auth/login" className="font-changa text-13 uppercase font-semibold text-blaze">
            Login
          </Link>
        </div>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
