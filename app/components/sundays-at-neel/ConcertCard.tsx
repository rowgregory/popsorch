import { MapPin, Ticket, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Picture from '../common/Picture'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const ConcertCard = ({ concert }: { concert: any }) => (
  <motion.div variants={cardVariants} whileHover={{ y: -10, scale: 1.02 }} className="group cursor-pointer h-full">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blaze transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Picture
          priority={false}
          src={concert.imageUrl}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              concert.isOnSale ? 'bg-lime-500 text-white' : 'bg-blaze text-white'
            }`}
          >
            {concert.isOnSale ? 'On Sale' : 'Sold Out'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="text-white">
            <div className="text-2xl font-bold">{concert.cardDate}</div>
            <div className="text-sm text-gray-300">{concert.eventDetails[0]?.time}</div>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blaze transition-colors">{concert.name}</h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{concert.description}</p>

        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-blaze" />
            <span>{concert.eventDetails[0]?.location.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Users className="w-4 h-4 text-blaze" />
            <span>{concert.eventDetails[0]?.city}</span>
          </div>
        </div>

        {/* Dynamic Pricing Display */}
        <div className="bg-black/30 rounded-lg p-3 mb-4 border border-white/10 flex-shrink-0">
          <div className="text-xs text-gray-400 mb-1">Pricing Options:</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-white">Single ticket:</span>
              <span className="text-white font-semibold">$35</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blaze">With 1 other concert:</span>
              <span className="text-blaze font-semibold">
                $30 <span className="text-lime-400">(-$5)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sunburst">All 3 concerts:</span>
              <span className="text-sunburst font-semibold">
                $25 <span className="text-lime-400">(-$10)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white">
            <div className="text-lg font-bold">
              From <span className="text-sunburst">$25</span>
            </div>
            <div className="text-xs text-gray-400">when buying all 3</div>
          </div>
          <motion.a
            href={concert.allSeriesExternalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blaze to-sunburst text-white px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Ticket className="w-4 h-4" />
            Buy Tickets
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
)

export default ConcertCard
