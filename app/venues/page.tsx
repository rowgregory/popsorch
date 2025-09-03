'use client'

import React, { useState } from 'react'
import Picture from '@/app/components/common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchVenuesQuery } from '@/app/redux/services/venueApi'
import Spinner from '@/app/components/common/Spinner'
import Breadcrumb from '../components/common/Breadcrumb'
import { VenueProps } from '../types/model.types'
import RiverviewPACFirstFloorSVG from '../components/svg/RiverviewPACFirstFloorSVG'
import SCFNeelPACSVG from '../components/svg/SCFNeelPACSVG'
import SCFNeel2ndHalf from '../components/svg/SCFNeel2ndHalf'
import RiverviewBalconySVG from '../components/svg/RiverviewBalconySVG'
import OrchMapLight from '../components/OrchMapLight'
import ManateeHSSVG from '../components/svg/ManateeHSSVG'
import { motion, AnimatePresence } from 'framer-motion'

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

const Venues = () => {
  const { isLoading } = useFetchVenuesQuery({})
  const { venues } = useAppSelector((state: RootState) => state.venue)

  const [neel, setNeel] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [neel2, setNeel2] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [riverview, setRiverview] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [riverview2, setRiverview2] = useState<SVGProps>(SVG_INITIAL_STATE)
  const [manatee, setManatee] = useState<SVGProps>(SVG_INITIAL_STATE)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const seatMapVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  }

  const seatInfoVariants = {
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

  const renderVenueDetails = (venue: VenueProps) => (
    <div className="grid grid-cols-2 gap-y-4 border-y border-zinc-700/70 py-6 text-white font-lato text-sm">
      <div className="font-semibold text-right pr-4 border-r border-[#555]">Accessibility</div>
      <div className="pl-4">{venue.accessibility}</div>

      <div className="font-semibold text-right pr-4 border-r border-[#555]">Immersive Environment</div>
      <div className="pl-4">{venue.immersiveEnvironment}</div>

      <div className="font-semibold text-right pr-4 border-r border-[#555]">Parking</div>
      <div className="pl-4">{venue.parking}</div>

      <div className="font-semibold text-right pr-4 border-r border-[#555]">Address</div>
      <div className="pl-4">{venue.address}</div>
    </div>
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
      >
        <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-white font-lato text-sm">
          <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
          <div className="pl-4">{seatData.level}</div>

          <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
          <div className="pl-4">{seatData.seat}</div>

          <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
          <div className="pl-4">{seatData.price && `${seatData.price}`}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )

  const renderSeatMap = (venueId: string) => {
    const seatMapContainer = 'overflow-hidden w-full overflow-x-auto mb-8'
    const seatMapInner = 'min-w-[800px] w-full overflow-x-auto'

    switch (venueId) {
      case 'riverview':
        return (
          <>
            <motion.div className={seatMapContainer} variants={seatMapVariants} initial="hidden" animate="visible">
              <div className={seatMapInner}>
                <div className="flex justify-center flex-col relative">
                  <motion.h1
                    className="text-xl mb-6 text-center font-changa"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    First Floor
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                  >
                    <RiverviewPACFirstFloorSVG setRiverview={setRiverview} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {renderSeatInfo(riverview)}

            <motion.h1
              className="font-changa text-xl text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Balcony
            </motion.h1>
            <motion.div
              className="overflow-hidden w-full overflow-x-auto mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className={seatMapInner}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
                >
                  <RiverviewBalconySVG setRiverviewBalcony={setRiverview2} />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-7 mb-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              {renderSeatInfo(riverview2)}
            </motion.div>
          </>
        )

      case 'scf-neel':
        return (
          <>
            <motion.div className={seatMapContainer} variants={seatMapVariants} initial="hidden" animate="visible">
              <div className={seatMapInner}>
                <div className="flex justify-center flex-col relative">
                  <motion.h1
                    className="text-xl mb-6 text-center font-changa"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    First Half
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                  >
                    <SCFNeelPACSVG setNeel={setNeel} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {renderSeatInfo(neel)}

            <motion.h1
              className="font-changa text-xl text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Second Half
            </motion.h1>
            <motion.div
              className="overflow-hidden w-full overflow-x-auto mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className={seatMapInner}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
                >
                  <SCFNeel2ndHalf setNeel2ndHalf={setNeel2} />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              {renderSeatInfo(neel2)}
            </motion.div>
          </>
        )

      case 'manatee':
        return (
          <>
            <motion.div className={seatMapContainer} variants={seatMapVariants} initial="hidden" animate="visible">
              <motion.h1
                className="text-xl mb-6 text-center font-changa"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Manatee High School Seat Map
              </motion.h1>
              <motion.div
                className="overflow-hidden w-full overflow-x-auto mt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className={seatMapInner}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
                  >
                    <ManateeHSSVG setManatee={setManatee} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {renderSeatInfo(manatee)}
          </>
        )

      default:
        return null
    }
  }

  const getVenueId = (venueName: string): string => {
    if (venueName === 'Riverview Performing Arts Center') return 'riverview'
    if (venueName === 'SCF Neel Performing Arts Center') return 'scf-neel'
    if (venueName === 'Manatee High School Davis Performing Arts Center') return 'manatee'
    return ''
  }

  if (isLoading) {
    return (
      <>
        <Breadcrumb breadcrumb="Venues" />
        <div className="px-4 py-14 md:px-12 990:py-36">
          <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] w-full mx-auto">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Spinner fill="fill-blaze" track="text-inkblack" wAndH="w-10 h-10" />
            </motion.div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Breadcrumb breadcrumb="Venues" />
      <div className="px-4 py-14 md:px-12 990:py-36">
        <motion.div
          className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] w-full mx-auto flex flex-col gap-y-9"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {venues.map((venue: VenueProps, index: number) => {
            const venueId = getVenueId(venue.name)

            return (
              <motion.div
                key={venue.id}
                className="flex flex-col rounded-md overflow-hidden shadow-md bg-inkblack"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: index * 0.1
                  }}
                >
                  <Picture src={venue.imageUrl} className="w-full h-full object-cover max-h-[630px]" priority={true} />
                </motion.div>

                <div className="bg-duskgray px-8 pt-8 pb-12">
                  <motion.p
                    className="text-blaze uppercase font-lato text-center text-[12px] tracking-widest mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    {venue.capacity} seats
                  </motion.p>

                  <motion.h3
                    className="uppercase font-changa text-2xl text-center text-white mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {venue.name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
                    {renderVenueDetails(venue)}
                  </motion.div>

                  <motion.div
                    className="relative h-[400px] my-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.7 }}
                  >
                    <OrchMapLight
                      latitude={Number(venue.latitude)}
                      longitude={Number(venue.longitude)}
                      address={venue.address}
                    />
                  </motion.div>

                  <motion.div
                    className="border-b border-b-zinc-700/70 w-full h-[1px] my-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.7 }}
                  >
                    {venueId && renderSeatMap(venueId)}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}

export default Venues
