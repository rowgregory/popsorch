import { MapPin, Ticket, Users } from 'lucide-react'
import Picture from '../common/Picture'
import MotionLink from '../common/MotionLink'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { sendGAEvent } from '@next/third-parties/google'

const ConcertCard = ({ concert }: { concert: any }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleDescriptionToggle = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the link navigation
    e.stopPropagation() // Stop event bubbling
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <MotionLink
      href={concert.allSeriesExternalLink}
      onClick={() => {
        sendGAEvent('event', 'sundays_at_neel_buy_tickets_button', {
          link_text: 'Sqysh',
          link_url: concert.allSeriesExternalLink,
          link_type: 'external',
          lead_source: 'the_pops_orchestra',
          click_location: 'Sundays@Neel',
          source_page: window.location.pathname
        })
      }}
      target="_blank"
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer h-full"
    >
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blaze transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Picture
            priority={false}
            src={concert.imageUrl}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                concert.isOnSale ? 'bg-lime-500 text-white' : 'bg-blaze text-white'
              }`}
            >
              {concert.isOnSale ? 'On Sale' : 'Sold Out'}
            </span>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="text-white">
              <div className="text-2xl font-bold">{concert.cardDate}</div>
              <div className="text-sm text-gray-300">{concert.eventDetails[0]?.time}</div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blaze transition-colors">{concert.name}</h3>

          {/* Expandable Description */}
          <div className="mb-4">
            <div
              className={`text-gray-400 text-sm transition-all duration-300 overflow-hidden ${
                isDescriptionExpanded ? '' : 'line-clamp-2'
              }`}
            >
              {concert.description}
            </div>

            {concert.description && concert.description.length > 100 && (
              <button
                onClick={handleDescriptionToggle}
                className="mt-2 flex items-center gap-1 text-blaze hover:text-sunburst text-sm font-medium transition-colors"
              >
                {isDescriptionExpanded ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Read More</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-2 mb-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4 text-blaze" />
              <span>{concert.eventDetails[0]?.location.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Users className="w-4 h-4 text-blaze" />
              <span>{concert.eventDetails[0]?.city}</span>
            </div>
          </div>

          {/* Dynamic Pricing Display */}
          <div className="bg-black/30 rounded-lg p-3 mb-4 border border-white/10 flex-shrink-0">
            <div className="text-xs text-gray-400 mb-1">Pricing Options:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-white">Single ticket:</span>
                <span className="text-white font-semibold">$35</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blaze">With 1 other concert:</span>
                <span className="text-blaze font-semibold">
                  $30 <span className="text-lime-400">(-$5)</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sunburst">All 3 concerts:</span>
                <span className="text-sunburst font-semibold">
                  $25 <span className="text-lime-400">(-$10)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="text-lg font-bold">
                From <span className="text-sunburst">$25</span>
              </div>
              <div className="text-xs text-gray-400">when buying all 3</div>
            </div>
            <div className="bg-gradient-to-r from-blaze to-sunburst text-white px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Buy Tickets
            </div>
          </div>
        </div>
      </div>
    </MotionLink>
  )
}

export default ConcertCard
