import { useFeatureToggleCardLiveMutation, useFeatureToggleCardVisibleMutation } from '@/app/redux/services/appApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { Eye, FileText, Globe, Shield, Tent } from 'lucide-react'
import { cardVariants } from './PageViewsCard'

const CampApplicationsToggleCard = () => {
  const [featureToggleCardVisible, { isLoading: loadingVisible, data: isVisibleData }] =
    useFeatureToggleCardVisibleMutation() as any
  const [featureToggleCardLive, { isLoading: loadingLive, data: isLiveData }] =
    useFeatureToggleCardLiveMutation() as any
  const { isFeatureToggleCardLive, isFeatureToggleCardVisible } = useAppSelector((state: RootState) => state.app)

  const currentVisibleState = isVisibleData?.isFeatureToggleCardToggledVisible ?? isFeatureToggleCardVisible ?? false
  const currentLiveState = isLiveData?.isSeasonPackageBannerToggledLive ?? isFeatureToggleCardLive ?? false

  const handleToggleVisible = async () => await featureToggleCardVisible({}).unwrap()

  const handleToggleLive = async () => await featureToggleCardLive({}).unwrap()

  return (
    <motion.div
      variants={cardVariants}
      className="bg-neutral-900/50 border border-neutral-700/40 rounded-xl p-6 hover:border-neutral-600/60 transition-all col-span-12 lg:col-span-6 backdrop-blur-sm"
    >
      <div className="relative z-10">
        {/* Semicircle Status Bar at Top */}
        <div className="flex items-center justify-center mb-8 pt-4">
          <div className="relative w-48 h-28">
            {/* Background semicircle */}
            <div className="absolute inset-0">
              <svg width="192" height="112" viewBox="0 0 192 112" className="transform">
                <path
                  d="M 16 96 A 80 80 0 0 1 176 96"
                  fill="none"
                  stroke="rgba(115, 115, 115, 0.4)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Progress semicircle */}
            <div className="absolute inset-0">
              <svg width="192" height="112" viewBox="0 0 192 112" className="transform">
                <motion.path
                  d="M 16 96 A 80 80 0 0 1 176 96"
                  fill="none"
                  stroke={currentLiveState ? '#60a5fa' : currentVisibleState ? '#22d3ee' : '#737373'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  animate={{
                    strokeDashoffset: currentLiveState ? 0 : currentVisibleState ? 125.6 : 251.2
                  }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  initial={{ strokeDashoffset: 251.2 }}
                />
              </svg>
            </div>

            {/* Center status text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
              <motion.span
                className={`text-xl font-bold ${
                  currentLiveState ? 'text-blue-400' : currentVisibleState ? 'text-cyan-400' : 'text-neutral-400'
                }`}
              >
                {currentLiveState ? 'LIVE' : currentVisibleState ? 'PREVIEW' : 'OFFLINE'}
              </motion.span>
              <span className="text-neutral-400 text-xs mt-1">
                {currentLiveState ? 'Public Access' : currentVisibleState ? 'Admin Only' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <motion.div animate={{ scale: currentLiveState ? 1 : 0.8 }} transition={{ duration: 0.3 }}>
                {currentLiveState ? (
                  <FileText className="w-6 h-6 text-white" />
                ) : (
                  <Tent className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </div>
            <div>
              <h3 className="text-neutral-100 font-semibold text-lg">Camp Applications</h3>
              <p className="text-neutral-400 text-sm">Public & Admin Controls</p>
            </div>
          </div>
        </div>

        {/* Status Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <motion.div
            className="relative overflow-hidden bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-3 sm:p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between sm:flex-col sm:items-start mb-2 sm:mb-2">
              <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    currentLiveState ? 'bg-blue-500/20' : 'bg-neutral-600/40'
                  }`}
                >
                  <Globe
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${currentLiveState ? 'text-blue-400' : 'text-neutral-400'}`}
                  />
                </div>
                <div className="sm:hidden">
                  <div className="text-neutral-200 text-sm font-medium">Public Access</div>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  currentLiveState ? 'bg-blue-500/20 text-blue-300' : 'bg-neutral-600/40 text-neutral-400'
                }`}
              >
                {currentLiveState ? 'LIVE' : 'OFFLINE'}
              </div>
            </div>
            <div className="hidden sm:block text-neutral-200 text-sm font-medium">Public Access</div>
            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${currentLiveState ? 'bg-blue-500' : 'bg-neutral-600'}`}
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-3 sm:p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between sm:flex-col sm:items-start mb-2 sm:mb-2">
              <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    currentVisibleState ? 'bg-cyan-500/20' : 'bg-neutral-600/40'
                  }`}
                >
                  <Eye
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${currentVisibleState ? 'text-cyan-400' : 'text-neutral-400'}`}
                  />
                </div>
                <div className="sm:hidden">
                  <div className="text-neutral-200 text-sm font-medium">Admin Preview</div>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  currentVisibleState ? 'bg-cyan-500/20 text-cyan-300' : 'bg-neutral-600/40 text-neutral-400'
                }`}
              >
                {currentVisibleState ? 'VISIBLE' : 'HIDDEN'}
              </div>
            </div>
            <div className="hidden sm:block text-neutral-200 text-sm font-medium">Admin Preview</div>
            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${
                currentVisibleState ? 'bg-cyan-500' : 'bg-neutral-600'
              }`}
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-3 sm:p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between sm:flex-col sm:items-start mb-2 sm:mb-2">
              <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    currentLiveState
                      ? 'bg-green-500/20'
                      : currentVisibleState
                      ? 'bg-yellow-500/20'
                      : 'bg-neutral-600/40'
                  }`}
                >
                  <Shield
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      currentLiveState ? 'text-green-400' : currentVisibleState ? 'text-yellow-400' : 'text-neutral-400'
                    }`}
                  />
                </div>
                <div className="sm:hidden">
                  <div className="text-neutral-200 text-sm font-medium">Overall Status</div>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  currentLiveState
                    ? 'bg-green-500/20 text-green-300'
                    : currentVisibleState
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-neutral-600/40 text-neutral-400'
                }`}
              >
                {currentLiveState ? 'PUBLIC' : currentVisibleState ? 'ADMIN' : 'DISABLED'}
              </div>
            </div>
            <div className="hidden sm:block text-neutral-200 text-sm font-medium">Overall Status</div>
            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${
                currentLiveState ? 'bg-green-500' : currentVisibleState ? 'bg-yellow-500' : 'bg-neutral-600'
              }`}
            />
          </motion.div>
        </div>

        {/* Enhanced Control Toggles */}
        <div className="space-y-4">
          <motion.div
            className="group p-5 bg-neutral-800/60 border border-neutral-700/60 rounded-xl hover:border-neutral-600/80 transition-all"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentLiveState ? 'bg-blue-500/20' : 'bg-neutral-600/40'
                  }`}
                >
                  <Globe className={`w-5 h-5 ${currentLiveState ? 'text-blue-400' : 'text-neutral-400'}`} />
                </div>
                <div>
                  <h4 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    Public Access
                  </h4>
                  <p className="text-neutral-400 text-sm">Allow public users to see this content</p>
                </div>
              </div>
              <motion.button
                onClick={handleToggleLive}
                disabled={loadingLive}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  currentLiveState ? 'bg-blue-500' : 'bg-neutral-600'
                } ${loadingLive ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                  animate={{ x: currentLiveState ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {loadingLive && (
                    <div className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="group p-5 bg-neutral-800/60 border border-neutral-700/60 rounded-xl hover:border-neutral-600/80 transition-all"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentVisibleState ? 'bg-cyan-500/20' : 'bg-neutral-600/40'
                  }`}
                >
                  <Eye className={`w-5 h-5 ${currentVisibleState ? 'text-cyan-400' : 'text-neutral-400'}`} />
                </div>
                <div>
                  <h4 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    Admin Preview
                  </h4>
                  <p className="text-neutral-400 text-sm">Enable preview mode for administrators</p>
                </div>
              </div>
              <motion.button
                onClick={handleToggleVisible}
                disabled={loadingVisible}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  currentVisibleState ? 'bg-cyan-500' : 'bg-neutral-600'
                } ${loadingVisible ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                  animate={{ x: currentVisibleState ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {loadingVisible && (
                    <div className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CampApplicationsToggleCard
