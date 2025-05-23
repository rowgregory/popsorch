'use client'

import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/app/redux/services/authApi'
import ForgotPasswordForm from '@/app/forms/ForgotPasswordForm'
import LogoWRobyn from '@/app/components/LogoWRobynHeader'
import validateForgotPasswordForm from '@/app/validations/validateForgotPasswordForm'
import { clearInputs, createFormActions } from '@/app/redux/features/formSlice'
import ResetPasswordForm from '@/app/forms/ResetPasswordForm'
import validateResetPasswordForm from '@/app/validations/validateResetPasswordForm'
import Link from 'next/link'
import { getErrorMessage } from '@/app/utils/logHelper'
import { resetAuthPasswordReset, resetAuthSuccess } from '@/app/redux/features/authSlice'

const ForgotPassword = () => {
  const { forgotPasswordForm } = useAppSelector((state: RootState) => state.form)
  const { success, userId, passwordReset } = useAppSelector((state: RootState) => state.auth)
  const [forgotPassword, { isLoading, error: errorForgotPassword }] = useForgotPasswordMutation()
  const [resetPassword, { isLoading: loadingResetPassword, error: errorResetPassword }] = useResetPasswordMutation()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('forgotPasswordForm', dispatch)

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateForgotPasswordForm(forgotPasswordForm?.inputs, setErrors)
    if (!isValid) return

    try {
      await forgotPassword({
        email: forgotPasswordForm.inputs.email,
        securityQuestion: forgotPasswordForm.inputs.securityQuestion,
        securityAnswer: forgotPasswordForm.inputs.securityAnswer
      }).unwrap()
    } catch {}
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateResetPasswordForm(forgotPasswordForm?.inputs, setErrors)
    if (!isValid) return

    try {
      await resetPassword({
        userId: userId,
        password: forgotPasswordForm.inputs.password
      }).unwrap()

      dispatch(resetAuthSuccess())
      dispatch(clearInputs({ formName: 'forgotPasswordForm' }))
    } catch {}
  }

  return (
    <div className="flex max-h-1000:items-start items-center justify-center flex-col gap-y-7 h-dvh max-h-1000:py-20">
      <div className="max-h-1000:hidden block">
        <LogoWRobyn imgDimensions="h-40" logoClassname="h-40 text-blaze" />
      </div>
      {passwordReset ? (
        <>
          <h1 className="text-2xl font-changa text-center mb-4">Your password has been reset</h1>
          <Link
            onClick={() => dispatch(resetAuthPasswordReset())}
            href="/auth/login"
            className="font-changa text-13 uppercase font-semibold px-9 py-3 rounded-sm bg-blaze hover:bg-blazehover duration-300"
          >
            Login
          </Link>
        </>
      ) : success ? (
        <ResetPasswordForm
          handleSubmit={handleResetPassword}
          isLoading={loadingResetPassword}
          error={getErrorMessage(errorResetPassword)}
        />
      ) : (
        <ForgotPasswordForm
          handleSubmit={handleForgotPassword}
          isLoading={isLoading}
          error={getErrorMessage(errorForgotPassword)}
        />
      )}
    </div>
  )
}

export default ForgotPassword
