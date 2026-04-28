'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-changa text-blaze mb-4">Oops</h1>
        <p className="text-white/60 mb-6 font-lato">
          Something went wrong. We&apos;ve been notified and are looking into it.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blaze hover:bg-blaze/90 text-white font-changa uppercase tracking-widest text-sm transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-changa uppercase tracking-widest text-sm transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
