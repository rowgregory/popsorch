'use client'

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import RegisterForm from '@/app/forms/RegisterForm'
import { useRegisterMutation } from '@/app/redux/services/authApi'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import validateRegisterForm from '@/app/validations/validateRegisterForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { resetAuth } from '@/app/redux/features/authSlice'
import { increaseUsersCount } from '@/app/redux/features/appSlice'
import Link from 'next/link'

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
      const payload = await register({
        firstName: registerForm.inputs.firstName,
        lastName: registerForm.inputs.lastName,
        email: registerForm.inputs.email.trim().toLowerCase(),
        password: registerForm.inputs.password,
        securityQuestion: registerForm.inputs.securityQuestion,
        securityAnswer: registerForm.inputs.securityAnswer,
        registerCode: registerForm.inputs.registerCode
      }).unwrap()

      await requestNotificationPermission(payload.id)
      push('/auth/login')
      dispatch(resetAuth())
      dispatch(increaseUsersCount())
    } catch {}
  }

  return (
    <div className="flex max-h-1200:items-start items-center justify-center flex-col gap-y-7 max-h-1200:h-auto h-dvh max-h-1200:py-20">
      <Link href="/">
        <div className={`bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-[120px]`} />
      </Link>
      <RegisterForm handleSubmit={handleRegister} isLoading={isLoading} error={getErrorMessage(error)} />
    </div>
  )
}

export default Register
