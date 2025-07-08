'use client'

import { cardColors } from '@/public/data/admin.data'
import { motion } from 'framer-motion'
import { ArrowUpRight, Monitor, Smartphone, Sparkles, TrendingUp } from 'lucide-react'
import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip'

export const getIconComponent = (IconComponent: any) => {
  // Since we're now passing the actual Lucide icon component from dashboardData,
  // we can just return it directly
  return IconComponent || TrendingUp
}

export const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.3
    }
  }
}

const PageViewsCard: FC<{ info: any; getLast7DaysData: any }> = ({ info, getLast7DaysData }) => {
  const IconComponent = getIconComponent(info.icon)
  const theme = cardColors[0] // Cyan theme for page views

  const chartData = getLast7DaysData

  return (
    <motion.div
      variants={cardVariants}
      className={`col-span-2 ${theme.bgGradient} p-6 transition-all duration-500 group hover:shadow-2xl ${theme.shadow} relative overflow-hidden`}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-black/20`}>
              <IconComponent className={`w-7 h-7 ${theme.icon}`} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text} mb-1`}>{info?.title} - 7 Day Trend</h3>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${theme.highlight}`} />
                <span className={`text-sm ${theme.highlight} font-medium`}>Daily Analytics</span>
              </div>
            </div>
          </div>
          <ArrowUpRight
            className={`w-5 h-5 ${theme.accent} group-hover:${theme.highlight} transition-colors duration-300`}
          />
        </div>

        {/* Current totals */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="flex items-center justify-between p-4 bg-black/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/20">
                <Monitor className={`w-5 h-5 ${theme.highlight}`} />
              </div>
              <span className={`${theme.text} font-semibold`}>Desktop</span>
            </div>
            <span className={`text-2xl font-bold ${theme.text}`}>{info?.count}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between p-4 bg-black/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/20">
                <Smartphone className={`w-5 h-5 ${theme.highlight}`} />
              </div>
              <span className={`${theme.text} font-semibold`}>Mobile</span>
            </div>
            <span className={`text-2xl font-bold ${theme.text}`}>{info?.count2}</span>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="bg-black/20 p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className={`${theme.text} font-semibold`}>Daily Views</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${theme.bg}`}></div>
                <span className={theme.accent}>Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${theme.highlight} bg-cyan-500`}></div>
                <span className={theme.accent}>Mobile</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#a5f3fc', fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#a5f3fc', fontSize: 12 }}
                  domain={[0, 'dataMax + 100']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="desktop" fill="#22d3ee" name="Desktop" />
                <Bar dataKey="mobile" fill="#06b6d4" name="Mobile" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pulse indicator */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/20">
          <div className="relative">
            <div className={`w-3 h-3 ${theme.highlight} bg-cyan-400`}></div>
            <div className={`absolute inset-0 w-3 h-3 ${theme.highlight} bg-cyan-400 animate-ping opacity-75`}></div>
          </div>
          <span className={`text-sm ${theme.text} font-medium`}>Updated every 5 minutes</span>
        </div>
      </div>
    </motion.div>
  )
}

export default PageViewsCard
