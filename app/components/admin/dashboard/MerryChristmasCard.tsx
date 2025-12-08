'use client'

import { motion } from 'framer-motion'
import { Sparkles, Gift, TrendingUp, Check, Copy, EyeOff, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import ChristmasAnalyticsButton from './ChristmasAnalyticsButton'
import { cardVariants } from '@/app/lib/constants/motion'

const MerryChristmasCard = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: number; delay: number; duration: number }[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10
    }))
    setSnowflakes(flakes)
  }, [])

  const copyToClipboard = async (text: string, type: 'email' | 'password') => {
    await navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  const email = 'thepopsorchestra@gmail.com'
  const password = 'desrhn(743*guHDB12'

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      className="col-span-12 xl:col-span-9 bg-gradient-to-br from-red-950/20 via-neutral-900 to-green-950/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-red-500/50 transition-all duration-300 shadow-xl overflow-hidden relative"
    >
      {/* Falling Snow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-70"
            style={{ left: `${flake.left}%` }}
            initial={{ top: '-10%', opacity: 0 }}
            animate={{
              top: '110%',
              opacity: [0, 1, 1, 0],
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-bounce flex-shrink-0" />
              <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent">
                Merry Christmas! 🎄
              </h3>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse flex-shrink-0" />
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base">
              We&apos;ve wrapped up a special gift for you this holiday season!
            </p>
          </div>
        </div>

        {/* Announcement Content */}
        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-neutral-700/50">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
            <div className="flex-shrink-0 w-7 h-7 xl:w-12 xl:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-2.5 h-2.5 xl:w-6 xl:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-base sm:text-lg md:text-xl mb-2">
                🎁 New Feature: Google Analytics 4 Integration
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                Track your website performance, user behavior, and concert engagement with powerful analytics. See which
                concerts drive the most interest, where your visitors come from, and optimize your content for maximum
                impact!
              </p>

              {/* Stats Preview */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="bg-neutral-900/50 rounded-lg p-2.5 sm:p-3">
                  <p className="text-neutral-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Page Views
                  </p>
                  <div className="text-lg sm:text-xl font-bold text-white">Real-time</div>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-2.5 sm:p-3">
                  <p className="text-neutral-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Conversions
                  </p>
                  <div className="text-lg sm:text-xl font-bold text-white">Tracked</div>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-2.5 sm:p-3">
                  <p className="text-neutral-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Events
                  </p>
                  <div className="text-lg sm:text-xl font-bold text-white">20+ Types</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Access Credentials */}
        <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-neutral-700/50">
          <h4 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Analytics Dashboard Access
          </h4>

          <div className="space-y-2.5 sm:space-y-3">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-neutral-400 text-xs sm:text-sm font-medium">Email:</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-neutral-900/80 text-green-400 px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm break-all">
                  {email}
                </code>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="flex-shrink-0 p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg transition-colors group"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <span className="text-neutral-400 text-xs sm:text-sm font-medium">Password:</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-neutral-900/80 text-green-400 px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm break-all">
                  {showPassword ? password : '••••••••••••••••••'}
                </code>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex-shrink-0 p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg transition-colors group"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(password, 'password')}
                  className="flex-shrink-0 p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg transition-colors group"
                  title="Copy password"
                >
                  {copiedPassword ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <ChristmasAnalyticsButton />

        {/* Footer Note */}
        <p className="text-neutral-500 text-[10px] sm:text-xs mt-4 sm:mt-6 text-center">
          🎅 Happy Holidays from Sqysh! May your metrics be merry and your conversions bright! ✨
        </p>
      </div>

      {/* Decorative Corner Lights */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse opacity-70" />
      <div
        className="absolute top-6 right-6 sm:top-8 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse opacity-70"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse opacity-70"
        style={{ animationDelay: '1s' }}
      />
    </motion.div>
  )
}

export default MerryChristmasCard
