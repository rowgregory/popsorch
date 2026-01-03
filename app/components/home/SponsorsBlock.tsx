import { motion } from 'framer-motion'
import SponsorCard from './SponsorCard'
import { sponsorConfig } from '@/app/lib/constants/home'

const SponsorsBlock = ({ pageData, sponsors }) => {
  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => {
        const amountA = parseInt(a.amount.replace('$', ''))
        const amountB = parseInt(b.amount.replace('$', ''))
        return amountB - amountA
      })
    : []

  return (
    <section className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">{pageData?.sponsors?.heading}</h2>
          <p className="text-gray-400">{pageData?.sponsors?.subheading}</p>
        </motion.div>

        <div className="space-y-12">
          {sponsorConfig.map(({ level, title, size }) => {
            const levelSponsors = sortedSponsors?.filter((s) => s.level === level) || []
            if (levelSponsors.length === 0) return null

            return (
              <div key={level}>
                <h3 className="text-xl font-semibold text-white mb-6 text-center">{title}</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {levelSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} size={size} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SponsorsBlock
