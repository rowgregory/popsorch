'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import { useRouter } from 'next/navigation'

const tickets = [
  {
    type: 'Ultra',
    seasonTicket: {
      price: 200,
      perShow: 50,
      includesAddOns: true
    },
    individualTicket: {
      price: 65,
      includesAddOns: false
    },
    savings: 60 // $65 × 4 shows = $260, minus $200 season = $60 savings
  },
  {
    type: 'Premium',
    seasonTicket: {
      price: 165,
      perShow: 41.25,
      includesAddOns: true
    },
    individualTicket: {
      price: 50,
      includesAddOns: false
    },
    savings: 35 // $50 × 4 shows = $200, minus $165 season = $35 savings
  },
  {
    type: 'General',
    seasonTicket: {
      price: 120,
      perShow: 30,
      includesAddOns: true
    },
    individualTicket: {
      price: 35,
      includesAddOns: false
    },
    savings: 20 // $35 × 4 shows = $140, minus $120 season = $20 savings
  }
]

const TicketCard = ({ ticket, isSeason, index }: any) => {
  const currentTicket = isSeason ? ticket.seasonTicket : ticket.individualTicket

  return (
    <div className="col-span-12 576:col-span-4">
      <motion.div
        className="bg-zinc-900 border border-gray-700 rounded-xl p-6 h-full hover:border-yellow-400/30 transition-all duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">{ticket.type}</h3>

          <div className="mb-6">
            <div className="text-3xl font-bold text-blaze mb-2">${currentTicket.price}</div>
            {isSeason && <div className="text-sm text-gray-400">${currentTicket.perShow} per show</div>}
          </div>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Add-ons included:</span>
              <span className={currentTicket.includesAddOns ? 'text-green-400' : 'text-red-400'}>
                {currentTicket.includesAddOns ? 'Yes' : 'No'}
              </span>
            </div>

            {isSeason && (
              <div className="flex justify-between">
                <span>You save:</span>
                <span className="text-green-400">${ticket.savings}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const Badge = ({ textBlockMap }: any) => (
  <motion.div variants={fadeInUp} className="mb-6 w-full mx-auto flex justify-center pt-24">
    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-full">
      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
      <EditableTextArea
        tag="span"
        initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.topBadgeText || 'Season Packages Available'}
        type="SEASON_PACKAGE_BANNER"
        textBlockKey="topBadgeText"
        className="text-yellow-100 font-semibold text-sm uppercase tracking-wide"
      />
      <div className="w-2 h-2 bg-yellow-400 rounded-full ml-2" />
    </div>
  </motion.div>
)

const MergedSeasonTickets = () => {
  const [ticketType, setTicketType] = useState('season')
  const app = useAppSelector((state: RootState) => state.app)
  const { user } = useAppSelector((state: RootState) => state.user)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { push } = useRouter()

  const isSeason = ticketType === 'season'
  const isSingle = ticketType === 'single'

  const shouldShowBanner =
    app.isSeasonPackageBannerToggledLive || (app.isSeasonPackageBannerToggledVisible && user?.isAdmin)

  if (!shouldShowBanner) return <Badge textBlockMap={textBlockMap} />

  return (
    <div className="relative w-full text-white">
      <motion.div
        className="relative z-10 px-4 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Magnificent Main Headline */}
            <motion.div variants={fadeInUp} className="mb-12">
              <motion.h1
                className="font-changa text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-6"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,215,0,0.5)',
                    '0 0 40px rgba(255,215,0,0.8)',
                    '0 0 20px rgba(255,215,0,0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <EditableTextArea
                  tag="span"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerTitle || 'Season Packages'}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey="seasonPackageBannerTitle"
                />
                <motion.span
                  className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <EditableTextArea
                    tag="span"
                    initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerSubtitle}
                    type="SEASON_PACKAGE_BANNER"
                    textBlockKey="seasonPackageBannerSubtitle"
                  />
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeInUp} className="mb-12">
              <EditableTextArea
                tag="p"
                initialValue={
                  textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerParagraph ||
                  'Experience the full season with exclusive benefits or choose individual performances'
                }
                type="SEASON_PACKAGE_BANNER"
                textBlockKey="seasonPackageBannerParagraph"
                className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center">
                {/* Single Tickets Button */}
                <motion.div
                  onClick={() => push('/concerts')}
                  className="group relative inline-flex items-center px-8 lg:px-12 py-5 lg:py-7 bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white font-changa font-bold text-lg lg:text-xl xl:text-2xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer w-full lg:w-auto min-w-[240px] justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(255, 165, 0, 0.6)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Luxurious shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                  {/* Orange border glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-orange-300/50 group-hover:border-orange-200/80 transition-colors duration-300" />

                  <span className="relative z-10 tracking-wide">Single Tickets</span>
                </motion.div>

                {/* Package Button */}
                <motion.div
                  onClick={() => {
                    if (!user.isAdmin) {
                      window.open('https://ci.ovationtix.com/35505/store/packages', '_blank')
                    }
                  }}
                  className="group relative inline-flex items-center px-8 lg:px-12 py-5 lg:py-7 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 text-white font-changa font-bold text-lg lg:text-xl xl:text-2xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer w-full lg:w-auto min-w-[240px] justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.6)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Luxurious shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                  {/* Golden border glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/50 group-hover:border-yellow-200/80 transition-colors duration-300" />

                  <EditableTextArea
                    tag="span"
                    initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerButtonText}
                    type="SEASON_PACKAGE_BANNER"
                    textBlockKey="seasonPackageBannerButtonText"
                    className="relative z-10 tracking-wide"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                <button
                  onClick={() => setTicketType('season')}
                  className={`px-8 py-3 font-semibold rounded-md transition-all duration-300 ${
                    isSeason ? 'bg-white text-black shadow-lg' : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
                  }`}
                >
                  Season Packages
                </button>
                <button
                  onClick={() => setTicketType('single')}
                  className={`px-8 py-3 font-semibold rounded-md transition-all duration-300 ${
                    isSingle ? 'bg-white text-black shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Single Tickets
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tickets Grid */}
          <motion.div variants={fadeInUp} className="mb-20">
            <div className="grid grid-cols-12 gap-6">
              {tickets.map((ticket, i) => (
                <TicketCard key={i} ticket={ticket} isSeason={isSeason} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default MergedSeasonTickets
