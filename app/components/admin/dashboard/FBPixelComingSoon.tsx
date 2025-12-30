import { motion } from 'framer-motion'
import { Calendar, Sparkles, Lock, Sliders } from 'lucide-react'

const FBPixelComingSoon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-purple-900/40 rounded-2xl p-6 border border-cyan-400/40 hover:border-cyan-400/70 transition-all duration-300 shadow-2xl shadow-cyan-500/20 overflow-hidden relative max-w-[700px] w-full"
    >
      {/* Background Frost Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-600/20 pointer-events-none" />

      {/* Floating Ice Shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shard-${i}`}
            className="absolute bg-gradient-to-br from-cyan-200/30 to-blue-300/20 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 30}px`,
              height: `${30 + Math.random() * 60}px`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: '1px solid rgba(165, 243, 252, 0.3)'
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50 border border-cyan-300/60">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Pixel Enchantment
            </h3>
          </div>
          <p className="text-cyan-100/80 text-sm leading-relaxed">
            Track user interactions across the frozen realm with Meta Pixel integration
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium">Event Tracking</p>
              <p className="text-cyan-100/70 text-xs">Monitor conversions and user behavior</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-400/10 rounded-lg border border-blue-400/30 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium">Privacy Compliant</p>
              <p className="text-cyan-100/70 text-xs">Built with data protection in mind</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-400/10 rounded-lg border border-purple-400/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium">Coming Soon</p>
              <p className="text-cyan-100/70 text-xs">Winter solstice 2026</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-cyan-200/40 text-xs mt-4 text-center">Stay tuned for this powerful integration</p>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-50" />
      <div
        className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"
        style={{ animationDelay: '0.5s' }}
      />
    </motion.div>
  )
}

export default FBPixelComingSoon
