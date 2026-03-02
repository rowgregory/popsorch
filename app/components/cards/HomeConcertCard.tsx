import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import Picture from '../common/Picture'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, MapPin, Ticket, Info } from 'lucide-react'
import Link from 'next/link'
import { IConcertCard } from '@/app/types/entities/concert'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

const HomeConcertCard: FC<IConcertCard> = ({ concert, index }) => {
  const { push } = useRouter()

  return (
    <motion.li
      key={concert.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative bg-duskgray rounded-lg"
    >
      <article aria-label={`${concert.name} concert`} className="flex flex-col justify-between h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          <Picture
            src={concert.imageUrl ?? '/images'}
            alt={`${concert.name} promotional image`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out rounded-tl-lg rounded-tr-lg"
            priority={false}
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 z-10" aria-hidden="true">
            <div className="bg-blaze text-white px-3 py-1 font-changa text-xs uppercase tracking-wider rounded-sm">
              {concert?.type}
            </div>
            {concert.isOnSale && (
              <div className="bg-green-600 text-white px-3 py-1 font-changa text-xs uppercase tracking-wider flex items-center gap-1.5 rounded-sm">
                <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                Live
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <h4 className="font-changa text-2xl 990:text-3xl text-white group-hover:text-sunburst transition-colors duration-300 mb-1">
            {concert.name}
          </h4>
          {concert.isOnSale && <span className="sr-only">— tickets on sale</span>}
          {concert?.type && <span className="sr-only">{concert.type}</span>}
          <div className="w-8 h-0.5 bg-blaze mb-6" aria-hidden="true" />

          <ul role="list" className="flex flex-col gap-3 mb-6 flex-1">
            {concert?.eventDetails?.map((eventDetail) => (
              <li key={eventDetail?.id} className="flex items-center gap-4 border-l-2 border-blaze pl-4 py-1">
                <div className="flex-1 min-w-0">
                  <div className="font-changa text-blaze text-xs uppercase tracking-widest mb-0.5" aria-hidden="true">
                    {eventDetail?.dayOfWeek}
                  </div>
                  <div className="font-changa text-white text-base mb-1">
                    <time dateTime={eventDetail?.date}>{eventDetail?.date}</time>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-lato text-xs text-slatemist">
                      <Clock className="w-3.5 h-3.5 text-sunburst shrink-0" aria-hidden="true" />
                      <span className="sr-only">Time:</span>
                      {eventDetail?.time}
                    </span>
                    <span className="flex items-center gap-1.5 font-lato text-xs text-slatemist">
                      <MapPin className="w-3.5 h-3.5 text-sunburst shrink-0" aria-hidden="true" />
                      <span className="sr-only">Location:</span>
                      {eventDetail?.city}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col 430:flex-row gap-2 mt-auto">
            {concert.isOnSale ? (
              <Link
                href={`/concerts/${concert.id}`}
                aria-label={`Buy tickets for ${concert.name}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm transition-colors duration-300 rounded-md"
                onClick={(e) => {
                  sendEnrichedGAEvent('buy_tickets_click', concert.id, 'Buy Tickets', 'home_concert_card')
                  e.stopPropagation()
                }}
              >
                Buy Tickets
              </Link>
            ) : (
              <>
                <div className="flex-1">
                  <CallBoxOfficeBtn />
                </div>
                <button
                  type="button"
                  aria-label={`View details for ${concert.name}`}
                  className="px-6 py-3.5 bg-charcoalgray hover:bg-charcoalgray/70 text-white font-changa uppercase tracking-wider text-sm border-l-2 border-blaze flex items-center justify-center gap-2 transition-colors duration-300 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation()
                    push(`/concerts/${concert.id}`)
                    sendEnrichedGAEvent('concert_card_details_button', concert.id, 'Details', 'home_concert_card')
                  }}
                >
                  <Info className="w-4 h-4" aria-hidden="true" />
                  Details
                </button>
              </>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export default HomeConcertCard
