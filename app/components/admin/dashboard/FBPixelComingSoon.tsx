import { motion } from 'framer-motion'
import { Calendar, Sparkles, Lock } from 'lucide-react'

const FBPixelComingSoon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-white">Meta Pixel</h3>
          </div>
          <p className="text-sm text-neutral-400">
            Track user interactions and conversions with Meta Pixel integration
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <Sparkles className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Event Tracking</p>
              <p className="text-xs text-neutral-500">Monitor conversions and user behavior</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <Lock className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Privacy Compliant</p>
              <p className="text-xs text-neutral-500">Built with data protection in mind</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <Calendar className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Coming Soon</p>
              <p className="text-xs text-neutral-500">Integration in development</p>
            </div>
          </div>
        </div>
      </div>
      {/* Disabled Button */}
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 text-neutral-500 font-semibold rounded-lg transition-all group"
      >
        Coming Soon
      </button>
    </motion.div>
  )
}

export default FBPixelComingSoon
