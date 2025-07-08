'use client'

import { FC, useMemo } from 'react'
import { cardVariants, getIconComponent } from './PageViewsCard'
import { cardColors } from '@/public/data/admin.data'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Spinner from '../../common/Spinner'
import Link from 'next/link'

const DefaultCard: FC<{ info: any; i: number; cardIndex: number }> = ({ info, i, cardIndex }) => {
  const IconComponent = getIconComponent(info.icon)

  // Ensure consistent theme selection between server and client
  const theme = useMemo(() => {
    // Provide fallback if cardColors is empty or undefined
    if (!cardColors || cardColors.length === 0) {
      return {
        bgGradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
        shadow: 'shadow-blue-500/25',
        icon: 'text-blue-100',
        text: 'text-white',
        accent: 'text-blue-100',
        highlight: 'text-white',
        bg: 'bg-blue-400'
      }
    }
    return cardColors[cardIndex % cardColors.length]
  }, [cardIndex])

  return (
    <Link href={info.linkKey} className={`${i === 0 ? 'pointer-events-none' : ''} block`}>
      <motion.div
        variants={cardVariants}
        className={`${theme.bgGradient} p-6 transition-all duration-500 group hover:shadow-2xl ${theme.shadow} h-full relative overflow-hidden`}
        whileHover={i !== 0 ? { y: -8, scale: 1.02 } : {}}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-black/20">
                <IconComponent className={`w-7 h-7 ${theme.icon}`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>{info?.title}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${info.isLoading ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'}`} />
                  <span className={`text-sm ${theme.accent} font-medium`}>
                    {info.isLoading ? 'Updating...' : 'Live Data'}
                  </span>
                </div>
              </div>
            </div>
            {i !== 0 && (
              <ArrowUpRight
                className={`w-5 h-5 ${theme.accent} group-hover:${theme.highlight} transition-colors duration-300`}
              />
            )}
          </div>

          <div className="mb-6">
            {info.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Spinner fill={info.fill} track="text-black/40" wAndH="w-10 h-10" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className={`text-5xl font-bold ${theme.text}`}>{info.count}</span>
                <div className={`w-2 h-12 ${theme.bg} opacity-60`} />
              </div>
            )}
          </div>

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span className={`text-sm ${theme.accent} font-medium`}>
              {i === 0 ? 'Dashboard Overview' : 'Click to explore'}
            </span>
            <div className={`w-3 h-3 ${theme.bg}`} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default DefaultCard
