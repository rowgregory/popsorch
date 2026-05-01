import { motion } from 'framer-motion'

export function SeasonDates() {
  const dates = [
    { date: 'May 13', label: 'Season Renewals' },
    { date: 'June 22', label: 'New Season Subscriptions' },
    { date: 'August 3', label: 'Individual & Flex Packages' }
  ]

  return (
    <section aria-labelledby="season-dates-heading" className="px-4 py-16 990:py-24 bg-black border-t border-white/10">
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-12">
          <p className="font-changa text-[9px] uppercase tracking-[0.35em] text-blaze mb-3">The Pops Orchestra</p>
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="w-8 430:w-12 h-px bg-blaze shrink-0" aria-hidden="true" />
            <h2 className="text-3xl 430:text-4xl sm:text-5xl font-changa text-white leading-none">
              26–27 Season Dates
            </h2>
            <div className="w-8 430:w-12 h-px bg-blaze shrink-0" aria-hidden="true" />
          </div>
          <p className="font-lato text-sm text-white/40 max-w-sm leading-relaxed">
            Mark your calendar — here&apos;s when tickets become available for the upcoming season.
          </p>
        </div>

        {/* Date rows */}
        <div className="flex flex-col divide-y divide-white/10">
          {dates.map(({ date, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-6 py-6 group"
            >
              <div className="flex items-center gap-6 min-w-0">
                <span className="font-changa text-blaze text-sm uppercase tracking-[0.2em] shrink-0 w-24">{date}</span>
                <div className="w-px h-5 bg-white/10 shrink-0" aria-hidden="true" />
                <h3 className="font-changa text-2xl 430:text-3xl text-white leading-none truncate">{label}</h3>
              </div>
              <div className="w-6 h-px bg-white/10 group-hover:w-12 group-hover:bg-blaze transition-all duration-300 shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
