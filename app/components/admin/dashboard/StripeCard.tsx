import { BarChart2, CreditCard, ExternalLink, Lock, RefreshCcw } from 'lucide-react'
import { motion } from 'framer-motion'

const StripeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">Stripe</h3>
          </div>
          <span className="flex items-center gap-1 px-2 py-1 bg-[#635BFF]/10 border border-[#635BFF]/20 rounded-full text-xs font-medium text-[#635BFF]">
            <Lock className="w-3 h-3" />
            Not Connected
          </span>
        </div>
        <p className="text-sm text-neutral-400">Accept payments and manage transactions directly on your platform</p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <CreditCard className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-200">Online Payments</p>
            <p className="text-xs text-neutral-500">Accept cards, Apple Pay, Google Pay and more</p>
          </div>
        </div>

        <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <RefreshCcw className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-200">Recurring Donations</p>
            <p className="text-xs text-neutral-500">Set up and manage subscription billing</p>
          </div>
        </div>

        <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <BarChart2 className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-200">Revenue Analytics</p>
            <p className="text-xs text-neutral-500">Track payments and financial reporting</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:from-[#5851EA] hover:to-[#6E67FF] text-white font-semibold rounded-lg transition-all shadow-lg shadow-[#635BFF]/20 text-sm group"
        >
          Learn More About Stripe
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}

export default StripeCard
