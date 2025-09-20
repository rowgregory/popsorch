'use client'

import { motion } from 'framer-motion'
import { BarChart3, Binoculars, Sparkles } from 'lucide-react'
import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip'

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
  const chartData = getLast7DaysData

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-4 bg-gradient-to-r from-sky-900/30 via-blue-900/20 to-sky-900/30 border border-sky-500/30 rounded-xl p-6 hover:border-sky-400/50 transition-all"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row m:items-center md:justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Binoculars className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Page Views - 7 Day Trend</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-sm text-sky-300 font-medium">Daily Analytics</span>
              </div>
            </div>
          </div>

          <button className="mt-3 md:mt-0 bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 hover:border-sky-400/50 rounded-lg px-6 py-3 text-sky-300 font-medium transition-all flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-sky-400 mb-1">{info?.metric?.desktopCount}</div>
            <div className="text-slate-400 text-sm">Desktop Views</div>
          </div>
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">{info?.metric?.mobileCount}</div>
            <div className="text-slate-400 text-sm">Mobile Views</div>
          </div>
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-sky-300 mb-1">
              {(info?.metric?.desktopCount || 0) + (info?.metric?.mobileCount || 0)}
            </div>
            <div className="text-slate-400 text-sm">Total Views</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-black/20 border border-sky-500/20 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Daily Views</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                <span className="text-slate-300">Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-300">Mobile</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7dd3fc', fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#7dd3fc', fontSize: 12 }}
                  domain={[0, 'dataMax + 100']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="desktop" fill="#0ea5e9" name="Desktop" />
                <Bar dataKey="mobile" fill="#3b82f6" name="Mobile" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PageViewsCard
