import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import Picture from '../common/Picture'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, Ticket, Info } from 'lucide-react'
import Link from 'next/link'
import { sendGAEvent } from '@next/third-parties/google'
import { IConcertCard } from '@/app/types/entities/concert'

const HomeConcertCard: FC<IConcertCard> = ({ concert, index }) => {
  const { push } = useRouter()

  const handleOpenConcert = () => {
    sendGAEvent('concert', 'view_concert', {
      item_id: concert.id,
      item_name: concert.name,
      item_category: concert.type
    })
  }

  return (
    <motion.div
      key={concert.id}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-12 group relative overflow-hidden cursor-pointer rounded-3xl bg-gradient-to-r from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] border border-gray-800 hover:border-[#da0032]/50 transition-all duration-500 shadow-2xl"
      onClick={handleOpenConcert}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#da0032]/0 via-[#da0032]/0 to-[#da0032]/0 group-hover:from-[#da0032]/5 group-hover:via-[#da0032]/3 group-hover:to-[#da0032]/5 transition-all duration-700 rounded-3xl" />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#da0032]/10 rounded-full blur-3xl group-hover:bg-[#da0032]/20 transition-all duration-1000" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#da0032]/10 rounded-full blur-3xl group-hover:bg-[#da0032]/20 transition-all duration-1000 delay-200" />

      <div className="flex flex-col 990:flex-row h-full relative z-10">
        {/* Left Side - Enhanced Image Section */}
        <div className="990:w-80 990:h-80 w-full relative overflow-hidden rounded-t-3xl 990:rounded-l-3xl 990:rounded-tr-none">
          {/* Image Container with Creative Frame */}
          <div className="relative h-full group/image">
            {/* Decorative Frame Border */}
            <div className="absolute inset-2 border-2 border-gradient-to-br from-[#da0032]/30 via-[#da0032]/20 to-[#da0032]/30 rounded-2xl group-hover:from-[#da0032]/60 group-hover:via-[#da0032]/40 group-hover:to-[#da0032]/60 transition-all duration-500 z-10" />

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-[#da0032] rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-[#da0032] rounded-tr-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-[#da0032] rounded-bl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#da0032] rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            {/* Image with Creative Effects */}
            <Picture
              src={concert.imageUrl ?? '/images'}
              className="w-full h-full min-h-[320px] 990:min-h-full object-contain p-6 group-hover/image:scale-105 group-hover/image:rotate-1 transition-all duration-700 ease-out filter group-hover/image:brightness-110 group-hover/image:contrast-110"
              priority={false}
            />

            {/* Concert Type Badge - Repositioned */}
            <motion.div
              className="absolute top-6 left-6 z-30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-[#da0032] to-[#b8002a] text-white px-4 py-2 rounded-full font-changa text-sm font-bold uppercase tracking-wider shadow-xl backdrop-blur-sm border border-[#da0032]/50">
                {concert?.type}
              </div>
            </motion.div>

            {/* Sale Badge */}
            {concert.isOnSale && (
              <motion.div
                className="absolute top-6 right-6 z-30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className="bg-green-600 text-white px-3 py-2 rounded-full text-sm font-bold uppercase shadow-xl flex items-center gap-2 animate-pulse">
                  <Ticket className="w-4 h-4" />
                  Live
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side - Enhanced Content */}
        <div className="flex-1 flex flex-col justify-between p-8 990:p-10 min-h-[320px] relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex-1">
            {/* Concert Title with Creative Typography */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mb-6 md:mb-8"
            >
              <h4 className="font-changa text-2xl sm:text-3xl 990:text-4xl xl:text-5xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#da0032] group-hover:via-[#ff1744] group-hover:to-[#da0032] group-hover:bg-clip-text transition-all duration-500">
                {concert.name}
              </h4>
              {/* Subtle underline effect */}
              <div className="w-0 h-1 bg-gradient-to-r from-[#da0032] to-[#b8002a] group-hover:w-full transition-all duration-700 ease-out mt-2" />
            </motion.div>

            {/* Event Details - Stacked Cards */}
            <motion.div
              className="space-y-3 md:space-y-4 mb-6 md:mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {concert?.eventDetails?.map((eventDetail, i) => (
                <motion.div
                  key={eventDetail?.id}
                  className="group/detail relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-[#1a1a1a]/80 via-[#2a2a2a]/60 to-[#1a1a1a]/80 rounded-2xl border border-gray-600/50 group-hover:border-[#da0032]/30 group/detail-hover:bg-gradient-to-r group/detail-hover:from-[#da0032]/10 group/detail-hover:to-[#da0032]/10 transition-all duration-300 backdrop-blur-sm">
                    {/* Enhanced Icon */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#da0032] to-[#b8002a] rounded-xl flex items-center justify-center shadow-lg group/detail-hover:shadow-[#da0032]/50 transition-all duration-300">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white group/detail-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="font-changa font-bold text-[#da0032] text-lg sm:text-xl uppercase tracking-wide mb-1">
                        {eventDetail?.dayOfWeek}
                      </div>
                      <div className="text-white font-bold text-lg sm:text-xl mb-2">{eventDetail?.date}</div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-gray-300 text-sm sm:text-base">
                        <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4" />
                          <span className="whitespace-nowrap">{eventDetail?.time}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{eventDetail?.city}</span>
                        </span>
                      </div>
                    </div>

                    {/* Arrow with pulse effect - Hidden on mobile, shown on tablet+ */}
                    <div className="hidden sm:block text-[#da0032] group/detail-hover:translate-x-2 transition-transform duration-300">
                      <div className="w-8 h-8 bg-[#da0032]/20 rounded-full flex items-center justify-center group/detail-hover:bg-[#da0032]/40 transition-all duration-300">
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Action Buttons */}
          <motion.div
            className="flex flex-col 430:flex-row gap-4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {concert.isOnSale ? (
              <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/concerts/${concert.id}`}
                  className="group/btn relative inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-[#da0032] via-[#b8002a] to-[#da0032] text-white font-changa font-bold text-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[#da0032]/25"
                  onClick={(e) => {
                    sendGAEvent('event', 'buy_tickets_click', {
                      concert_id: concert.id,
                      concert_name: concert.name,
                      concert_type: concert.type,
                      concert_all_series_external_link: concert.allSeriesExternalLink, // if available
                      source: 'home_concert_card', // where user clicked from
                      timestamp: Date.now()
                    })

                    e.stopPropagation()
                  }}
                >
                  {/* Multiple animated layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 delay-200" />

                  <span className="relative z-10 flex items-center gap-3 uppercase tracking-wider">
                    <Ticket className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                    Buy Tickets
                  </span>
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <CallBoxOfficeBtn />
                </motion.div>
                <motion.button
                  className="px-8 py-5 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] text-white font-semibold rounded-2xl border border-gray-600 hover:border-[#da0032]/30 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    push(`/concerts/${concert.id}`)
                    sendGAEvent('event', 'concert_card_details_button', {
                      concert_id: concert.id,
                      concert_name: concert.name,
                      concert_type: concert.type,
                      source: 'home_concert_card', // where user clicked from
                      timestamp: Date.now()
                    })
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Info className="w-5 h-5" />
                  Details
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
export default HomeConcertCard
