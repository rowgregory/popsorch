import HomeConcertCard from './HomeConcertCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { IConcert } from '@/app/types/entities/concert'
import { fadeInUp } from '@/app/lib/constants/motion'
import { motion } from 'framer-motion'

const ConcertsBlock = ({ pageData, concerts }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null // or return a fallback UI
  }

  const concertData = pageData?.filter((page) => page?.id?.includes('concerts'))

  const concert = concertData.reduce((acc, field) => {
    const key = field.id.replace('concerts_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <section aria-labelledby="concerts-heading" className="px-4 pt-32.5 pb-40">
      <div className="mx-auto max-w-300 w-full flex flex-col items-center">
        <motion.div variants={fadeInUp} className="mb-12 w-full flex justify-center items-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-white font-bold text-xs uppercase tracking-widest text-center">
              {concert?.heading}
            </span>
          </div>
        </motion.div>

        <h2
          id="concerts-heading"
          className="text-center text-5xl sm:text-6xl font-changa text-white mb-20 max-w-3xl leading-tight"
        >
          {concert?.subheading}
        </h2>

        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 relative w-full mb-10">
          <ul role="list" className="grid grid-cols-1 1200:grid-cols-2 gap-4">
            {concerts?.map((concert: IConcert, index: number) => (
              <HomeConcertCard key={concert.id} concert={concert} index={index} />
            ))}
          </ul>
        </div>

        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={concert?.btnHref || '/concerts'}
            aria-label={`${concert?.btnText} — view all upcoming concerts`}
            className="rounded-md mt-8 px-8 py-4 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm transition-colors duration-300 inline-flex items-center gap-2"
          >
            <span>{concert?.btnText}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ConcertsBlock
