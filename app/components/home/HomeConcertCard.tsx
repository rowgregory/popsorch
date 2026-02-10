import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import Picture from '../common/Picture'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, MapPin, Ticket, Info } from 'lucide-react'
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative cursor-pointer bg-duskgray flex flex-col"
      onClick={handleOpenConcert}
    >
      {/* Image - Full Width Top */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Picture
          src={concert.imageUrl ?? '/images'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority={false}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <div className="bg-blaze text-white px-3 py-1 font-changa text-xs uppercase tracking-wider">
            {concert?.type}
          </div>
          {concert.isOnSale && (
            <div className="bg-green-600 text-white px-3 py-1 font-changa text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" />
              Live
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h4 className="font-changa text-2xl 990:text-3xl text-white group-hover:text-sunburst transition-colors duration-300 mb-1">
          {concert.name}
        </h4>
        <div className="w-8 h-0.5 bg-blaze mb-6" />

        {/* Event Details */}
        <div className="flex flex-col gap-3 mb-6 flex-1">
          {concert?.eventDetails?.map((eventDetail) => (
            <div key={eventDetail?.id} className="flex items-center gap-4 border-l-2 border-blaze pl-4 py-1">
              <div className="flex-1 min-w-0">
                <div className="font-changa text-blaze text-xs uppercase tracking-widest mb-0.5">
                  {eventDetail?.dayOfWeek}
                </div>
                <div className="font-changa text-white text-base mb-1">{eventDetail?.date}</div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-lato text-xs text-slatemist">
                    <Clock className="w-3.5 h-3.5 text-sunburst shrink-0" />
                    {eventDetail?.time}
                  </span>
                  <span className="flex items-center gap-1.5 font-lato text-xs text-slatemist">
                    <MapPin className="w-3.5 h-3.5 text-sunburst shrink-0" />
                    {eventDetail?.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col 430:flex-row gap-2 mt-auto">
          {concert.isOnSale ? (
            <Link
              href={`/concerts/${concert.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm transition-colors duration-300"
              onClick={(e) => {
                sendGAEvent('event', 'buy_tickets_click', {
                  concert_id: concert.id,
                  concert_name: concert.name,
                  concert_type: concert.type,
                  concert_all_series_external_link: concert.allSeriesExternalLink,
                  source: 'home_concert_card',
                  timestamp: Date.now()
                })
                e.stopPropagation()
              }}
            >
              <Ticket className="w-4 h-4" />
              Buy Tickets
            </Link>
          ) : (
            <>
              <div className="flex-1">
                <CallBoxOfficeBtn />
              </div>
              <button
                className="px-6 py-3.5 bg-charcoalgray hover:bg-charcoalgray/70 text-white font-changa uppercase tracking-wider text-sm border-l-2 border-blaze flex items-center justify-center gap-2 transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation()
                  push(`/concerts/${concert.id}`)
                  sendGAEvent('event', 'concert_card_details_button', {
                    concert_id: concert.id,
                    concert_name: concert.name,
                    concert_type: concert.type,
                    source: 'home_concert_card',
                    timestamp: Date.now()
                  })
                }}
              >
                <Info className="w-4 h-4" />
                Details
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default HomeConcertCard
