'use client'

import { FC, useMemo } from 'react'
import Picture from '../common/Picture'
import Link from 'next/link'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, Calendar, CalendarIcon, ClockIcon, InfoIcon, MapPinIcon, TicketIcon } from 'lucide-react'
import { IConcert } from '@/app/types/entities/concert'
import isNewConcert from '@/app/lib/utils/concerts/isNewConcert'
import { sendGAEvent } from '@next/third-parties/google'
import { itemVariants } from '@/app/lib/constants/motion'

export const PublicConcertCard: FC<{ concert: IConcert; index: number }> = ({ concert, index }) => {
  const { push } = useRouter()

  const nextEvent = useMemo(() => {
    if (!concert.eventDetails?.length) return null
    const sortedEvents = [...concert.eventDetails].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })
    const now = new Date()
    return sortedEvents.find((event) => new Date(`${event.date} ${event.time}`) > now) || sortedEvents[0]
  }, [concert.eventDetails])

  const handleClick = () => {
    sendGAEvent('event', 'view_concert_details', {
      value: 'view_concert_details',
      concert_id: concert.id,
      concert_name: concert.name,
      concert_type: concert.type,
      source_page: 'concert_list',
      timestamp: new Date().toISOString()
    })
    push(`/concerts/${concert.id}`)
  }

  return (
    <motion.article
      custom={index}
      layout
      variants={itemVariants}
      aria-label={`${concert.name}${concert.isOnSale ? ', tickets on sale' : ''}`}
      className="group relative overflow-hidden border border-white/10 hover:border-blaze/40 transition-colors duration-300"
    >
      {/* Image — full width, focal point */}
      <div className="relative w-full h-56 430:h-72 760:h-96 990:h-160 overflow-hidden">
        <Picture
          src={concert.imageUrl}
          priority={index < 3}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={`${concert.name} promotional image`}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" aria-hidden="true" />

        {/* Type badge — top left */}
        <div className="absolute top-3 430:top-4 990:top-6 left-3 430:left-4 990:left-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-blaze/30 font-changa text-[10px] 430:text-xs uppercase tracking-[0.25em] text-blaze">
            <div className="w-3 h-px bg-blaze" aria-hidden="true" />
            {concert?.type}
          </span>
        </div>

        {/* Status badges — top right */}
        <div className="absolute top-3 430:top-4 990:top-6 right-3 430:right-4 990:right-6 flex flex-col items-end gap-1.5 430:gap-2">
          {concert.isOnSale && (
            <span
              role="status"
              className="inline-flex items-center gap-1 430:gap-1.5 px-2 430:px-3 py-1 430:py-1.5 bg-black/70 backdrop-blur-sm border border-green-500/30 font-lato text-[10px] 430:text-xs text-green-400"
            >
              <span
                className="w-1 h-1 430:w-1.5 430:h-1.5 rounded-full bg-green-400 animate-pulse"
                aria-hidden="true"
              />
              <span className="hidden 430:inline">On Sale Now</span>
              <span className="430:hidden">On Sale</span>
            </span>
          )}
          {concert.createdAt && isNewConcert(concert.createdAt) && (
            <span className="inline-flex items-center px-2 430:px-3 py-1 430:py-1.5 bg-black/70 backdrop-blur-sm border border-sunburst/30 font-lato text-[10px] 430:text-xs text-sunburst">
              New
            </span>
          )}
        </div>

        {/* Title + meta overlaid on bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-3 430:p-4 760:p-6 990:p-8">
          <h2 className="font-changa text-lg 430:text-2xl 760:text-3xl 990:text-4xl text-white leading-tight mb-1.5 430:mb-3">
            {concert.name}
          </h2>
          <dl className="flex flex-wrap gap-x-3 430:gap-x-5 gap-y-1 430:gap-y-1.5">
            <div className="flex items-center gap-1 430:gap-1.5">
              <CalendarIcon className="w-3 h-3 430:w-3.5 430:h-3.5 text-blaze shrink-0" aria-hidden="true" />
              <dt className="sr-only">Date</dt>
              <dd>
                <time className="font-lato text-[10px] 430:text-xs 760:text-sm text-white/80 uppercase tracking-wide">
                  {concert.cardDate}
                </time>
              </dd>
            </div>
            {nextEvent?.time && (
              <div className="flex items-center gap-1 430:gap-1.5">
                <ClockIcon className="w-3 h-3 430:w-3.5 430:h-3.5 text-blaze shrink-0" aria-hidden="true" />
                <dt className="sr-only">Time</dt>
                <dd className="font-lato text-[10px] 430:text-xs 760:text-sm text-white/80">{nextEvent.time}</dd>
              </div>
            )}
            {nextEvent?.city && (
              <div className="flex items-center gap-1 430:gap-1.5">
                <MapPinIcon className="w-3 h-3 430:w-3.5 430:h-3.5 text-blaze shrink-0" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd className="font-lato text-[10px] 430:text-xs 760:text-sm text-white/80">{nextEvent.city}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Content strip below image */}
      <div className="bg-duskgray/60 px-3 430:px-4 760:px-6 990:px-8 py-4 430:py-5 760:py-6 flex flex-col gap-3 430:gap-4">
        <p className="font-lato text-white/50 text-xs 430:text-sm leading-relaxed line-clamp-2">
          {concert.pressRelease ||
            concert.description ||
            'Join us for an unforgettable night of music and entertainment.'}
        </p>

        <div className="flex flex-wrap items-center gap-2 430:gap-3">
          {concert.eventDetails.length > 1 && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 430:px-3 py-1.5 430:py-2 border border-white/10 font-lato text-[10px] 430:text-xs text-white/40"
              aria-label={`${concert.eventDetails.length} performances available`}
            >
              <Calendar className="w-3 h-3 430:w-3.5 430:h-3.5 text-blaze shrink-0" aria-hidden="true" />
              {concert.eventDetails.length} Shows
            </span>
          )}

          {!concert.isOnSale && <CallBoxOfficeBtn />}

          <Link
            href={`/concerts/${concert.id}`}
            onClick={handleClick}
            aria-label={concert.isOnSale ? `Get tickets for ${concert.name}` : `View details for ${concert.name}`}
            className="inline-flex items-center gap-1.5 430:gap-2 bg-blaze hover:bg-blazehover text-white px-4 430:px-5 760:px-6 py-2 430:py-2.5 760:py-3 font-changa text-xs 430:text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
          >
            {concert.isOnSale ? (
              <TicketIcon className="w-3.5 h-3.5 430:w-4 430:h-4 shrink-0" aria-hidden="true" />
            ) : (
              <InfoIcon className="w-3.5 h-3.5 430:w-4 430:h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{concert.isOnSale ? 'Get Tickets' : 'View Details'}</span>
            <ArrowRightIcon
              className="w-3.5 h-3.5 430:w-4 430:h-4 shrink-0 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
