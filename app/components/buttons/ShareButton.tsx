'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { sendGAEvent } from '@next/third-parties/google'

interface ShareButtonProps {
  concertId: string
  className?: string
}

export default function ShareButton({ concertId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `https://thepopsorchestra.org/concerts/${concertId}`

    // GA4 Event
    sendGAEvent('event', 'share_concert', {
      value: 'share_concert',
      concert_id: concertId,
      share_method: 'clipboard_copy',
      user_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
      time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
      referrer: document.referrer || 'direct',
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      timestamp: new Date().toISOString()
    })

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className={
        className ||
        'inline-flex items-center justify-center gap-2 px-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-all border border-neutral-700'
      }
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-400" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share Event</span>
        </>
      )}
    </button>
  )
}
