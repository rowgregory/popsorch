import { useFeatureToggleCardLiveMutation, useFeatureToggleCardVisibleMutation } from '@/app/redux/services/appApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { Eye, Globe } from 'lucide-react'

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-4 sm:p-6 hover:border-neutral-700/70 transition-all duration-300 shadow-xl"
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-white">Camp Apps</h3>
          <div
            className={`w-2 h-2 rounded-full ${
              currentLiveState ? 'bg-blue-500 animate-pulse' : currentVisibleState ? 'bg-cyan-500' : 'bg-neutral-600'
            }`}
          />
        </div>
        <p className="text-neutral-400 text-xs">Toggle controls</p>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Public Access Toggle */}
        <div className="p-3 bg-neutral-800/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Globe className={`w-4 h-4 ${currentLiveState ? 'text-blue-400' : 'text-neutral-400'}`} />
              <span className="text-white text-sm font-medium">Public</span>
            </div>
            <motion.button
              onClick={handleToggleLive}
              disabled={loadingLive}
              className={`relative w-10 h-6 rounded-full transition-all ${
                currentLiveState ? 'bg-blue-500' : 'bg-neutral-600'
              } ${loadingLive ? 'opacity-70' : ''}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{ x: currentLiveState ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {loadingLive && (
                  <div className="w-2.5 h-2.5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                )}
              </motion.div>
            </motion.button>
          </div>
          <p className="text-neutral-500 text-[10px]">
            {currentLiveState ? 'Live & accessible' : 'Hidden from public'}
          </p>
        </div>

        {/* Admin Preview Toggle */}
        <div className="p-3 bg-neutral-800/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className={`w-4 h-4 ${currentVisibleState ? 'text-cyan-400' : 'text-neutral-400'}`} />
              <span className="text-white text-sm font-medium">Preview</span>
            </div>
            <motion.button
              onClick={handleToggleVisible}
              disabled={loadingVisible}
              className={`relative w-10 h-6 rounded-full transition-all ${
                currentVisibleState ? 'bg-cyan-500' : 'bg-neutral-600'
              } ${loadingVisible ? 'opacity-70' : ''}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{ x: currentVisibleState ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {loadingVisible && (
                  <div className="w-2.5 h-2.5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                )}
              </motion.div>
            </motion.button>
          </div>
          <p className="text-neutral-500 text-[10px]">{currentVisibleState ? 'Preview enabled' : 'Preview disabled'}</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 pt-3 border-t border-neutral-700/50">
        <div className="flex items-center justify-center gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              currentLiveState ? 'text-blue-400' : currentVisibleState ? 'text-cyan-400' : 'text-neutral-500'
            }`}
          >
            {currentLiveState ? '● LIVE' : currentVisibleState ? '● PREVIEW' : '● OFFLINE'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default CampApplicationsToggleCard
