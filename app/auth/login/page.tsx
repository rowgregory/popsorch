'use client'

import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useLoginMutation } from '@/app/redux/services/authApi'
import LoginForm from '@/app/forms/LoginForm'
import { useRouter } from 'next/navigation'
import validateLoginForm from '@/app/validations/validateLoginForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { hydrateUserState } from '@/app/redux/features/userSlice'
import Link from 'next/link'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'

const Login = () => {
  const { push } = useRouter()
  const { loginForm } = useAppSelector((state: RootState) => state.form)
  const [login, { isLoading, error }] = useLoginMutation()
  const { requestNotificationPermission } = usePushNotifications()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('loginForm', dispatch)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateLoginForm(loginForm?.inputs, setErrors)
    if (!isValid) return

    try {
      const payload = await login({
        email: loginForm.inputs.email.trim().toLowerCase(),
        password: loginForm.inputs.password
      }).unwrap()

      push('/admin/dashboard')
      dispatch(hydrateUserState(payload))

      await requestNotificationPermission(payload.id)
    } catch {}
  }

  return (
    <div className="flex max-h-1000:items-start items-center justify-center flex-col gap-y-7 max-h-1000:h-auto h-dvh max-h-1000:py-20">
      <Link href="/">
        <div className={`bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-[120px]`} />
      </Link>
      <LoginForm handleSubmit={handleLogin} isLoading={isLoading} error={getErrorMessage(error)} />
    </div>
  )
}

export default Login
