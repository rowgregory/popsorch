import { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { createFormActions } from '@/app/redux/features/formSlice'
import { motion } from 'framer-motion'
import AuthInput from './elements/AuthInput'
import Link from 'next/link'
import AuthSelect from './elements/AuthSelect'
import { securityQuestions } from '@/public/data/auth.data'
import { AuthFormProps } from '@/app/types/auth.types'
import { ArrowRight, Loader2 } from 'lucide-react'

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
              <span>Verify...</span>
            </>
          ) : (
            <>
              <span>Enter credentials</span>
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

export default ForgotPasswordForm
