import { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { createFormActions } from '@/app/redux/features/formSlice'
import { securityQuestions } from '@/public/data/auth.data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AuthInput from './elements/AuthInput'
import AuthSelect from './elements/AuthSelect'
import { AuthFormProps } from '@/app/types/auth.types'
import { ArrowRight, Loader2 } from 'lucide-react'

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
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-blaze to-blaze hover:from-blaze/90 hover:to-blaze/90 disabled:from-neutral-700 disabled:to-neutral-600 text-white rounded-lg transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        <div className="text-center mt-6">
          <p className="text-neutral-400 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blaze hover:text-blaze font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
