import React from 'react'
import Picture from '@/app/components/common/Picture'
import RiverviewTextSVG from '@/app/components/svg/RiverviewTextSVG'
import SCFNeelTextSVG from '@/app/components/svg/SCFNeelTextSVG'
import VeniceTextSVG from '@/app/components/svg/VeniceTextSVG'
import RedDividerSVG from '@/app/components/svg/RedDividerSVG'

const venuesData = [
  {
    img: '/images/venue-1.jpg',
    capacity: '1090',
    accessibility: 'Every section has handicap accessible seating, with ramp access to nearly every seat',
    ie: 'Sloped flooring and surround-sound acoustic boards.',
    parking: 'Parking is available in the lot directly in front of our theater, adjacent to the Venice High School tennis courts',
    address: '1 Indian Avenue, Venice FL 34285',
    svg: <VeniceTextSVG />
  },
  {
    img: '/images/venue-2.jpg',
    capacity: '1003',
    accessibility: 'ADA-compliant seating options.',
    ie: 'The auditorium offers two-floor seating with an elevator.',
    parking:
      'For Riverview Performing Arts Center parking, consider the Hamilton Street parking lot (next to Hamilton Stage) or the Rahway Parking Garage.',
    address: '1 Ram Way, Sarasota, FL 34231',
    svg: <RiverviewTextSVG />
  },
  {
    img: '/images/venue-3.jpg',
    capacity: '830',
    accessibility: 'Wheelchair accessible seating.',
    ie: 'Eaton Memorial Pipe Organ, a 50-rank, 3-manual instrument built by master craftsman Charles McManis, was rededicated in October 2000.',
    parking: 'Free parking on the day of the event is available in Lot H, which can be accessed from 60th Avenue West.',
    address: '5840 26th St W, Bradenton, FL 34207',
    svg: <SCFNeelTextSVG />
  }
]

const Venues = () => {
  return (
    <div className="px-4 py-14 md:px-12 990:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto flex flex-col gap-y-40">
        {venuesData.map((venue, i) => (
          <div key={i} className="grid grid-cols-12 gap-12">
            <div className="col-span-12">{venue.svg}</div>
            <div className={`col-span-12 990:col-span-6 ${i === 1 ? 'order-2' : 'order-1'}`}>
              <Picture src={venue.img} className="w-full h-full rounded-2xl aspect-square object-cover" priority={false} />
            </div>
            <div className={`col-span-12 990:col-span-6 ${i === 1 ? 'order-1' : 'order-2'}`}>
              <ul className="space-y-10">
                <li>
                  <h3 className="text-xl font-bold mb-2.5">Capacity</h3>
                  <p>{venue.capacity} seats</p>
                </li>
                <li>
                  <h3 className="text-xl font-bold mb-2.5">Accessibility</h3>
                  <p>{venue.accessibility}</p>
                </li>
                <li>
                  <h3 className="text-xl font-bold mb-2.5">Immersive Environment</h3>
                  <p>{venue.ie}</p>
                </li>
                <li>
                  <h3 className="text-xl font-bold mb-2.5">Parking</h3>
                  <p>{venue.parking}</p>
                </li>
              </ul>
            </div>
            <div className={`col-span-12 order-4 ${i === 1 ? '' : ''}`}>
              <RedDividerSVG />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Venues
