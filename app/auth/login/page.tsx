'use client'

import { FormEvent, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useLoginMutation } from '@/app/redux/services/authApi'
import { useRouter } from 'next/navigation'
import validateLoginForm from '@/app/validations/validateLoginForm'
import { createFormActions } from '@/app/redux/features/formSlice'
import { getErrorMessage } from '@/app/utils/logHelper'
import { hydrateUserState } from '@/app/redux/features/userSlice'
import Link from 'next/link'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldX } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const Login = () => {
  const { push } = useRouter()
  const { loginForm } = useAppSelector((state: RootState) => state.form)
  const [login, { isLoading, error }] = useLoginMutation() as any
  const { requestNotificationPermission } = usePushNotifications()
  const dispatch = useAppDispatch()
  const { setErrors, handleInput } = createFormActions('loginForm', dispatch)
  const errors = loginForm?.errors
  const inputs = loginForm?.inputs
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
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
    <div className="min-h-[calc(100dvh-74px)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="flex items-center justify-center mb-2">
            <div className={`bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-[80px]`} />
          </Link>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-blaze to-sunburst bg-clip-text text-transparent mb-2">
            Welcome to The Stage
          </h1>
          <p className="text-gray-400 text-lg">
            Admin only: manage everything here — add concerts, organize sponsors, and oversee your orchestra from one
            place.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <ShieldX className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-400 font-semibold text-sm mb-1">Oops! Something went wrong.</h3>
                <p className="text-red-300 text-sm leading-relaxed">{getErrorMessage(error)}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 shadow-2xl"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-100 mb-2">Sign in to The Stage</h2>
                <p className="text-neutral-400 text-sm"></p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${errors?.email ? 'text-red-400' : 'text-neutral-300'}`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        errors?.email ? 'text-red-400' : 'text-neutral-400'
                      }`}
                    />
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={inputs?.email || ''}
                      onChange={handleInput}
                      placeholder="refer_sqysh@sqysh.io"
                      disabled={isLoading}
                      className={`auth-input w-full pl-10 pr-4 py-3 bg-neutral-900/50 rounded-lg text-neutral-100 placeholder-neutral-800 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors?.email
                          ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400 focus:border-red-400'
                          : 'border border-neutral-600 focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className={`block text-sm font-medium ${errors?.password ? 'text-red-400' : 'text-neutral-300'}`}
                    >
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        errors?.password ? 'text-red-400' : 'text-neutral-400'
                      }`}
                    />
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={inputs?.password || ''}
                      onChange={handleInput}
                      disabled={isLoading}
                      className={`auth-input w-full pl-10 pr-12 py-3 bg-neutral-900/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors?.password
                          ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-400 focus:border-red-400'
                          : 'border border-neutral-600 focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400'
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
                <motion.button
                  type="submit"
                  disabled={isLoading || inputs?.password === '' || inputs?.email === ''}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blaze to-sunburst disabled:from-neutral-700 disabled:to-neutral-600 disabled:hover:from-neutral-600 disabled:hover:to-neutral-500 text-white rounded-lg transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                  style={{ boxShadow: '0 10px 25px -5px rgba(115, 115, 115, 0.4)' }}
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
              <div className="mt-6 pt-6 border-t border-neutral-700">
                <p className="text-xs text-neutral-500 text-center">
                  Only registered Pops members can access this system.
                  <br />
                  Contact your Pops admin if you need access.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-500">The Pops Orchestra Management System</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
