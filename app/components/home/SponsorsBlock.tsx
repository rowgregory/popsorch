import { motion } from 'framer-motion'
import Picture from '../common/Picture'

const SponsorCard = ({ sponsor, size }) => {
  const card = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${size} relative bg-white/95 hover:bg-white border border-white/10 hover:border-blaze/30 p-4 430:p-6 flex items-center justify-center transition-colors duration-300 group`}
    >
      <Picture priority={true} src={sponsor.filePath} alt={sponsor.name} className="w-full h-full object-contain" />
      {/* Blaze accent bottom border on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blaze scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />
    </motion.div>
  )

  if (sponsor.externalLink) {
    return (
      <a
        href={sponsor.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${sponsor.name} — visit website (opens in new tab)`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
      >
        {card}
      </a>
    )
  }

  return (
    <div role="img" aria-label={sponsor.name}>
      {card}
    </div>
  )
}
const SponsorsBlock = ({ pageData, sponsors }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null // or return a fallback UI
  }
  // Parse amount and handle different formats ($2,500,000 or 2500000)
  const parseAmount = (amount) => {
    if (!amount || amount === '') return 0
    // Remove $ and commas, then parse
    return parseInt(amount.toString().replace(/[$,]/g, '')) || 0
  }

  // Sort sponsors by amount (highest to lowest)
  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => {
        const amountA = parseAmount(a.amount)
        const amountB = parseAmount(b.amount)
        return amountB - amountA
      })
    : []

  // Group sponsors by level (maintains sorted order)
  const groupedSponsors = sortedSponsors.reduce((acc, sponsor) => {
    const level = sponsor.level || 'Other'
    if (!acc[level]) {
      acc[level] = []
    }
    acc[level].push(sponsor)
    return acc
  }, {})

  // Get unique levels in order of highest amount
  const orderedLevels = Object.keys(groupedSponsors).sort((a, b) => {
    // Get the highest amount in each level group
    const maxAmountA = Math.max(...groupedSponsors[a].map((s) => parseAmount(s.amount)))
    const maxAmountB = Math.max(...groupedSponsors[b].map((s) => parseAmount(s.amount)))
    return maxAmountB - maxAmountA
  })

  // Determine card size based on position in hierarchy
  const getSizeClass = (index, totalLevels) => {
    if (totalLevels === 1) return 'w-48 h-48' // Single level
    if (index === 0) return 'w-56 h-56' // Highest tier - largest
    if (index === 1) return 'w-48 h-48' // Second tier
    if (index === 2) return 'w-40 h-40' // Third tier
    return 'w-32 h-32' // Lower tiers - smallest
  }

  const sponsorData = pageData?.filter((page) => page?.id?.includes('sponsors'))

  const sponsorsData = sponsorData.reduce((acc, field) => {
    const key = field.id.replace('sponsors_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <section
      aria-labelledby="sponsors-heading"
      className="relative py-28 990:py-40 bg-black overflow-hidden px-4 990:px-12 xl:px-4"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-5"
        style={{ backgroundImage: `url('/images/bio-bg.png')`, backgroundAttachment: 'fixed' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" aria-hidden="true" />

      <div className="relative z-10 max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-300 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 430:mb-20"
        >
          <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">Our Partners</p>
          <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
            <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
            <h2
              id="sponsors-heading"
              className="font-changa text-3xl 430:text-4xl 990:text-5xl text-white leading-none"
            >
              {sponsorsData?.heading}
            </h2>
            <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
          </div>
          <div className="w-16 h-px bg-blaze mx-auto mt-2 mb-6" aria-hidden="true" />
          <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed">
            {sponsorsData?.subheading}
          </p>
        </motion.div>

        {/* Sponsor levels */}
        <div className="flex flex-col gap-16 430:gap-20">
          {orderedLevels.map((level, index) => {
            const levelSponsors = groupedSponsors[level]
            const sizeClass = getSizeClass(index, orderedLevels.length)
            const levelId = `sponsor-level-${level.toLowerCase().replace(/\s+/g, '-')}`

            return (
              <motion.section
                key={level}
                aria-labelledby={levelId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Level heading */}
                <div className="flex items-center gap-4 mb-8 430:mb-10">
                  <div className="w-6 h-px bg-blaze shrink-0" aria-hidden="true" />
                  <h3
                    id={levelId}
                    className="font-changa text-xs uppercase tracking-[0.25em] text-blaze whitespace-nowrap"
                  >
                    {level}
                  </h3>
                  <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
                </div>

                <ul
                  role="list"
                  aria-label={`${level} sponsors`}
                  className="flex flex-wrap justify-center gap-4 430:gap-6"
                >
                  {levelSponsors.map((sponsor, i) => (
                    <motion.li
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <SponsorCard sponsor={sponsor} size={sizeClass} />
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SponsorsBlock
