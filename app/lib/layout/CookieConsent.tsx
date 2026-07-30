'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { getStoredConsent, storeConsent } from '@/app/utils/consent.utils'

// Subscribe to consent changes (banner + pixel share the same source of truth).
function subscribe(callback: () => void) {
  window.addEventListener('consentchange', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('consentchange', callback)
    window.removeEventListener('storage', callback)
  }
}

export function CookieConsent() {
  // useSyncExternalStore reads the client value after hydration without a
  // setState-in-effect. Server + first client render return null (undecided
  // hidden), then it settles to the real stored value.
  const consent = useSyncExternalStore(
    subscribe,
    () => getStoredConsent(),
    () => null
  )

  // Only show while the visitor hasn't decided.
  if (consent !== null) return null

  const decide = (value: 'accepted' | 'declined') => storeConsent(value)

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-100 p-4 990:p-6"
    >
      <div className="max-w-3xl mx-auto bg-black border border-white/15 shadow-2xl p-5 990:p-6 flex flex-col 760:flex-row 760:items-center gap-4 760:gap-6">
        <p className="font-lato text-white/80 text-sm leading-relaxed flex-1">
          We use cookies for analytics and advertising, including Google Analytics and the Meta Pixel, to understand how
          our site is used and to promote our concerts. You can accept or decline. See our{' '}
          <Link
            href="/privacy-policy"
            className="text-sunburst underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst rounded-sm"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide('declined')}
            className="font-changa text-[12px] uppercase tracking-widest px-5 py-2.5 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="font-changa text-[12px] uppercase tracking-widest px-5 py-2.5 bg-blaze hover:bg-blazehover text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
