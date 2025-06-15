'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Spinner from '@/app/components/common/Spinner'
import { RootState, useAppSelector } from '@/app/redux/store'
import { dashboardData } from '@/app/utils/admin.utils'
import { useFetchDashboardDataQuery } from '@/app/redux/services/appApi'
import SeasonBannerToggleCard from '@/app/components/admin/dashboard/SeasonBannerToggleCard'
import HeaderButtonStudioCard from '@/app/components/admin/dashboard/HeaderButtonStudioCard'
import HeaderButtonStudio from '@/app/drawers/HeaderButtonStudio'

// Icon mapping function for dashboard items
const getIconComponent = (IconComponent: any) => {
  // Since we're now passing the actual Lucide icon component from dashboardData,
  // we can just return it directly
  return IconComponent || TrendingUp
}

// Color themes for different cards
const cardColors = [
  {
    name: 'cyan',
    bg: 'bg-cyan-600',
    bgGradient: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
    text: 'text-cyan-100',
    accent: 'text-cyan-300',
    highlight: 'text-cyan-400',
    icon: 'text-cyan-200',
    border: 'border-cyan-500',
    shadow: 'shadow-cyan-500/20'
  },
  {
    name: 'orange',
    bg: 'bg-orange-600',
    bgGradient: 'bg-gradient-to-br from-orange-600 to-red-600',
    text: 'text-orange-100',
    accent: 'text-orange-300',
    highlight: 'text-orange-400',
    icon: 'text-orange-200',
    border: 'border-orange-500',
    shadow: 'shadow-orange-500/20'
  },
  {
    name: 'emerald',
    bg: 'bg-emerald-600',
    bgGradient: 'bg-gradient-to-br from-emerald-600 to-green-600',
    text: 'text-emerald-100',
    accent: 'text-emerald-300',
    highlight: 'text-emerald-400',
    icon: 'text-emerald-200',
    border: 'border-emerald-500',
    shadow: 'shadow-emerald-500/20'
  },
  {
    name: 'purple',
    bg: 'bg-purple-600',
    bgGradient: 'bg-gradient-to-br from-purple-600 to-violet-600',
    text: 'text-purple-100',
    accent: 'text-purple-300',
    highlight: 'text-purple-400',
    icon: 'text-purple-200',
    border: 'border-purple-500',
    shadow: 'shadow-purple-500/20'
  },
  {
    name: 'pink',
    bg: 'bg-pink-600',
    bgGradient: 'bg-gradient-to-br from-pink-600 to-rose-600',
    text: 'text-pink-100',
    accent: 'text-pink-300',
    highlight: 'text-pink-400',
    icon: 'text-pink-200',
    border: 'border-pink-500',
    shadow: 'shadow-pink-500/20'
  },
  {
    name: 'blue',
    bg: 'bg-blue-600',
    bgGradient: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    text: 'text-blue-100',
    accent: 'text-blue-300',
    highlight: 'text-blue-400',
    icon: 'text-blue-200',
    border: 'border-blue-500',
    shadow: 'shadow-blue-500/20'
  },
  {
    name: 'amber',
    bg: 'bg-amber-600',
    bgGradient: 'bg-gradient-to-br from-amber-600 to-yellow-600',
    text: 'text-amber-100',
    accent: 'text-amber-300',
    highlight: 'text-amber-400',
    icon: 'text-amber-200',
    border: 'border-amber-500',
    shadow: 'shadow-amber-500/20'
  },
  {
    name: 'teal',
    bg: 'bg-teal-600',
    bgGradient: 'bg-gradient-to-br from-teal-600 to-cyan-700',
    text: 'text-teal-100',
    accent: 'text-teal-300',
    highlight: 'text-teal-400',
    icon: 'text-teal-200',
    border: 'border-teal-500',
    shadow: 'shadow-teal-500/20'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.3
    }
  }
}

const cardVariants = {
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

const PageViewsCard: FC<{ info: any; getLast7DaysData: any }> = ({ info, getLast7DaysData }) => {
  const IconComponent = getIconComponent(info.icon)
  const theme = cardColors[0] // Cyan theme for page views

  const chartData = getLast7DaysData

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border-2 border-cyan-400 p-4 shadow-2xl">
          <p className="text-white font-bold mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-300"></div>
              <span className="text-cyan-300 font-medium">Desktop: {payload[0]?.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500"></div>
              <span className="text-cyan-500 font-medium">Mobile: {payload[1]?.value}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

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

const DefaultCard: FC<{ info: any; i: number; cardIndex: number }> = ({ info, i, cardIndex }) => {
  const IconComponent = getIconComponent(info.icon)
  const theme = cardColors[cardIndex % cardColors.length]

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

const Dashboard = () => {
  const { data, isLoading } = useFetchDashboardDataQuery(undefined) as any
  const { totalItems } = useAppSelector((state: RootState) => state.mailchimp)

  const dataPlusMailchimp = {
    ...data,
    mailchimpMembersCount: totalItems
  }

  return (
    <>
      <HeaderButtonStudio />
      <div className="min-h-screen bg-[#222222] p-6">
        <motion.div className="max-w-[1800px] mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div className="mb-10" variants={cardVariants}>
            <div className="bg-gray-800 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3">Dashboard Overview</h1>
                  <p className="text-gray-300 text-lg">Monitor your system performance and manage controls</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-600">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-300"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-300 animate-ping opacity-75"></div>
                    </div>
                    <span className="text-green-100 font-bold text-sm">SYSTEM ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid - Responsive columns */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <HeaderButtonStudioCard cardColors={cardColors} cardVariants={cardVariants} />

            {/* Season Package Banner Toggle Card */}
            <SeasonBannerToggleCard loading={isLoading} cardColors={cardColors} cardVariants={cardVariants} />

            {dashboardData(dataPlusMailchimp).map((info, i) => {
              switch (info.title) {
                case 'Page Views':
                  return <PageViewsCard key={i} info={info} getLast7DaysData={data?.getLast7DaysData} />
                default:
                  return <DefaultCard key={i} info={info} i={i} cardIndex={i + 2} />
              }
            })}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Dashboard
