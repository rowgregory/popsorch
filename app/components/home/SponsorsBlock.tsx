import { motion } from 'framer-motion'

const SponsorsBlock = ({ pageData, sponsors }) => {
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

  return (
    <section className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">{pageData?.sponsors?.heading}</h2>
          <p className="text-gray-400">{pageData?.sponsors?.subheading}</p>
        </motion.div>

        <div className="space-y-12">
          {orderedLevels.map((level, index) => {
            const levelSponsors = groupedSponsors[level]
            const sizeClass = getSizeClass(index, orderedLevels.length)

            // Get representative amount for display (highest in the group)
            const maxAmount = Math.max(...levelSponsors.map((s) => parseAmount(s.amount)))
            const displayAmount = maxAmount > 0 ? `$${maxAmount.toLocaleString()}` : null

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white">{level}</h3>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  {levelSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} size={sizeClass} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Updated SponsorCard component with dynamic sizing
const SponsorCard = ({ sponsor, size }) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={`${size} relative bg-white dark:bg-neutral-800 rounded-lg p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
    >
      <img src={sponsor.filePath} alt={sponsor.name} className="w-full h-full object-contain" />
    </motion.div>
  )

  // If sponsor has external link, wrap in anchor tag
  if (sponsor.externalLink) {
    return (
      <a href={sponsor.externalLink} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

export default SponsorsBlock
