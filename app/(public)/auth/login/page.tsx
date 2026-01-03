'use client'

import { useState } from 'react'
import { useAppDispatch, useFormSelector } from '@/app/redux/store'
import { useLoginMutation } from '@/app/redux/services/authApi'
import { useRouter } from 'next/navigation'
import validateLoginForm from '@/app/lib/validations/validateLoginForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { hydrateUserState } from '@/app/redux/features/userSlice'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldX } from 'lucide-react'
import { motion } from 'framer-motion'
import { showToast } from '@/app/redux/features/toastSlice'
import Link from 'next/link'

const Login = () => {
  const { push } = useRouter()
  const { loginForm } = useFormSelector()
  const [login, { isLoading, error }] = useLoginMutation() as any
  const { toggleNotifications } = usePushNotifications()
  const dispatch = useAppDispatch()
  const { setErrors, handleInput } = createFormActions('loginForm', dispatch)
  const errors = loginForm?.errors
  const inputs = loginForm?.inputs
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateLoginForm(inputs, setErrors)) return

    try {
      const payload = await login({
        email: loginForm.inputs.email.trim().toLowerCase(),
        password: loginForm.inputs.password
      }).unwrap()

      dispatch(hydrateUserState(payload))
      dispatch(
        showToast({
          message: `Welcome back, ${payload.firstName}!`,
          type: 'success'
        })
      )

      // Set up notifications quietly (don't show toast)
      await toggleNotifications(payload.id)

      push('/admin/dashboard')
    } catch (error) {
      dispatch(
        showToast({
          message: 'Invalid email or password',
          type: 'error'
        })
      )
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-neutral-950">
      {/* Left Side - Login Form */}
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

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-start space-x-3">
                <ShieldX className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-semibold text-sm mb-1">Authentication failed</h3>
                  <p className="text-red-300 text-sm leading-relaxed">{getErrorMessage(error)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-neutral-400">Sign in to The Stage to manage your orchestra</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${errors?.email ? 'text-red-400' : 'text-neutral-300'}`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={inputs?.email || ''}
                    onChange={handleInput}
                    placeholder="admin@thepops.org"
                    disabled={isLoading}
                    className={`w-full pl-10 pr-4 py-3 bg-neutral-900/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors?.email
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border border-neutral-700 focus:ring-2 focus:ring-blaze focus:border-blaze'
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className={`text-sm font-medium ${errors?.password ? 'text-red-400' : 'text-neutral-300'}`}
                  >
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-xs text-blaze hover:text-blaze transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={inputs?.password || ''}
                    onChange={handleInput}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-12 py-3 bg-neutral-900/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors?.password
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border border-neutral-700 focus:ring-2 focus:ring-blaze focus:border-blaze'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || !inputs?.email || !inputs?.password}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blaze to-blaze hover:from-blaze/90 hover:to-blaze/90 disabled:from-neutral-700 disabled:to-neutral-600 text-white rounded-lg transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="pt-6 border-t border-neutral-800">
              <p className="text-xs text-neutral-500 text-center">
                Admin access only. Contact your system administrator for account creation.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Gradient Background with Features */}
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
          <h2 className="text-5xl font-bold text-white mb-6">The Stage</h2>
          <p className="text-lg text-neutral-300 mb-12">
            Manage your orchestra from one powerful dashboard. Add concerts, organize sponsors, and oversee everything
            with ease.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Manage Concerts</h3>
                <p className="text-sm text-neutral-400">Create and organize performances</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Sponsor Management</h3>
                <p className="text-sm text-neutral-400">Track and manage partnerships</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 bg-blaze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blaze font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Content Editor</h3>
                <p className="text-sm text-neutral-400">Update frontend pages easily</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
