'use client'

import { useState } from 'react'
import { Music } from 'lucide-react'
import ConcertDetailsEventLocator from '@/app/components/concerts/ConcertDetailsEventLocator'
import { IConcertEventDetails, IConcertEventDetailsClient } from '@/app/types/entities/concert'
import SelectedVenueDetails from '@/app/components/concerts/SelectedVenueDetails'

export default function ConcertDetailsClient({ concert, initialEventDetails }: IConcertEventDetailsClient) {
  const [selectedEventDetails, setSelectedEventDetails] = useState<IConcertEventDetails | null>(initialEventDetails)

  if (!concert.eventDetails || concert.eventDetails.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
        <p className="text-neutral-400 text-lg">No event dates available at this time</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Performance List */}
      <div className="space-y-2">
        {concert.eventDetails.map((eventDetail, index) => (
          <ConcertDetailsEventLocator
            key={index}
            setSelectedEventDetails={setSelectedEventDetails}
            eventDetail={eventDetail}
            selectedEventDetails={selectedEventDetails}
            concert={concert}
          />
        ))}
      </div>

      {/* Selected Venue Details */}
      {selectedEventDetails?.location && <SelectedVenueDetails selectedEventDetails={selectedEventDetails} />}
    </div>
  )
}
