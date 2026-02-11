'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Shield, Mail, Lock, Compass, Rocket } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import MotionLink from '@/app/components/common/MotionLink'

const getAuthErrorMessage = (error: string | null) => {
  switch (error) {
    case 'AccessDenied':
      return {
        icon: Shield,
        title: 'Access Denied',
        message:
          "Your clearance code isn't in our system. Only registered members can access this area. Contact support if you need assistance."
      }

    case 'Verification':
      return {
        icon: Clock,
        title: 'Link Expired',
        message: 'That verification link has expired or already been used. Request a new one to continue.'
      }

    case 'EmailSignin':
      return {
        icon: Mail,
        title: 'Email Failed',
        message: 'The email failed to send. Double-check your email address and try again.'
      }

    case 'OAuthSignin':
    case 'OAuthCallback':
      return {
        icon: AlertTriangle,
        title: 'Connection Error',
        message: 'There was trouble connecting to the authentication provider. Please try again shortly.'
      }

    case 'SessionRequired':
      return {
        icon: Lock,
        title: 'Sign In Required',
        message: 'You need to sign in before accessing this area. Please authenticate to continue.'
      }

    case 'Configuration':
      return {
        icon: Compass,
        title: 'Configuration Error',
        message: 'Our technical team is working on this issue. Please try again later.'
      }

    default:
      return {
        icon: AlertTriangle,
        title: 'Unknown Error',
        message: 'Something went wrong. Please retry or contact support for assistance.'
      }
  }
}

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorInfo = getAuthErrorMessage(error)
  const Icon = errorInfo.icon

  return (
    <div className="min-h-screen flex bg-duskgray">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-duskgray relative overflow-hidden items-center justify-center p-12">
        {/* Content */}
        <div className="relative z-10 text-center flex items-center justify-center flex-col">
          <MotionLink href="/" className="flex space-x-3 w-44 h-auto mb-8">
            <Picture
              src="/images/logo.png"
              alt="Pops"
              className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity object-contain"
              priority
            />
          </MotionLink>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blaze/20 mb-6"
          >
            <Icon className="w-10 h-10 text-blaze" />
          </motion.div>

          <div className="w-12 h-0.5 bg-blaze mb-6" />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-changa text-4xl uppercase tracking-wider mb-8"
          >
            Authentication Error
          </motion.h1>
        </div>
      </div>

      {/* Right Side - Error Content */}
      <div className="w-full lg:w-1/2 bg-duskgray flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blaze/20 mb-4"
            >
              <Icon className="w-8 h-8 text-blaze" />
            </motion.div>
            <div className="w-8 h-0.5 bg-blaze mx-auto mb-4" />
            <h1 className="text-white font-changa text-2xl uppercase tracking-wider">Authentication Error</h1>
          </div>

          {/* Error Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-duskgray border border-blaze/20 p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="shrink-0 hidden lg:block">
                <div className="w-12 h-12 bg-blaze/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blaze" />
                </div>
              </div>
              <div>
                <h2 className="text-sunburst font-changa text-xl uppercase tracking-wider mb-3">{errorInfo.title}</h2>
                <div className="w-8 h-0.5 bg-blaze mb-4" />
                <p className="text-white/70 leading-relaxed">{errorInfo.message}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
              <Link
                href="/auth/login"
                className="w-full bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm py-3 px-6 flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <Rocket className="w-5 h-5" />
                Return to Login
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
              <Link
                href="/"
                className="w-full bg-duskgray border border-blaze/20 hover:border-blaze/40 text-white font-changa uppercase tracking-wider text-sm py-3 px-6 flex items-center justify-center gap-2 transition-colors duration-300"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-center text-sm mt-8"
          >
            Need assistance? Contact{' '}
            <a
              href="mailto:support@pops.org"
              className="text-sunburst hover:text-sunburst/80 transition-colors duration-300"
            >
              support
            </a>
          </motion.p>

          {/* Error Code */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <span className="text-white/30 text-xs font-changa uppercase tracking-widest">Error: {error}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
