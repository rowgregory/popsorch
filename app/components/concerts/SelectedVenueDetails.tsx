import { IConcertEventDetails } from '@/app/types/entities/concert'
import { sendGAEvent } from '@next/third-parties/google'
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react'
import React, { FC } from 'react'

const SelectedVenueDetails: FC<{ selectedEventDetails: IConcertEventDetails }> = ({ selectedEventDetails }) => {
  const getGoogleMapsUrl = () => {
    if (!selectedEventDetails?.location) return '#'
    const { latitude, longitude } = selectedEventDetails.location
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-black rounded-xl p-8 border-2 border-blaze/30">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Venue Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blaze/10 rounded-lg border border-blaze/30">
              <MapPin className="w-6 h-6 text-blaze" />
            </div>
            <div>
              <p className="text-xs text-sunburst uppercase tracking-wider font-semibold">Selected Performance</p>
              <h3 className="text-2xl font-bold text-white">{selectedEventDetails.location.name}</h3>
            </div>
          </div>

          <p className="text-neutral-300 text-lg mb-6">{selectedEventDetails.location.address}</p>

          {/* Event Date & Time */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-sunburst/30">
              <Calendar className="w-4 h-4 text-sunburst" />
              <span className="text-white font-medium text-sm">
                {new Date(selectedEventDetails.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-sunburst/30">
              <Clock className="w-4 h-4 text-sunburst" />
              <span className="text-white font-medium text-sm">{selectedEventDetails.time}</span>
            </div>
          </div>
        </div>

        {/* Get Directions Button */}
        <div className="flex-shrink-0">
          <a
            href={getGoogleMapsUrl()}
            onClick={() => {
              sendGAEvent('event', 'get_directions', {
                value: 'get_google_maps_directions',
                url: `https://www.google.com/maps/search/?api=1&query=${selectedEventDetails.location.latitude},${selectedEventDetails.location.longitude}`,
                location_name: selectedEventDetails.location.name,
                address: selectedEventDetails.location.address,
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
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze rounded-lg transition-all shadow-lg hover:shadow-blaze/50 hover:scale-105"
          >
            <Navigation className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
            <div className="text-left">
              <p className="text-white font-bold text-lg">Get Directions</p>
              <p className="text-white/90 text-xs">Open in Google Maps</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SelectedVenueDetails
