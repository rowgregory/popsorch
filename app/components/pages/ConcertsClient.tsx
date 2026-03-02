'use client'

import { IConcert } from '@/app/types/entities/concert'
import Breadcrumb from '../common/Breadcrumb'
import { containerVariants } from '@/app/lib/constants/motion'
import { PublicConcertCard } from '../cards/PublicConcertCard'
import { Music } from 'lucide-react'
import { motion } from 'framer-motion'

export const ConcertsClient = ({ concerts }) => {
  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Concerts" />
      <div className="relative px-4 990:px-12 xl:px-4">
        <div className="relative z-10">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-7xl mx-auto">
            {/* Page Header */}
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">Concerts</h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <div className="w-16 h-px bg-blaze mx-auto mt-2 mb-6" aria-hidden="true" />
              <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed">
                Browse our upcoming season performances and find the perfect night out.
              </p>
            </header>

            {/* Concert List */}
            <section aria-labelledby="concerts-list-heading" className="py-20 pb-32">
              <h2 id="concerts-list-heading" className="sr-only">
                All concerts — {concerts.length} total
              </h2>

              {concerts.length === 0 ? (
                <div role="status" className="text-center py-20">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="p-4 bg-white/5" aria-hidden="true">
                      <Music className="w-8 h-8 text-white/30" aria-hidden="true" />
                    </div>
                    <h3 className="font-changa text-lg text-white">No concerts scheduled</h3>
                    <p className="font-lato text-sm text-white/50 max-w-sm leading-relaxed">
                      Check back soon for upcoming performances.
                    </p>
                  </div>
                </div>
              ) : (
                <motion.ul
                  role="list"
                  aria-label="Concert listings"
                  className="flex flex-col gap-6 430:gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {concerts.map((concert: IConcert, index: number) => (
                    <li key={concert.id ?? index}>
                      <PublicConcertCard concert={concert} index={index} />
                    </li>
                  ))}
                </motion.ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
