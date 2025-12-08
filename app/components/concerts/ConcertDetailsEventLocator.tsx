import { FC } from 'react'
import { Calendar, ChevronRight, Clock, MapPin } from 'lucide-react'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { formatDate } from '@/app/lib/utils/dateUtils'
import { sendGAEvent } from '@next/third-parties/google'
import { IConcertDetailsEventLocator } from '@/app/types/entities/concert'

const PublicConcertDetailsEventLocator: FC<IConcertDetailsEventLocator> = ({
  setSelectedEventDetails,
  eventDetail,
  selectedEventDetails,
  concert
}) => {
  const isSelected = selectedEventDetails?.location?.name === eventDetail?.location?.name

  return (
    <div
      onClick={() => setSelectedEventDetails(eventDetail)}
      className={`
        group  transition-all duration-300 border-l-4 pl-6 py-4 relative
        ${isSelected ? 'border-l-blaze bg-blaze/5' : 'border-l-transparent hover:border-l-sunburst hover:bg-sunburst/5'}
      `}
    >
      {/* Date & Time */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Calendar className={`w-5 h-5 ${isSelected ? 'text-blaze' : 'text-neutral-400 group-hover:text-sunburst'}`} />
          <span className="text-white font-semibold">{formatDate(eventDetail.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${isSelected ? 'text-blaze' : 'text-neutral-400 group-hover:text-sunburst'}`} />
          <span className="text-white font-medium">{eventDetail.time}</span>
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-start gap-2 mb-4">
        <MapPin
          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            isSelected ? 'text-blaze' : 'text-neutral-400 group-hover:text-sunburst'
          }`}
        />
        <div>
          <p className="text-white font-medium">{eventDetail.location.name}</p>
          <p className="text-sm text-neutral-400">{eventDetail.location.address}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4">
        {concert.isOnSale ? (
          <a
            href={eventDetail.externalLink || '#'}
            onClick={() =>
              sendGAEvent('concert', 'ticket_link_click', {
                concert_id: concert.id,
                concert_name: concert.name,
                concert_type: concert.type,
                externalLink_url: eventDetail.externalLink,
                source_page: 'concert_details',
                user_scroll_depth: Math.round(
                  (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                ),
                time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
                referrer: document.referrer || 'direct',
                viewport_width: window.innerWidth,
                viewport_height: window.innerHeight,
                device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
                timestamp: new Date().toISOString()
              })
            }
            target="_blank"
            className={`group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all duration-300  shadow-lg hover:shadow-blaze/50 hover:scale-105`}
          >
            <span>Buy Tickets</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <CallBoxOfficeBtn />
        )}
      </div>
    </div>
  )
}

export default PublicConcertDetailsEventLocator
