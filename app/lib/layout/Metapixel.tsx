'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { ConsentValue, getStoredConsent } from '@/app/utils/consent.utils'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

function subscribe(callback: () => void) {
  window.addEventListener('consentchange', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('consentchange', callback)
    window.removeEventListener('storage', callback)
  }
}

export function MetaPixel() {
  const pathname = usePathname()
  const firstLoad = useRef(true)

  // Consent read via external store — no setState in an effect.
  const consent = useSyncExternalStore<ConsentValue | null>(
    subscribe,
    () => getStoredConsent(),
    () => null
  )

  // Fire PageView on route change once consent is granted. Skips the initial
  // load (the inline script fires the first PageView itself).
  useEffect(() => {
    if (consent !== 'accepted') return
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    // @ts-expect-error fbq is injected by the pixel script
    if (typeof window !== 'undefined' && window.fbq) {
      // @ts-expect-error fbq is injected by the pixel script
      window.fbq('track', 'PageView')
    }
  }, [pathname, consent])

  if (!PIXEL_ID || consent !== 'accepted') return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <Image
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
