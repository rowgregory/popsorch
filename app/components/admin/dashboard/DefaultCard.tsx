'use client'

import { FC } from 'react'
import { cardVariants } from './PageViewsCard'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Spinner from '../../common/Spinner'
import Link from 'next/link'

const getIconComponent = (IconComponent: any) => {
  // Since we're now passing the actual Lucide icon component from dashboardData,
  // we can just return it directly
  return IconComponent || TrendingUp
}

const DefaultCard: FC<{ info: any; i: number }> = ({ info, i }) => {
  const IconComponent = getIconComponent(info.icon)

  return (
    <Link href={info.linkKey} className={`${i === 0 ? 'pointer-events-none' : ''} block`}>
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-r from-neutral-900/30 via-gray-900/20 to-neutral-900/30 border border-neutral-500/30 rounded-xl p-6 hover:border-neutral-400/50 transition-all duration-500 group hover:shadow-2xl shadow-neutral-500/20 h-full relative overflow-hidden min-h-[280px]"
        whileHover={i !== 0 ? { y: -8, scale: 1.02 } : {}}
      >
        <div className="relative z-10 h-full flex flex-col">
          {/* Header - Fixed height */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neutral-500 to-gray-500 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-100 mb-1 leading-tight">{info?.title}</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      info.isLoading ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'
                    }`}
                  />
                  <span className="text-xs text-neutral-300 font-medium">
                    {info.isLoading ? 'Updating...' : 'Live Data'}
                  </span>
                </div>
              </div>
            </div>

            {i !== 0 && (
              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-100 transition-colors duration-300" />
            )}
          </div>

          {/* Main Content - Flexible height */}
          <div className="flex-1 flex items-center justify-center mb-4">
            <div className="text-center p-6 bg-neutral-800/30 rounded-lg w-full">
              {info.isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner fill={info.fill} track="text-black/40" wAndH="w-8 h-8" />
                </div>
              ) : (
                <>
                  <div className="text-4xl font-bold text-neutral-100 mb-2">{info.count}</div>
                  <div className="text-neutral-400 text-sm">{i === 0 ? 'Total Records' : 'Active Count'}</div>
                </>
              )}
            </div>
          </div>

          {/* Footer - Fixed height */}
          <div className="flex items-center justify-between pt-3 border-t border-neutral-700/30">
            <span className="text-xs text-neutral-300 font-medium">
              {i === 0 ? 'Dashboard Overview' : 'Click to explore'}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neutral-500 opacity-60" />
              <span className="text-xs text-neutral-400">Live</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default DefaultCard
