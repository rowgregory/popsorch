import React, { useEffect, useState } from 'react'
import OrchMapDark from '../OrchMapDark'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import OrchMapLight from '../OrchMapLight'

const venues = {
  venice: {
    long: 27.0948665,
    lat: -82.4445244,
    address: '1 Indian Avenue, Venice FL 34285'
  },
  riverview: { long: 27.2825, lat: -82.5189, address: '1 Ram Way, Sarasota FL 34231' },
  scf: { long: 27.4370187, lat: -82.5957541, address: '5840 26th St W, Bradenton FL 34207' }
}

const getMap = (isDarkMode: boolean, coordinates: { lat: number; long: number; address: string }) => {
  return (
    <>
      {isDarkMode ? (
        <OrchMapDark latitude={coordinates?.long} longitude={coordinates?.lat} address={coordinates.address} />
      ) : (
        <OrchMapLight latitude={coordinates?.long} longitude={coordinates?.lat} address={coordinates.address} />
      )}
    </>
  )
}

const DirectionsBlock = () => {
  const [coordinates, setCoorinates] = useState<{ long: number; lat: number; address: string }>(venues.venice)
  const [isDarkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Initial check
    setDarkMode(mediaQuery.matches)

    // Listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.onchange = handleChange // Fallback for older browsers
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.onchange = null
      }
    }
  }, [])

  return (
    <div className="px-4 py-14 md:px-12 md:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 mx-auto w-full grid grid-cols-12 gap-y-16 md:gap-x-8 items-center relative">
        <div className="hidden 576:block col-span-12 990:col-span-6 relative aspect-square h-full w-full">
          {getMap(isDarkMode, coordinates)}
        </div>
        <div className="col-span-12 990:col-span-6">
          <div className="flex flex-col gap-y-10">
            <div className="text-[47px] 430:text-[60px] text-gunmetal dark:text-white font-bold mt-1">Get Directions to Our Venues</div>
            <span className="cursor-pointer" onClick={() => setCoorinates(venues.venice)}>
              <AnimatedSectionHeader title="Venice Performing Arts Cener" isActive={coordinates.address === venues.venice.address} />
            </span>
            <span className="cursor-pointer" onClick={() => setCoorinates(venues.riverview)}>
              <AnimatedSectionHeader title="Riverview Performing Arts Center" isActive={coordinates.address === venues.riverview.address} />
            </span>
            <span className="cursor-pointer" onClick={() => setCoorinates(venues.scf)}>
              <AnimatedSectionHeader title="SCF Neel Performing Arts Center" isActive={coordinates.address === venues.scf.address} />
            </span>
            <div className="block 576:hidden col-span-12 990:col-span-6 relative aspect-square h-full w-full">
              {getMap(isDarkMode, coordinates)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectionsBlock
