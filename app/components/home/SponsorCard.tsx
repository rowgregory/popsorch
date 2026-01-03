import { sendGAEvent } from '@next/third-parties/google'
import { motion } from 'framer-motion'
import Picture from '../common/Picture'
import { ExternalLink } from 'lucide-react'

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
      onClick={() => {
        sendGAEvent('event', 'outbound_link', {
          link_type: 'sponsor',
          sponsor_name: sponsor.name,
          sponsor_tier: size,
          link_url: sponsor.externalLink,
          link_text: sponsor.name
        })
      }}
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

export default SponsorCard
