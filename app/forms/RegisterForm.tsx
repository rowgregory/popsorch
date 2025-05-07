import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { clearErrors, createFormActions } from '../redux/features/formSlice'
import { securityQuestions } from '@/public/data/auth.data'
import Spinner from '../components/common/Spinner'
import Link from 'next/link'
import AuthInput from './elements/AuthInput'
import AuthSelect from './elements/AuthSelect'
import { AuthFormProps } from '../types/auth.types'

const RegisterForm: FC<AuthFormProps> = ({ handleSubmit, isLoading, error }) => {
  const dispatch = useAppDispatch()
  const { registerForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput, handleSelect } = createFormActions('registerForm', dispatch)

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="max-w-lg w-full mx-auto relative">
        <h1 className="font-semibold text-3xl">Hi there,</h1>
        <h2 className="font-bold text-3xl text-blaze">Register for The Pops</h2>
        <h3 className="text-12 font-lato mb-14">
          This registration is for admin use only and is not intended for public access.
        </h3>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col 760:flex-row gap-y-8 760:gap-8">
            <AuthInput
              name="firstName"
              value={registerForm?.inputs?.firstName}
              onChange={handleInput}
              label="First Name"
              error={registerForm?.errors?.firstName}
            />
            <AuthInput
              name="lastName"
              value={registerForm?.inputs?.lastName}
              onChange={handleInput}
              label="Last Name"
              error={registerForm?.errors?.lastName}
            />
          </div>
          <div className="flex flex-col 760:flex-row gap-y-8 760:gap-8">
            <AuthInput
              name="email"
              value={registerForm?.inputs?.email}
              onChange={handleInput}
              label="Email"
              error={registerForm?.errors?.email}
            />
          </div>
          <AuthSelect
            label="Security Question"
            value={registerForm?.inputs?.securityQuestion}
            onChange={handleSelect}
            items={securityQuestions}
            name="securityQuestion"
            error={registerForm?.errors?.securityQuestion}
          />
          <AuthInput
            name="securityAnswer"
            value={registerForm?.inputs?.securityAnswer}
            onChange={handleInput}
            label="Security Answer"
            error={registerForm?.errors?.securityAnswer}
          />
          <AuthInput
            name="password"
            value={registerForm?.inputs?.password}
            onChange={handleInput}
            label="Password"
            error={registerForm?.errors?.password}
          />
          <AuthInput
            name="registerCode"
            value={registerForm?.inputs?.registerCode}
            onChange={handleInput}
            label="Register Code"
            error={registerForm?.errors?.registerCode}
          />
        </div>
        {error && (
          <div className="font-changa text-12 font-semibold text-blaze absolute bottom-28 left-1/2 -translate-x-1/2">
            {error}
          </div>
        )}
        <button
          className="w-full bg-blaze hover:bg-blazehover duration-300 mt-12 text-white font-changa uppercase text-13 py-4 rounded-sm font-semibold focus:outline-none border-1 border-transparent focus:border-white"
          type="submit"
        >
          {isLoading ? <Spinner fill="fill-white" track="text-blaze" /> : 'Register'}
        </button>
        <div className="w-full flex items-center justify-center mt-7">
          <Link
            onClick={() => dispatch(clearErrors({ formName: 'loginForm' }))}
            href="/auth/login"
            className="font-changa text-13 uppercase font-semibold text-blaze focus:outline-none border-b-2 border-b-transparent focus:border-b-blaze hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
