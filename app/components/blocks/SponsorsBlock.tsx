import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useFetchSponsorsQuery } from '@/app/redux/services/sponsorApi'
import { ISponsor } from '@/app/types/model.types'

const SponsorsBlock = () => {
  const { data } = useFetchSponsorsQuery({}) as { data: { sponsors: ISponsor[] } }
  const sponsors = data?.sponsors

  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => {
        const amountA = parseInt(a.amount.replace('$', ''))
        const amountB = parseInt(b.amount.replace('$', ''))
        return amountB - amountA
      })
    : []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  const formatAmount = (amount: string) => {
    const num = parseInt(amount.replace('$', ''))
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(num)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Our Sponsors</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Thank you to our generous sponsors who support our mission</p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Season Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'season').length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-[#da0032] mb-4 text-center">Season Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {sortedSponsors
                  .filter((s) => s.level === 'season')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 10px 25px rgba(218, 0, 50, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-[#da0032] p-6 w-48 h-32 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-12 h-12 text-xl bg-[#da0032] rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-base">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-[#da0032] text-lg">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={16} className="text-[#da0032]" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}

          {/* Concert Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'concert').length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-[#da0032] mb-4 text-center">Concert Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {sortedSponsors
                  .filter((s) => s.level === 'concert')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 10px 25px rgba(218, 0, 50, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-[#da0032] p-6 w-48 h-32 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-12 h-12 text-xl bg-[#da0032] rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-base">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-[#da0032] text-lg">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={16} className="text-[#da0032]" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}

          {/* Guest Artist Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'guest-artist').length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-[#ff9000] mb-4 text-center">Guest Artist Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {sortedSponsors
                  .filter((s) => s.level === 'guest-artist')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 15px rgba(255, 144, 0, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-[#ff9000] p-4 w-40 h-28 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-10 h-10 text-lg bg-[#ff9000] rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-sm">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-[#ff9000] text-sm">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={12} className="text-[#ff9000]" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}

          {/* Principal Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'principal').length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-sunburst mb-4 text-center">Principal Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {sortedSponsors
                  .filter((s) => s.level === 'principal')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 15px rgba(255, 144, 0, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-sunburst p-3 w-32 h-24 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-8 h-8 text-sm bg-sunburst rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-xs">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-sunburst text-xs">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={12} className="text-sunburst" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}

          {/* Associate Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'associate').length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4 text-center">Associate Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {sortedSponsors
                  .filter((s) => s.level === 'associate')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 15px rgba(255, 144, 0, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-gray-600 p-3 w-32 h-24 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-8 h-8 text-sm bg-gray-600 rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-xs">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-gray-400 text-xs">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={12} className="text-gray-400" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}

          {/* Sustaining Sponsors */}
          {sortedSponsors?.filter((s) => s.level === 'sustaining').length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4 text-center">Sustaining Sponsors</h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {sortedSponsors
                  .filter((s) => s.level === 'sustaining')
                  .map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 15px rgba(255, 144, 0, 0.3)'
                      }}
                      className="relative bg-neutral-900 rounded-lg border-2 border-gray-600 p-3 w-32 h-24 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-8 h-8 text-sm bg-gray-600 rounded-lg flex items-center justify-center font-bold text-white mb-2">
                          {sponsor.name.charAt(0)}
                        </div>

                        <div className="text-center">
                          <h3 className="font-semibold text-white leading-tight text-xs">
                            {sponsor.name.length > 18 ? sponsor.name.substring(0, 18) + '...' : sponsor.name}
                          </h3>

                          <div className="font-bold mt-1 text-gray-400 text-xs">{formatAmount(sponsor.amount)}</div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2">
                        <ExternalLink size={12} className="text-gray-400" />
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-neutral-900 rounded-lg px-8 py-4 border border-gray-700">
            <div>
              <div className="text-2xl font-bold text-[#da0032] mb-1">{sortedSponsors?.length}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Sponsor{sortedSponsors?.length !== 1 && 's'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SponsorsBlock
