export const CONSENT_KEY = 'pops_cookie_consent'

export type ConsentValue = 'accepted' | 'declined'

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

export function storeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // storage blocked — consent simply won't persist; treated as undecided
  }
  // Let listeners (the pixel) react immediately, same tab.
  window.dispatchEvent(new CustomEvent('consentchange', { detail: value }))
}
