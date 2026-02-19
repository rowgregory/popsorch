import { ExternalLink, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResendCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Resend</h3>
              <p className="text-sm text-neutral-400">Transactional Email Service</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-xs font-medium text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            Not Connected
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-neutral-500" />
          </div>
          <p className="text-sm text-neutral-400 mb-1">No API key configured</p>
          <p className="text-xs text-neutral-600">Connect Resend to enable transactional emails</p>
        </div>
      </div>

      <a
        href="https://resend.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#000000] hover:bg-neutral-800 text-white font-semibold rounded-lg transition-all border border-neutral-700"
      >
        Discover Resend
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
