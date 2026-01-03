import { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { createFormActions } from '@/app/redux/features/formSlice'
import Spinner from '@/app/components/common/Spinner'
import AuthInput from './elements/AuthInput'
import Link from 'next/link'
import { AuthFormProps } from '@/app/types/auth.types'

const ResetPasswordForm: FC<AuthFormProps> = ({ handleSubmit, isLoading, error }) => {
  const dispatch = useAppDispatch()
  const { forgotPasswordForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput } = createFormActions('forgotPasswordForm', dispatch)

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="max-w-lg w-full mx-auto relative">
        <h1 className="font-semibold text-3xl mb-14">Reset Password</h1>
        <div className="flex flex-col gap-y-7">
          <AuthInput
            name="password"
            value={forgotPasswordForm?.inputs?.password}
            onChange={handleInput}
            label="Password"
            error={forgotPasswordForm?.errors?.password}
          />
        </div>
        {error && (
          <div className="font-changa text-12 font-semibold text-blaze absolute bottom-24 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
            {error}
          </div>
        )}
        <button
          className="w-full bg-blaze mt-12 text-white font-changa uppercase text-13 py-3 font-semibold"
          type="submit"
        >
          {isLoading ? <Spinner fill="fill-white" track="text-blaze" /> : 'Reset Password'}
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

export default ResetPasswordForm
