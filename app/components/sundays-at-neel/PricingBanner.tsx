import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, ChevronDown } from 'lucide-react'

interface IPricingTier {
  price: number
  label: string
  savings?: number
}

const PRICING_TIERS: Record<string, IPricingTier> = {
  single: { price: 35, label: 'Single Concert' },
  double: { price: 60, label: 'Get your tickets to both remaining shows for only $30 each', savings: 10 }
}

const CONCERT_PACKAGES = [
  { label: 'Essentially Ellington and John Denver', url: 'https://ci.ovationtix.com/35505/store/packages/149086' }
]

const PricingBanner = ({ scrollToSection }: any) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handlePackageSelect = (url: string) => {
    window.open(url, '_blank')
    setShowDropdown(false)
  }

  return (
    <motion.div
      className="relative z-[60] bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Volume Discounts Available</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Tickets starting at <span className="text-orange-400">$35</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => (
            <div key={key} className="relative">
              {key === 'double' ? (
                // Any 2 Concerts Dropdown
                <div className="relative">
                  <div
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="bg-black/40 rounded-lg p-4 border border-white/20 cursor-pointer hover:bg-black/50 transition-colors h-full min-h-[100px] flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="font-semibold text-white mb-1">{tier.label}</div>
                        <div className="text-2xl font-bold text-orange-400 mb-1">${tier.price}</div>
                        {tier.savings && <div className="text-lime-400 text-xs">Save ${tier.savings}</div>}
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-white/70 transition-transform ml-2 ${
                          showDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm border border-white/30 rounded-lg shadow-2xl z-50"
                      >
                        {CONCERT_PACKAGES.map((pkg, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handlePackageSelect(pkg.url)}
                            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-red-500/20 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-white/10 last:border-b-0"
                          >
                            {pkg.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Single Concert
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection()
                  }}
                  className={`bg-black/40 rounded-lg p-4 border border-white/20 h-full min-h-[100px] flex flex-col justify-center text-center ${
                    key === 'single' || key === 'triple' ? 'cursor-pointer hover:bg-black/50 transition-colors' : ''
                  }`}
                >
                  <div className="font-semibold text-white mb-1">{tier.label}</div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">${tier.price}</div>
                  {tier.savings && <div className="text-lime-400 text-xs">Save ${tier.savings}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-4">The more concerts you attend, the more you save!</p>
      </div>
    </motion.div>
  )
}

export default PricingBanner
