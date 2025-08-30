import { motion } from 'framer-motion'
import { TrendingDown } from 'lucide-react'

interface IPricingTier {
  price: number
  label: string
  savings?: number
}

const PRICING_TIERS: Record<string, IPricingTier> = {
  single: { price: 35, label: 'Single Concert' },
  double: { price: 30, label: 'Any 2 Concerts', savings: 10 },
  triple: { price: 25, label: 'All 3 Concerts', savings: 30 }
}

// Components
const PricingBanner = () => (
  <motion.div
    className="bg-gradient-to-r from-blaze/20 to-sunburst/20 border border-blaze/30 rounded-xl p-6 mb-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <TrendingDown className="w-5 h-5 text-blaze" />
        <span className="text-blaze font-semibold">Volume Discounts Available</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        Tickets starting at <span className="text-sunburst">$25</span>
      </h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        {Object.entries(PRICING_TIERS).map(([key, tier]) => (
          <div key={key} className="bg-black/30 rounded-lg p-4 border border-white/10">
            <div className="font-semibold text-white">{tier.label}</div>
            <div className="text-xl font-bold text-blaze">${tier.price}</div>
            {tier.savings && <div className="text-lime-400 text-xs">Save ${tier.savings}</div>}
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-4">The more concerts you attend, the more you save!</p>
    </div>
  </motion.div>
)

export default PricingBanner
