import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useFetchSponsorsQuery } from '@/app/redux/services/sponsorApi'
import { ISponsor } from '@/app/types/model.types'
import Picture from '../common/Picture'

const SponsorCard = ({ sponsor, size = 'medium' }: any) => {
  const sizeClasses: Record<string, string> = {
    large: 'w-80 h-56 p-4',
    medium: 'w-64 h-44 p-3',
    small: 'w-52 h-36 p-3'
  }

  const imageSizes: Record<string, string> = {
    large: 'h-40',
    medium: 'h-32',
    small: 'h-26'
  }

  return (
    <motion.a
      href={sponsor.externalLink}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      className={`group relative bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${sizeClasses[size]}`}
    >
      {/* Main image area - takes up most of the card */}
      <div className={`${imageSizes[size]} w-full bg-gray-50 flex items-center justify-center p-4`}>
        <Picture
          src={sponsor.filePath}
          alt={sponsor.name}
          className="max-h-full max-w-full w-full h-full object-contain"
          priority={false}
        />
      </div>

      {/* Compact name bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/95 to-transparent p-3">
        <h3 className="font-medium text-white text-sm text-center leading-tight truncate">{sponsor.name}</h3>
      </div>

      {/* External link indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-7 h-7 bg-black/80 rounded-full flex items-center justify-center">
          <ExternalLink size={14} className="text-white" />
        </div>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  )
}

const sponsorConfig = [
  { level: 'season', title: 'Media Season Sponsors', size: 'large' },
  { level: 'concert', title: 'Media Concert Sponsors', size: 'large' },
  { level: 'guest-artist', title: 'Media Guest Artist Sponsors', size: 'medium' },
  { level: 'principal', title: 'Media Principal Sponsors', size: 'medium' },
  { level: 'associate', title: 'Media Associate Sponsors', size: 'small' },
  { level: 'sustaining', title: 'Media Sustaining Sponsors', size: 'small' }
]

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

  return (
    <section className="py-20 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Our Sponsors</h2>
          <p className="text-gray-400">Thank you to our generous sponsors who support our mission</p>
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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-12 text-center">
          <div className="inline-flex items-center bg-neutral-900 rounded-lg px-6 py-3 border border-gray-700">
            <span className="text-2xl font-bold text-white mr-2">{sortedSponsors?.length}</span>
            <span className="text-gray-400">Sponsors</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SponsorsBlock
