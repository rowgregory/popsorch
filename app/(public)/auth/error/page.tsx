'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, Clock, Shield, Mail, Lock, Compass, Rocket } from 'lucide-react'

export const getAuthErrorMessage = (error: string | null) => {
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
    <main id="main-content" className="min-h-screen flex overflow-hidden bg-black">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden items-center justify-center p-12">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')` }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="The Pops Orchestra — return to homepage"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black inline-block mb-12"
          >
            <div
              className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-40 h-20"
              role="img"
              aria-label="The Pops Orchestra logo"
            />
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
            <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">The Pops Orchestra</span>
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
          </div>

          <div className="w-16 h-16 bg-blaze/10 flex items-center justify-center mb-6" aria-hidden="true">
            <Icon className="w-8 h-8 text-blaze" />
          </div>

          <h2 className="font-changa text-3xl uppercase tracking-wider text-white leading-none">
            Authentication
            <br />
            Error
          </h2>
          <div className="w-8 h-px bg-blaze mt-4" aria-hidden="true" />
        </div>
      </div>

      {/* Right Side - Error Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 430:px-6 py-12 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')` }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[320px] 430:max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Link
              href="/"
              aria-label="The Pops Orchestra — return to homepage"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black inline-block"
            >
              <div
                className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-32 430:w-40 h-16 430:h-20"
                role="img"
                aria-label="The Pops Orchestra logo"
              />
            </Link>
          </div>

          <section aria-labelledby="error-heading">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-blaze" aria-hidden="true" />
              <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">The Pops Orchestra</span>
            </div>

            <h1 id="error-heading" className="font-changa text-3xl 430:text-4xl text-white leading-none mb-3">
              Authentication
              <br />
              Error
            </h1>
            <div className="w-8 h-px bg-blaze mb-6" aria-hidden="true" />

            {/* Error detail */}
            <div className="border-l-2 border-blaze pl-5 mb-10">
              <p className="font-changa text-sm uppercase tracking-wide text-white mb-1">{errorInfo.title}</p>
              <p className="font-lato text-white/50 text-sm leading-relaxed">{errorInfo.message}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3" role="group" aria-label="Recovery options">
              <Link
                href="/auth/login"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blaze hover:bg-blazehover text-white font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Rocket className="w-4 h-4 shrink-0" aria-hidden="true" />
                Return to Login
              </Link>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blaze/40 text-white font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Back to Home
              </Link>
            </div>

            {/* Help */}
            <p className="font-lato text-white/40 text-xs text-center mt-8 leading-relaxed">
              Need assistance?{' '}
              <a
                href="mailto:info@thepopsorchestra.org"
                className="text-blaze hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
              >
                Contact support
              </a>
            </p>

            {/* Error code */}
            {error && (
              <p className="font-changa text-white/20 text-[10px] uppercase tracking-widest text-center mt-4">
                <span className="sr-only">Error code: </span>
                {error}
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
