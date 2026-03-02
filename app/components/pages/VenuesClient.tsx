'use client'

import { Fragment, useState } from 'react'
import Picture from '@/app/components/common/Picture'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import RiverviewPACFirstFloorSVG from '@/app/components/svg/RiverviewPACFirstFloorSVG'
import SCFNeelPACSVG from '@/app/components/svg/SCFNeelPACSVG'
import SCFNeel2ndHalf from '@/app/components/svg/SCFNeel2ndHalf'
import RiverviewBalconySVG from '@/app/components/svg/RiverviewBalconySVG'
import OrchMapLight from '@/app/components/OrchMapLight'
import ManateeHSSVG from '@/app/components/svg/ManateeHSSVG'
import { motion, AnimatePresence } from 'framer-motion'
import { IVenue } from '@/app/types/entities/venue'

interface SVGProps {
  visible: boolean
  seat: string | null
  price: string | null
  level: string | null
}

const SVG_INITIAL_STATE: SVGProps = {
  visible: true,
  seat: '',
  price: '',
  level: ''
}

const seatInfoVariants: any = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export const VenuesClient = ({ venues }) => {
  const [neel, setNeel] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [neel2, setNeel2] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [riverview, setRiverview] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [riverview2, setRiverview2] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [manatee, setManatee] = useState<SVGProps>(SVG_INITIAL_STATE)

  const renderVenueDetails = (venue: IVenue) => (
    <dl className="grid grid-cols-2 gap-y-4 border-y border-white/10 py-6 font-lato text-sm">
      {[
        { label: 'Accessibility', value: venue.accessibility },
        { label: 'Immersive Environment', value: venue.immersiveEnvironment },
        { label: 'Parking', value: venue.parking },
        { label: 'Address', value: venue.address }
      ].map(({ label, value }, i) => (
        <Fragment key={i}>
          <dt className="font-changa text-xs uppercase tracking-[0.2em] text-white/40 text-right pr-4 border-r border-white/10 flex items-center justify-end">
            {label}
          </dt>
          <dd className="font-lato text-sm text-white/70 pl-4 flex items-center">{value}</dd>
        </Fragment>
      ))}
    </dl>
  )

  const renderSeatInfo = (seatData: SVGProps) => (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex items-center justify-center"
        variants={seatInfoVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        key={`${seatData.seat}-${seatData.level}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Selected seat: Level ${seatData.level}, Seat ${seatData.seat}${seatData.price ? `, Price ${seatData.price}` : ''}`}
      >
        <dl className="grid grid-cols-2 gap-y-4 py-3 border-y border-white/10 text-sm w-full">
          {[
            { label: 'Level', value: seatData.level },
            { label: 'Seat', value: seatData.seat },
            { label: 'Price', value: seatData.price }
          ]
            .filter((item) => item.value)
            .map(({ label, value }, i) => (
              <Fragment key={i}>
                <dt className="font-changa text-xs uppercase tracking-[0.2em] text-white/40 text-right pr-4 border-r border-white/10 flex items-center justify-end">
                  {label}
                </dt>
                <dd className="font-lato text-sm text-white/70 pl-4 flex items-center">{value}</dd>
              </Fragment>
            ))}
        </dl>
      </motion.div>
    </AnimatePresence>
  )

  const renderSeatMap = (venueId: string) => {
    const seatMapContainer = 'overflow-x-auto w-full mb-8'
    const seatMapInner = 'min-w-[800px] w-full'

    switch (venueId) {
      case 'riverview':
        return (
          <>
            <section aria-labelledby="riverview-floor-heading">
              <h4
                id="riverview-floor-heading"
                className="font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-6 text-center"
              >
                First Floor
              </h4>
              <div className={seatMapContainer}>
                <div className={seatMapInner}>
                  <RiverviewPACFirstFloorSVG setRiverview={setRiverview} />
                </div>
              </div>
              {renderSeatInfo(riverview)}
            </section>

            <section aria-labelledby="riverview-balcony-heading" className="mt-12">
              <h4
                id="riverview-balcony-heading"
                className="font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-6 text-center"
              >
                Balcony
              </h4>
              <div className={`${seatMapContainer} mt-4`}>
                <div className={seatMapInner}>
                  <RiverviewBalconySVG setRiverviewBalcony={setRiverview2} />
                </div>
              </div>
              <div className="mt-7 mb-28">{renderSeatInfo(riverview2)}</div>
            </section>
          </>
        )

      case 'scf-neel':
        return (
          <>
            <section aria-labelledby="neel-first-heading">
              <h4
                id="neel-first-heading"
                className="font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-6 text-center"
              >
                First Half
              </h4>
              <div className={seatMapContainer}>
                <div className={seatMapInner}>
                  <SCFNeelPACSVG setNeel={setNeel} />
                </div>
              </div>
              {renderSeatInfo(neel)}
            </section>

            <section aria-labelledby="neel-second-heading" className="mt-12">
              <h4
                id="neel-second-heading"
                className="font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-6 text-center"
              >
                Second Half
              </h4>
              <div className={`${seatMapContainer} mt-6`}>
                <div className={seatMapInner}>
                  <SCFNeel2ndHalf setNeel2ndHalf={setNeel2} />
                </div>
              </div>
              <div className="mt-7">{renderSeatInfo(neel2)}</div>
            </section>
          </>
        )

      case 'manatee':
        return (
          <section aria-labelledby="manatee-heading">
            <h4
              id="manatee-heading"
              className="font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-6 text-center"
            >
              Manatee High School Seat Map
            </h4>
            <div className={seatMapContainer}>
              <div className={seatMapInner}>
                <ManateeHSSVG setManatee={setManatee} />
              </div>
            </div>
            {renderSeatInfo(manatee)}
          </section>
        )

      default:
        return null
    }
  }

  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Venues" />

      <div className="relative bg-black">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')`, backgroundAttachment: 'fixed' }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 990:px-12 xl:px-4">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-7xl mx-auto">
            {/* Page Header */}
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">Venues</h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <div className="w-16 h-px bg-blaze mx-auto mt-2" aria-hidden="true" />
            </header>

            {/* Venue list */}
            <ul
              role="list"
              aria-label="Performance venues"
              className="flex flex-col gap-px bg-white/10 my-20 990:my-32"
            >
              {venues.map((venue: IVenue, index: number) => {
                const getVenueId = (venueName: string): string => {
                  if (venueName === 'Riverview Performing Arts Center') return 'riverview'
                  if (venueName === 'SCF Neel Performing Arts Center') return 'scf-neel'
                  if (venueName === 'Manatee High School Davis Performing Arts Center') return 'manatee'
                  return ''
                }
                const venueId = getVenueId(venue.name)

                return (
                  <li key={venue.id} className="bg-black">
                    <article aria-labelledby={`venue-heading-${venue.id}`}>
                      {/* Image */}
                      <div className="overflow-hidden">
                        <Picture
                          src={venue.imageUrl}
                          alt={`${venue.name} performance hall`}
                          className="w-full h-auto object-cover max-h-157.5"
                          priority={index === 0}
                        />
                      </div>

                      {/* Content */}
                      <div className="px-6 430:px-8 990:px-14 pt-10 pb-16">
                        {/* Venue header */}
                        <div className="flex flex-col items-center text-center mb-8">
                          <span className="inline-flex items-center gap-1.5 font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-3">
                            <div className="w-3 h-px bg-blaze" aria-hidden="true" />
                            {venue.capacity} seats
                          </span>
                          <h2
                            id={`venue-heading-${venue.id}`}
                            className="font-changa text-2xl 430:text-3xl 990:text-4xl text-white leading-tight mb-4"
                          >
                            {venue.name}
                          </h2>
                          <div className="w-12 h-px bg-blaze" aria-hidden="true" />
                        </div>

                        {/* Venue details */}
                        {renderVenueDetails(venue)}

                        {/* Map */}
                        <div
                          className="relative h-100 my-10 border border-white/10"
                          role="region"
                          aria-label={`Map showing location of ${venue.name}`}
                        >
                          <OrchMapLight
                            latitude={Number(venue.latitude)}
                            longitude={Number(venue.longitude)}
                            address={venue.address}
                          />
                        </div>

                        <div className="w-full h-px bg-white/10 my-8" aria-hidden="true" />

                        {/* Seat map */}
                        {venueId && (
                          <section aria-labelledby={`seatmap-heading-${venue.id}`}>
                            <div className="flex items-center gap-3 mb-8">
                              <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                              <h3
                                id={`seatmap-heading-${venue.id}`}
                                className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                              >
                                Seating Chart
                              </h3>
                            </div>
                            {renderSeatMap(venueId)}
                          </section>
                        )}
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
