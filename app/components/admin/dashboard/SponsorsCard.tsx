import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gift, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const SponsorsCard: FC<{ loading: boolean; sponsorsCount: number }> = ({ loading, sponsorsCount }) => {
  const { push } = useRouter()
  const theme = {
    bgGradient: 'bg-gradient-to-br from-green-600 via-green-700 to-green-800',
    text: 'text-white',
    accent: 'text-green-200',
    highlight: 'text-green-100',
    icon: 'text-green-200',
    shadow: 'shadow-green-500/20'
  }

  const handleNavigate = () => {
    push('/admin/sponsors')
  }

  return (
    <motion.div
      variants={cardVariants}
      className={`${theme.bgGradient} col-span-2 lg:col-span-1 p-6 transition-all duration-500 group hover:shadow-2xl ${theme.shadow} relative overflow-hidden cursor-pointer`}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={handleNavigate}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-black/20">
              <motion.div animate={{ scale: loading ? 0.8 : 1 }} transition={{ duration: 0.3 }}>
                <Gift className={`w-7 h-7 ${theme.icon}`} />
              </motion.div>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Sponsors</h3>
              <p className={`text-sm ${theme.accent}`}>Manage Partnerships</p>
            </div>
          </div>
          <ArrowUpRight
            className={`w-5 h-5 ${theme.accent} group-hover:${theme.highlight} transition-colors duration-300`}
          />
        </div>

        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="p-4 bg-black/30 border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${theme.icon}`} />
                <span className={`${theme.text} font-medium`}>Active Sponsors</span>
              </div>
              <span className={`${theme.highlight} font-bold text-lg`}>{loading ? '...' : sponsorsCount}</span>
            </div>
          </div>

          {/* Action Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`${theme.text} text-sm`}>• View all sponsors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${theme.text} text-sm`}>• Add new partnerships</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${theme.text} text-sm`}>• Manage sponsor details</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-between pt-4 border-t border-green-400/20">
            <span className={`${theme.accent} text-sm`}>Click to manage</span>
            <motion.div
              className="flex space-x-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="w-2 h-2 bg-green-200 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SponsorsCard
