'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { RootState, useAppSelector } from '../redux/store'
import ConcertCard from '../components/concerts/ConcertCard'
import Breadcrumb from '../components/common/Breadcrumb'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { containerVariants } from '../lib/constants/motion'
import { useSearchTracking } from '../hooks/useSeachTracking'
import { sendGAEvent } from '@next/third-parties/google'
import { IConcert } from '../types/entities/concert'
import SearchSidebar from '../components/concerts/SearchSidebar'

const Concerts = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const [filterText, setFilterText] = useState('')
  const previousQueryRef = useRef('')

  const filteredConcerts = useMemo(() => {
    const lowerText = filterText.toLowerCase()
    return concerts.filter((concert: IConcert) => concert.name.toLowerCase().includes(lowerText))
  }, [filterText, concerts])

  useSearchTracking(filterText, filteredConcerts?.length || 0)

  useEffect(() => {
    // Track when search is cleared
    if (filterText === '' && previousQueryRef.current !== '') {
      sendGAEvent('concert', 'search_cleared', {
        search_location: 'concerts_list_page',
        previous_term: previousQueryRef.current
      })
    }

    // Update the ref with current value
    previousQueryRef.current = filterText
  }, [filterText])

  return (
    <>
      <Breadcrumb breadcrumb="Concerts" />
      <section className="relative px-4 md:px-8 lg:px-12 xl:px-4 min-h-screen">
        <div className="mx-auto w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 py-20 md:py-32">
            {/* Main Content Area */}
            <motion.div
              className="order-1 col-span-1 xl:col-span-8 2xl:col-span-9"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <AnimatePresence mode="wait">
                {filteredConcerts.length === 0 ? (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-20"
                  >
                    <div className="inline-flex flex-col items-center gap-4">
                      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No concerts found</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                        Try adjusting your search terms or check back later for new concerts
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="results" className="space-y-4 md:space-y-6" variants={containerVariants}>
                    {filteredConcerts.map((concert: IConcert, index: number) => (
                      <ConcertCard key={index} concert={concert} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Search Sidebar */}
            <SearchSidebar
              concerts={concerts}
              filterText={filterText}
              filteredConcerts={filteredConcerts}
              setFilterText={setFilterText}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Concerts
