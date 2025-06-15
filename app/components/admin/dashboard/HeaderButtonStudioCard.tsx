import { setOpeneHeaderButtonStudio } from '@/app/redux/features/appSlice'
import { useAppDispatch } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { ArrowUpRight, Palette } from 'lucide-react'
import { FC } from 'react'

const HeaderButtonStudioCard: FC<{ cardColors: any; cardVariants: any }> = ({ cardColors, cardVariants }) => {
  const theme = cardColors[2] // Purple theme for header button studio
  const dispatch = useAppDispatch()

  return (
    <motion.div
      variants={cardVariants}
      className={`${theme.bgGradient} col-span-2 lg:col-span-1 p-6 transition-all duration-500 group hover:shadow-2xl ${theme.shadow} relative overflow-hidden cursor-pointer`}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-black/30 rounded-xl border border-white/10">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut'
                }}
              >
                <Palette className="w-7 h-7 text-white" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Header Button Studio</h3>
              <p className="text-sm text-gray-200">New Design Feature</p>
            </div>
          </div>
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 font-semibold border border-blue-400/40">
              NEW
            </span>
            <ArrowUpRight className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors duration-300" />
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded-lg border border-blue-400/30 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Visual Button Designer</h4>
                  <p className="text-sm text-gray-200">
                    Create custom header buttons with real-time preview and advanced styling options
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/40 rounded-lg border border-blue-400/30 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full mt-2 animate-pulse"
                  style={{ animationDelay: '1s' }}
                ></div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Smart Responsive Design</h4>
                  <p className="text-sm text-gray-200">
                    Automatically adapts to all screen sizes with mobile-first approach
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Development Status</span>
              <span className="text-blue-300 font-bold">READY TO USE</span>
            </div>
            <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full relative overflow-hidden rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)'
                }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                  animate={{ x: [-100, 120] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </div>
            <div className="text-xs text-gray-300">Feature complete and available for immediate use</div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/20">
            <div className="flex gap-3">
              <motion.button
                onClick={() => dispatch(setOpeneHeaderButtonStudio())}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white hover:from-blue-600/60 hover:to-purple-600/60 border border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Palette className="w-4 h-4 inline mr-2" />
                Try Studio
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/15 to-blue-400/15 rounded-full blur-xl"></div>
    </motion.div>
  )
}

export default HeaderButtonStudioCard
