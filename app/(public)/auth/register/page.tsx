'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useFormSelector } from '@/app/redux/store'
import RegisterForm from '@/app/components/forms/RegisterForm'
import { useRegisterMutation } from '@/app/redux/services/authApi'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import validateRegisterForm from '@/app/lib/validations/validateRegisterForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { resetAuth } from '@/app/redux/features/authSlice'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Register = () => {
  const { push } = useRouter()
  const { registerForm } = useFormSelector()
  const [register, { isLoading, error }] = useRegisterMutation()
  const { toggleNotifications } = usePushNotifications()
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('registerForm', dispatch)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateRegisterForm(registerForm.inputs, setErrors, dispatch)) return

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

      await toggleNotifications(payload.id)
      push('/auth/login')
      dispatch(resetAuth())
    } catch {}
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-neutral-950">
      {/* Left Side - Register Form */}
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
            <Link href="/" className="flex items-center justify-center">
              <div className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-[80px]" />
            </Link>
          </motion.div>

          {/* Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <RegisterForm handleSubmit={handleRegister} isLoading={isLoading} error={getErrorMessage(error)} />
          </motion.div>
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
          <h2 className="text-5xl font-bold text-white mb-6">Join The Stage</h2>
          <p className="text-lg text-neutral-300 mb-12">
            Create your account to start managing The Pops Orchestra. Get access to concerts, sponsors, and more.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Quick Setup</h3>
                <p className="text-sm text-neutral-400">Get started in minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Full Control</h3>
                <p className="text-sm text-neutral-400">Manage everything from one place</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Secure & Safe</h3>
                <p className="text-sm text-neutral-400">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register
