'use client'

import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useLoginMutation } from '@/app/redux/services/authApi'
import LoginForm from '@/app/forms/LoginForm'
import { useSendPushNotificationMutation } from '@/app/redux/services/pushNotificationApi'
import LogoWRobyn from '@/app/components/LogoWRobyn'
import { useRouter } from 'next/navigation'
import validateLoginForm from '@/app/validations/validateLoginForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'

const Login = () => {
  const { push } = useRouter()
  const { loginForm } = useAppSelector((state: RootState) => state.form)
  const [login, { isLoading, error }] = useLoginMutation()
  const [sendPushNotification] = useSendPushNotificationMutation()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('loginForm', dispatch)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateLoginForm(loginForm?.inputs, setErrors)
    if (!isValid) return

    try {
      await login({
        email: loginForm.inputs.email,
        password: loginForm.inputs.password
      })
        .unwrap()
        .then(async () => {
          push('/admin/dashboard')
          const storedSubscription = localStorage.getItem('pushSubscription')
          const subscription = storedSubscription ? JSON.parse(storedSubscription) : null

          try {
            if (subscription && subscription.endpoint) {
              await sendPushNotification({
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                message: 'Login successful'
              }).unwrap()
            }
          } catch {}
        })
    } catch {}
  }

  return (
    <div className="flex max-h-1000:items-start items-center justify-center flex-col gap-y-7 max-h-1000:h-auto h-dvh max-h-1000:py-20">
      <div className="max-h-1000:hidden block">
        <LogoWRobyn imgDimensions="h-40" logoClassname="h-40 text-blaze" />
      </div>
      <LoginForm handleSubmit={handleLogin} isLoading={isLoading} error={getErrorMessage(error)} />
    </div>
  )
}

export default Login
