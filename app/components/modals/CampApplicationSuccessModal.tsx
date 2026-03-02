'use client'

import { setCloseCampApplicationSuccessModal } from '@/app/redux/features/campSlice'
import { store, useCampSelector } from '@/app/redux/store'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Music } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function CampApplicationSuccessModal() {
  const { campApplicationSuccessModal } = useCampSelector()
  const onClose = () => store.dispatch(setCloseCampApplicationSuccessModal())

  useEffect(() => {
    if (!campApplicationSuccessModal) return

    const previouslyFocused = document.activeElement as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [campApplicationSuccessModal])

  return (
    <AnimatePresence>
      {campApplicationSuccessModal && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="camp-success-heading"
          aria-describedby="camp-success-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-2xl bg-black/80 flex items-center justify-center z-100 p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 overflow-hidden"
          >
            <div
              className="h-1.5 w-full"
              style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }}
              aria-hidden="true"
            />

            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #da0032, #ff9000)' }}
                aria-hidden="true"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sunburst mb-1" aria-hidden="true">
                Youth Music Camp
              </p>
              <h2 id="camp-success-heading" className="text-2xl font-black text-white mb-2">
                Application Submitted!
              </h2>
              <p id="camp-success-description" className="text-neutral-400 text-sm leading-relaxed mb-8">
                Thank you for applying to the Pops Orchestra Youth Music Camp. We&apos;ve received your application and
                will be in touch soon.
              </p>

              <div className="border-t border-neutral-800 mb-6" aria-hidden="true" />

              <div className="flex items-start gap-3 text-left mb-8">
                <div
                  className="w-8 h-8 flex items-center justify-center shrink-0 bg-neutral-800 border border-neutral-700"
                  aria-hidden="true"
                >
                  <Music className="w-4 h-4 text-sunburst" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">What happens next?</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Our team will review your application and reach out to the email address provided.
                  </p>
                </div>
              </div>

              <Link
                href="/"
                onClick={onClose}
                autoFocus
                aria-label="Application submitted successfully — return to home page"
                className="block w-full py-3 text-sm font-bold text-white text-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }}
              >
                Return to Home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
