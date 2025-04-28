import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { clearErrors, createFormActions } from '../redux/features/formSlice'
import Spinner from '../components/common/Spinner'
import AuthInput from './elements/AuthInput'
import Link from 'next/link'

const LoginForm: FC<{ handleSubmit: any; isLoading: boolean; error: string }> = ({
  handleSubmit,
  isLoading,
  error
}) => {
  const dispatch = useAppDispatch()
  const { loginForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput } = createFormActions('loginForm', dispatch)

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="max-w-lg w-full mx-auto relative">
        <h1 className="font-semibold text-3xl">Hi there,</h1>
        <h1 className="font-bold text-3xl mb-14 text-blaze">Welcome Back</h1>
        <div className="flex flex-col gap-y-7">
          <AuthInput
            name="email"
            value={loginForm?.inputs?.email}
            onChange={handleInput}
            label="Email"
            error={loginForm?.errors?.email}
          />
          <AuthInput
            name="password"
            value={loginForm?.inputs?.password}
            onChange={handleInput}
            label="Password"
            error={loginForm?.errors?.password}
          />
        </div>
        <div className="w-full flex items-center justify-end mt-1.5">
          <Link href="/auth/forgot-password" className="font-changa uppercase text-13 font-semibold text-blaze">
            Forgot Password
          </Link>
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
          {isLoading ? <Spinner fill="fill-white" track="text-blaze" /> : 'Login'}
        </button>
        <div className="w-full flex items-center justify-center mt-7">
          <Link
            onClick={() => dispatch(clearErrors({ formName: 'registerForm' }))}
            href="/auth/register"
            className="font-changa text-13 uppercase font-semibold text-blaze"
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
