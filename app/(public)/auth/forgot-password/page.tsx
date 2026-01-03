'use client'

import Link from 'next/link'
import { useAppDispatch, useAuthSelector, useFormSelector, useUserSelector } from '@/app/redux/store'
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/app/redux/services/authApi'
import ForgotPasswordForm from '@/app/components/forms/ForgotPasswordForm'
import validateForgotPasswordForm from '@/app/lib/validations/validateForgotPasswordForm'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm'
import validateResetPasswordForm from '@/app/lib/validations/validateResetPasswordForm'
import { getErrorMessage } from '@/app/utils/logHelper'
import { resetAuthSuccess } from '@/app/redux/features/authSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { showToast } from '@/app/redux/features/toastSlice'

const ForgotPassword = () => {
  const { forgotPasswordForm } = useFormSelector()
  const { success, passwordReset } = useAuthSelector()
  const { user } = useUserSelector()
  const [forgotPassword, { isLoading, error: errorForgotPassword }] = useForgotPasswordMutation()
  const [resetPassword, { isLoading: loadingResetPassword, error: errorResetPassword }] = useResetPasswordMutation()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('forgotPasswordForm', dispatch)

  const handleForgotPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateForgotPasswordForm(forgotPasswordForm?.inputs, setErrors)) return

    try {
      await forgotPassword({
        email: forgotPasswordForm.inputs.email,
        securityQuestion: forgotPasswordForm.inputs.securityQuestion,
        securityAnswer: forgotPasswordForm.inputs.securityAnswer
      }).unwrap()
      dispatch(showToast({ message: 'Sucessfully verified inputs', type: 'success' }))
    } catch {
      dispatch(showToast({ message: 'Failed to verify inputs', type: 'error' }))
    }
  }

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateResetPasswordForm(forgotPasswordForm?.inputs, setErrors)) return

    try {
      await resetPassword({
        userId: user.id,
        password: forgotPasswordForm.inputs.password
      }).unwrap()

      dispatch(showToast({ message: 'Sucessfully reset password', type: 'success' }))
      dispatch(resetAuthSuccess())
      dispatch(resetForm('forgotPasswordForm'))
    } catch {
      dispatch(showToast({ message: 'Failed to reset password', type: 'error' }))
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-neutral-950">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href="/" className="flex items-center justify-center mb-4">
              <div className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-[80px]" />
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {passwordReset ? (
              // Success Screen
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="flex justify-center"
                >
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </motion.div>

                <div>
                  <h1 className="text-4xl font-bold text-white mb-3">Password Reset</h1>
                  <p className="text-neutral-400">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blaze to-blaze hover:from-blaze/90 hover:to-blaze/90 text-white rounded-lg font-semibold transition-all shadow-lg"
                  >
                    <span>Back to Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            ) : success ? (
              // Reset Password Form
              <motion.div
                key="reset"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <ResetPasswordForm
                  handleSubmit={handleResetPassword}
                  isLoading={loadingResetPassword}
                  error={getErrorMessage(errorResetPassword)}
                />
              </motion.div>
            ) : (
              // Forgot Password Form
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <ForgotPasswordForm
                  handleSubmit={handleForgotPassword}
                  isLoading={isLoading}
                  error={getErrorMessage(errorForgotPassword)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Gradient Background with Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-12"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blaze/20 via-neutral-950 to-neutral-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blaze/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 max-w-md text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Account Security</h2>
          <p className="text-lg text-neutral-300 mb-12">
            Protect your orchestra management account with a strong password. We'll help you reset it securely.
          </p>

          {/* Security Tips */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blaze text-lg">🔐</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Secure Reset Process</h3>
                <p className="text-sm text-neutral-400">We verify your identity before allowing changes</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blaze text-lg">📧</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Security Question</h3>
                <p className="text-sm text-neutral-400">Verify your identity with a security question</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blaze text-lg">🛡️</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Account Protection</h3>
                <p className="text-sm text-neutral-400">Your data is encrypted and secure</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
