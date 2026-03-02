'use client'

import { useState } from 'react'
import { Bell, Heart, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/admin/dashboard' })
  }

  return (
    <main id="main-content" className="min-h-screen flex overflow-hidden bg-black">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 430:px-6 py-12 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')` }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[320px] 430:max-w-sm">
          {/* Logo */}
          <div className="mb-10 430:mb-12 flex justify-center">
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

          {/* Form */}
          <section aria-labelledby="signin-heading">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-blaze" aria-hidden="true" />
              <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"> The Pops Orchestra</span>
            </div>
            <h1 id="signin-heading" className="font-changa text-3xl 430:text-4xl text-white leading-none mb-3">
              Sign In
            </h1>
            <div className="w-8 h-px bg-blaze mb-6" aria-hidden="true" />
            <p className="font-lato text-white/50 text-sm leading-relaxed mb-10 border-l-2 border-blaze pl-5">
              Access your account with Google to continue
            </p>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              aria-label={isLoading ? 'Signing in, please wait' : 'Sign in with Google'}
              aria-busy={isLoading}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blaze/40 text-white font-changa text-sm uppercase tracking-widest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                  <span>Signing in...</span>
                  <span className="sr-only">Please wait</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <p className="font-lato text-[10px] uppercase tracking-widest text-white/20 text-center mt-6">
              Your account is tied to your Google email address
            </p>
          </section>
        </div>
      </div>

      {/* Right Side */}
      <aside
        aria-label="Account features overview"
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-12 border-l border-white/10"
      >
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-blaze/10 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-md w-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
            <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">Dashboard</span>
          </div>
          <h2 className="font-changa text-3xl 990:text-4xl text-white leading-none mb-4">Your Pops Account</h2>
          <div className="w-8 h-px bg-blaze mb-6" aria-hidden="true" />
          <p className="font-lato text-white/50 text-sm leading-relaxed mb-10 border-l-2 border-blaze pl-5">
            Sign in with Google to access your supporter dashboard.
          </p>

          <ul role="list" aria-label="Account features" className="flex flex-col gap-px bg-white/10">
            {[
              {
                icon: Mail,
                title: 'Contact Submissions',
                description: 'View all your past enquiries and messages sent to The Pops team.'
              },
              {
                icon: Heart,
                title: 'Camp Applications',
                description: 'View your youth camp application history and status updates.'
              },
              {
                icon: Bell,
                title: 'Newsletter Status',
                description: 'Check your subscription and stay up to date with the latest from The Pops.'
              }
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <li key={feature.title} className="bg-black flex items-start gap-4 p-5 430:p-6">
                  <div
                    className="w-9 h-9 bg-blaze/10 border border-blaze/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4 text-blaze" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-changa text-sm uppercase tracking-wider text-white mb-1">{feature.title}</h3>
                    <p className="font-lato text-xs text-white/40 leading-relaxed">{feature.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </main>
  )
}
export default Login
