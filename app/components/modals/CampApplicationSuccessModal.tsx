'use client'

import { setCloseCampApplicationSuccessModal } from '@/app/redux/features/campSlice'
import { store, useCampSelector } from '@/app/redux/store'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Music } from 'lucide-react'
import Link from 'next/link'

export default function CampApplicationSuccessModal() {
  const { campApplicationSuccessModal } = useCampSelector()
  const onClose = () => store.dispatch(setCloseCampApplicationSuccessModal())
  return (
    <AnimatePresence>
      {campApplicationSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-2xl bg-black/80 flex items-center justify-center z-100 p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden"
          >
            {/* Gradient bar */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }} />

            <div className="p-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #da0032, #ff9000)' }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              {/* Wordmark */}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sunburst mb-1">Youth Music Camp</p>
              <h2 className="text-2xl font-black text-white mb-2">Application Submitted!</h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Thank you for applying to the Pops Orchestra Youth Music Camp. We&apos;ve received your application and
                will be in touch soon.
              </p>

              {/* Divider */}
              <div className="border-t border-neutral-800 mb-6" />

              {/* Info */}
              <div className="flex items-start gap-3 text-left mb-8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-neutral-800 border border-neutral-700">
                  <Music className="w-4 h-4 text-sunburst" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">What happens next?</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Our team will review your application and reach out to the email address provided.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/"
                onClick={onClose}
                className="block w-full py-3 text-sm font-bold text-white rounded-lg text-center transition-opacity hover:opacity-90"
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
