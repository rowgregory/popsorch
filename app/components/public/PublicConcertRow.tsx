import React, { FC, useMemo } from 'react'
import Picture from '../common/Picture'
import Link from 'next/link'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { ConcertProps } from '@/app/redux/features/concertSlice'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, Building, CalendarIcon, ClockIcon, MapPinIcon, TicketIcon } from 'lucide-react'

const PublicConcertRow: FC<{ concert: ConcertProps; index: number }> = ({ concert, index }) => {
  const { push } = useRouter()

  // Memoize the next event details
  const nextEvent = useMemo(() => {
    if (!concert.eventDetails?.length) return null

    // Sort events by date and get the next upcoming one
    const sortedEvents = [...concert.eventDetails].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

    // Find the next upcoming event or return the first one
    const now = new Date()
    return (
      sortedEvents.find((event) => {
        const eventDate = new Date(`${event.date} ${event.time}`)
        return eventDate > now
      }) || sortedEvents[0]
    )
  }, [concert.eventDetails])

  // Extract price from external link or use default
  const ticketPrice = useMemo(() => {
    // You might want to add a price field to your ConcertProps
    // For now, using a default
    return '$35'
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ y: -4 }}
      onClick={() => push(`/concerts/${concert.id}`)}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 blur-xl" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Image Section */}
          <div className="col-span-1 lg:col-span-5 relative h-64 sm:h-80 lg:h-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <Picture
                src={concert.imageUrl}
                priority={true}
                className="absolute inset-0 w-full h-full object-cover"
                alt={concert.name}
              />
              <div className="absolute inset-0 bg-black/70 w-full h-full" />
              <Picture
                src={concert.imageUrl}
                priority={true}
                className="absolute inset-0 w-full h-full object-contain"
                alt={concert.name}
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-zinc-900/50" />

            {/* Badge and Price */}
            <div className="absolute inset-0 p-4 sm:p-6 flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25"
              >
                <TicketIcon className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {concert.type || 'Concert'}
                </span>
              </motion.div>

              {concert.isOnSale && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex flex-col items-center bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10"
                >
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">From</span>
                  <span className="text-2xl font-bold text-white">{ticketPrice}</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Per ticket</span>
                </motion.div>
              )}
            </div>

            {/* Multiple dates indicator */}
            {concert.eventDetails.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                  <p className="text-xs text-white font-medium">{concert.eventDetails.length} dates available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Title and Date */}
              <div className="mb-6">
                <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                  {concert.name}
                </motion.h2>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {/* Primary date display */}
                  <div className="flex items-center gap-2 text-amber-500">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    <time className="font-medium uppercase tracking-wide">{concert.cardDate}</time>
                  </div>

                  {/* Next event details */}
                  {nextEvent && (
                    <>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <ClockIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{nextEvent.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium truncate max-w-[200px]">{nextEvent.city}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6" />

              {/* Description */}
              <p className="text-zinc-300 leading-relaxed line-clamp-3 sm:line-clamp-4 mb-6 text-sm sm:text-base">
                {concert.pressRelease ||
                  concert.description ||
                  'Join us for an unforgettable night of music and entertainment.'}
              </p>

              {/* Venue information */}
              {nextEvent?.location && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 mb-6">
                  <Building className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1">{nextEvent.location.name}</h4>
                    <p className="text-xs text-zinc-400 truncate">{nextEvent.location.address}</p>
                    {concert.eventDetails.length > 1 && (
                      <p className="text-xs text-amber-500 mt-2">
                        + {concert.eventDetails.length - 1} more{' '}
                        {concert.eventDetails.length - 1 === 1 ? 'date' : 'dates'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {concert.isOnSale ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group/btn flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    href={concert.allSeriesExternalLink || nextEvent?.externalLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    <TicketIcon className="w-4 h-4" />
                    Get Tickets
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ) : (
                <CallBoxOfficeBtn className="flex-1" />
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-zinc-700 hover:border-zinc-600"
                onClick={(e) => {
                  e.stopPropagation()
                  push(`/concerts/${concert.id}`)
                }}
              >
                {concert.eventDetails.length > 1 ? 'View All Dates' : 'View Details'}
              </motion.button>
            </div>

            {/* Status badges */}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                {concert.isOnSale && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    On Sale Now
                  </span>
                )}

                {concert.eventDetails.length > 1 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                    Multiple Dates
                  </span>
                )}

                {concert.createdAt && isNewConcert(concert.createdAt) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    New
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Helper function to check if concert is new (within last 7 days)
const isNewConcert = (createdAt: Date): boolean => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return new Date(createdAt) > sevenDaysAgo
}

export default PublicConcertRow
