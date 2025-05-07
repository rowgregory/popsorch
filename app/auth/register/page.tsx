'use client'

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import RegisterForm from '@/app/forms/RegisterForm'
import { useRegisterMutation } from '@/app/redux/services/authApi'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import LogoWRobyn from '@/app/components/LogoWRobyn'
import validateRegisterForm from '@/app/validations/validateRegisterForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { resetAuth } from '@/app/redux/features/authSlice'
import { increaseUsersCount } from '@/app/redux/features/appSlice'

const Register = () => {
  const { push } = useRouter()
  const { registerForm } = useAppSelector((state: RootState) => state.form)
  const [register, { isLoading, error }] = useRegisterMutation()
  const { requestNotificationPermission } = usePushNotifications()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('registerForm', dispatch)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateRegisterForm(registerForm.inputs, setErrors, dispatch)
    if (!isValid) return

    try {
      await register({
        firstName: registerForm.inputs.firstName,
        lastName: registerForm.inputs.lastName,
        email: registerForm.inputs.email.trim().toLowerCase(),
        password: registerForm.inputs.password,
        securityQuestion: registerForm.inputs.securityQuestion,
        securityAnswer: registerForm.inputs.securityAnswer,
        registerCode: registerForm.inputs.registerCode
      }).unwrap()

      await requestNotificationPermission()
      push('/auth/login')
      dispatch(resetAuth())
      dispatch(increaseUsersCount())
    } catch {}
  }

  return (
    <div className="flex max-h-1200:items-start items-center justify-center flex-col gap-y-7 max-h-1200:h-auto h-dvh max-h-1200:py-20">
      <div className="max-h-1200:hidden block">
        <LogoWRobyn imgDimensions="h-40" logoClassname="h-40 text-blaze" />
      </div>
      <RegisterForm handleSubmit={handleRegister} isLoading={isLoading} error={getErrorMessage(error)} />
    </div>
  )
}

export default Register
