import {
  useToggleSeasonPackageBannerLiveMutation,
  useToggleSeasonPackageBannerMutation
} from '@/app/redux/services/appApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import { FC } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'

const SeasonBannerToggleCard: FC<{ loading: boolean; cardColors: any; cardVariants: any }> = ({
  loading,
  cardColors,
  cardVariants
}) => {
  const [toggleSeasonPackageBanner, { isLoading, data: isVisibleData }] = useToggleSeasonPackageBannerMutation() as any
  const [toggleSeasonPackageBannerLive, { isLoading: loadingLive, data: isLiveData }] =
    useToggleSeasonPackageBannerLiveMutation() as any
  const { isSeasonPackageBannerToggledLive, isSeasonPackageBannerToggledVisible } = useAppSelector(
    (state: RootState) => state.app
  )

  const theme = cardColors[1] // Orange theme for season banner

  // Use app state if available, otherwise fall back to data prop
  const currentVisibleState =
    isVisibleData?.isSeasonPackageBannerToggledVisible ?? isSeasonPackageBannerToggledVisible ?? false
  const currentLiveState = isLiveData?.isSeasonPackageBannerToggledLive ?? isSeasonPackageBannerToggledLive ?? false

  const handleToggleVisible = async () => {
    try {
      await toggleSeasonPackageBanner({}).unwrap()
    } catch (error) {
      console.error('Toggle visible failed:', error)
    }
  }

  const handleToggleLive = async () => {
    try {
      await toggleSeasonPackageBannerLive({}).unwrap()
    } catch (error) {
      console.error('Toggle live failed:', error)
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      className={`${theme.bgGradient} col-span-2 lg:col-span-1 p-6 transition-all duration-500 group hover:shadow-2xl ${theme.shadow} relative overflow-hidden`}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-black/20">
              <motion.div
                animate={{
                  scale: currentLiveState ? 1 : 0.8,
                  rotate: currentLiveState ? 0 : 180
                }}
                transition={{ duration: 0.3 }}
              >
                {currentLiveState ? (
                  <Eye className={`w-7 h-7 ${theme.icon}`} />
                ) : (
                  <EyeOff className={`w-7 h-7 ${theme.icon}`} />
                )}
              </motion.div>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Season Package Banner</h3>
              <p className={`text-sm ${theme.accent}`}>Public & Admin Controls</p>
            </div>
          </div>
          <ArrowUpRight
            className={`w-5 h-5 ${theme.accent} group-hover:${theme.highlight} transition-colors duration-300`}
          />
        </div>
        <div className="space-y-6">
          {/* Live Status (Public View) */}
          <div className="p-5 bg-black/30 border-l-4 border-blue-400">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 ${currentLiveState ? 'bg-blue-400' : 'bg-gray-500'}`}>
                  {currentLiveState && <div className="w-4 h-4 bg-blue-400 animate-pulse"></div>}
                </div>
                <span className={`${theme.text} font-semibold text-lg`}>Public Status</span>
                <span className={`text-xs px-2 py-1 rounded-full ${theme.accent} bg-blue-400/20`}>LIVE</span>
              </div>
              <motion.span
                className={`px-3 py-1 text-sm font-bold rounded ${
                  currentLiveState ? 'bg-blue-400/20 text-blue-300' : 'bg-gray-600/20 text-gray-300'
                }`}
                animate={{ scale: currentLiveState ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentLiveState ? 'LIVE' : 'OFFLINE'}
              </motion.span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`${theme.text} text-sm`}>Public can see banner</span>
              <motion.button
                onClick={handleToggleLive}
                disabled={loadingLive}
                className={`relative w-16 h-8 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 ${
                  currentLiveState ? 'bg-blue-500' : 'bg-gray-600'
                } ${loadingLive ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white flex items-center justify-center"
                  animate={{
                    x: currentLiveState ? 32 : 0
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  {loadingLive || loading ? (
                    <motion.div
                      className="w-3 h-3 border-2 border-gray-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <div className={`w-2 h-2 ${currentLiveState ? 'bg-blue-500' : 'bg-gray-400'}`} />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Admin Visibility Status */}
          <div className="p-5 bg-black/30 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 ${currentVisibleState ? 'bg-green-400' : 'bg-gray-500'}`}>
                  {currentVisibleState && <div className="w-4 h-4 bg-green-400 animate-pulse"></div>}
                </div>
                <span className={`${theme.text} font-semibold text-lg`}>Admin Preview</span>
                <span className={`text-xs px-2 py-1 rounded-full ${theme.accent} bg-green-400/20`}>ADMIN</span>
              </div>
              <motion.span
                className={`px-3 py-1 text-sm font-bold rounded ${
                  currentVisibleState ? 'bg-green-400/20 text-green-300' : 'bg-gray-600/20 text-gray-300'
                }`}
                animate={{ scale: currentVisibleState ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentVisibleState ? 'VISIBLE' : 'HIDDEN'}
              </motion.span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`${theme.text} text-sm`}>Admin preview mode</span>
              <motion.button
                onClick={handleToggleVisible}
                disabled={isLoading}
                className={`relative w-16 h-8 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-green-400/30 ${
                  currentVisibleState ? 'bg-green-500' : 'bg-gray-600'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white flex items-center justify-center"
                  animate={{
                    x: currentVisibleState ? 32 : 0
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  {isLoading || loading ? (
                    <motion.div
                      className="w-3 h-3 border-2 border-gray-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <div className={`w-2 h-2 ${currentVisibleState ? 'bg-green-500' : 'bg-gray-400'}`} />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Overall Status Visualization */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`${theme.text} font-medium`}>Overall Status</span>
              <span className={`${theme.highlight} font-bold`}>
                {currentLiveState ? 'PUBLIC' : currentVisibleState ? 'ADMIN ONLY' : 'DISABLED'}
              </span>
            </div>
            <div className="h-3 bg-black/40 overflow-hidden">
              <motion.div
                className="h-full relative overflow-hidden"
                style={{
                  background: currentLiveState
                    ? 'linear-gradient(90deg, #3b82f6, #06b6d4, #0891b2)'
                    : currentVisibleState
                    ? 'linear-gradient(90deg, #10b981, #059669, #047857)'
                    : 'linear-gradient(90deg, #6b7280, #4b5563, #374151)'
                }}
                animate={{
                  width: currentLiveState ? '100%' : currentVisibleState ? '60%' : '0%'
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut'
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  animate={{
                    x: currentLiveState || currentVisibleState ? [-100, 120] : [-100, -100]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: currentLiveState || currentVisibleState ? Infinity : 0,
                    repeatDelay: 3,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </div>
            <div className="text-xs text-gray-400">
              {currentLiveState
                ? 'Banner is live and visible to all users'
                : currentVisibleState
                ? 'Banner visible only to admins for preview'
                : 'Banner is completely disabled'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SeasonBannerToggleCard
