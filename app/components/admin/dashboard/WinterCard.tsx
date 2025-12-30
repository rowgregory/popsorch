'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  Gift,
  TrendingUp,
  Check,
  Copy,
  EyeOff,
  Eye,
  BarChart3,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  X,
  Snowflake
} from 'lucide-react'
import { useEffect, useState } from 'react'
import ChristmasAnalyticsButton from './ChristmasAnalyticsButton'
import { cardVariants } from '@/app/lib/constants/motion'
import Picture from '../../common/Picture'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { setCloseGA4Drawer, setCloseIceQueen, setOpenGA4Drawer } from '@/app/redux/features/dashboardSlice'
import useSoundEffect from '@/app/hooks/useSoundEffect'

const WinterCard = () => {
  const [snowflakes, setSnowflakes] = useState<
    { id: number; left: number; delay: number; duration: number; intensity: number }[]
  >([])
  const [showPassword, setShowPassword] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const { iceQueen } = useDashboardSelector()
  const dispatch = useAppDispatch()
  const { play, stop } = useSoundEffect('/mp3/snowstorm.mp3', true, true)

  const [initialSnowflakes, setInitialSnowflakes] = useState([])

  useEffect(() => {
    // Generate snowflakes once on mount
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      intensity: 0,
      size: Math.random()
    }))
    setInitialSnowflakes(flakes)
    setSnowflakes(flakes)
  }, [])

  useEffect(() => {
    if (iceQueen && snowflakes.length < 200) {
      // When iceQueen turns ON, ADD more snowflakes
      play()
      const newFlakes = Array.from({ length: 150 }, (_, i) => ({
        id: 50 + i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        intensity: Math.random() * 100,
        size: Math.random()
      }))
      setSnowflakes([...initialSnowflakes, ...newFlakes])
    } else if (!iceQueen && snowflakes.length > 50) {
      // When iceQueen turns OFF, reset to initial snowflakes
      stop()
      setSnowflakes(initialSnowflakes)
    }
  }, [iceQueen, initialSnowflakes, play, stop, snowflakes.length])

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
  const password = process.env.EMAIL_PASSWORD

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      className="col-span-12 xl:col-span-9 bg-gradient-to-br from-blue-950/20 via-neutral-900 to-sky-950/20 border border-sky-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-sky-500/50 transition-all duration-300 shadow-xl overflow-hidden relative"
    >
      {/* Falling Snow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake, i) => (
          <motion.div
            key={flake.id}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-70"
            style={{ left: `${flake.left}%` }}
            initial={{ top: '-10%', opacity: 0 }}
            animate={{
              top: '110%',
              opacity: [0, 1, 1, 0],
              x: iceQueen
                ? [0, flake.intensity * 2 - 100, Math.random() * 200 - 100, 0]
                : [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: iceQueen ? 'easeInOut' : 'linear'
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {iceQueen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -30, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -30, x: -20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 1
            }}
            className="absolute top-32 left-10 -translate-x-1/2 xl:left-80 2xl:left-48 z-50"
          >
            <motion.div>
              <div className="bg-gradient-to-br from-sky-950/95 via-sky-900/95 to-green-950/95 backdrop-blur-xl rounded-2xl p-6 border border-sky-500/50 shadow-2xl shadow-sky-500/20 w-80">
                <h3 className="text-white font-bold text-xl mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Analytics Menu
                </h3>
                <p className="text-cyan-100 text-sm mb-6">Command the power of winter:</p>

                <div className="space-y-3">
                  <motion.a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 p-3 bg-sky-500/20 hover:bg-sky-500/30 rounded-xl border border-sky-400/50 transition-all group cursor-pointer"
                  >
                    <BarChart3 className="w-5 h-5 text-sky-400 group-hover:text-sky-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm">GA4 Dashboard</p>
                      <p className="text-sky-100 text-xs">View live metrics</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.a>

                  <motion.button
                    onClick={() => dispatch(setOpenGA4Drawer())}
                    whileHover={{ x: 8 }}
                    className="w-full flex items-center gap-3 p-3 bg-sky-500/20 hover:bg-sky-500/30 rounded-xl border border-sky-400/50 transition-all group"
                  >
                    <BookOpen className="w-5 h-5 text-sky-400 group-hover:text-sky-300 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white font-semibold text-sm">GA4 Guide</p>
                      <p className="text-sky-100 text-xs">Learn to interpret data</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 8 }}
                    onClick={() => {
                      stop()
                      dispatch(setCloseIceQueen())
                      dispatch(setCloseGA4Drawer())
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-gray-500/20 hover:bg-gray-500/30 rounded-xl border border-gray-400/50 transition-all group"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-gray-300 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white font-semibold text-sm">Close</p>
                      <p className="text-sky-100 text-xs">Dismiss menu</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.button>
                </div>

                <p className="text-cyan-200/60 text-xs mt-6 text-center">
                  🧊 Hail to the power of frost-forged insights 🧊
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {iceQueen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0, 0.5, 0]
          }}
          transition={{
            duration: 0.4,
            delay: Math.random() * 8,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 5
          }}
          className="absolute inset-0 bg-cyan-400/20 pointer-events-none"
        />
      )}

      {iceQueen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`hail-${i}`}
              className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-80 shadow-md"
              style={{ left: `${Math.random() * 100}%` }}
              initial={{ top: '-10%', opacity: 0 }}
              animate={{
                top: '110%',
                opacity: [0, 1, 1, 0.5]
              }}
              transition={{
                duration: 1 + Math.random() * 1.5,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {iceQueen && (
        <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-30">
          <defs>
            <linearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(34, 211, 238, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#windGradient)"
            strokeWidth="2"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.line
            x1="0"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="url(#windGradient)"
            strokeWidth="2"
            animate={{ x: [100, -100] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      )}

      <AnimatePresence>
        {iceQueen && (
          <motion.div
            initial={{ y: 150, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 150, opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              mass: 1.2
            }}
            className="absolute -bottom-4 2xl:left-1/2 2xl:-translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Picture
                src="/images/ice-queen-1.png"
                priority
                className="w-auto object-cover h-96 2xl:scale-x-[-1] drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-pulse flex-shrink-0" />
              <h3 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-sky-500 via-white to-blue-500 bg-clip-text text-transparent">
                Welcome to the Frozen Throne
              </h3>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base">
              Gaze into the crystal of data and unveil the secrets of your realm
            </p>
          </div>
        </div>

        {/* Announcement Content */}
        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-neutral-700/50">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
            <div className="flex-shrink-0 w-7 h-7 xl:w-12 xl:h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50 border border-cyan-300/60">
              <TrendingUp className="w-2.5 h-2.5 xl:w-6 xl:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-base flex items-center gap-x-1 sm:text-lg md:text-xl mb-2">
                <Snowflake className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300 animate-pulse flex-shrink-0" /> New Feature:
                Google Analytics 4 Integration
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
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            Analytics Dashboard Access
          </h4>

          <div className="space-y-2.5 sm:space-y-3">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-neutral-400 text-xs sm:text-sm font-medium">Email:</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-neutral-900/80 text-sky-400 px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm break-all">
                  {email}
                </code>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="flex-shrink-0 p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg transition-colors group"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-sky-400" />
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
                <code className="flex-1 bg-neutral-900/80 text-sky-400 px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm break-all">
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
                    <Check className="w-4 h-4 text-sky-400" />
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
        <p className="text-cyan-200/50 text-[10px] sm:text-xs mt-4 sm:mt-6 text-center">
          ❄️ From the frozen realm, we wish you crystalline insights and prosperous winters ahead! 🧊
        </p>
      </div>

      {/* Decorative Corner Lights */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full animate-pulse opacity-70" />
      <div
        className="absolute top-6 right-6 sm:top-8 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse opacity-70"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full animate-pulse opacity-70"
        style={{ animationDelay: '1s' }}
      />
    </motion.div>
  )
}

export default WinterCard
