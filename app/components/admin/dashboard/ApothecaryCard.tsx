import { ArrowRight, Crown, Lock, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ApothecaryCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">The Apothecary</h3>
            </div>
            <span className="flex items-center gap-1 px-2 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-medium text-violet-400">
              <Lock className="w-3 h-3" />
              Locked
            </span>
          </div>
          <p className="text-sm text-neutral-400">Custom ticketing platform — available upon request</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <TrendingUp className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Zero Fees</p>
              <p className="text-xs text-neutral-500">Keep 100% of your ticket revenue</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <Zap className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Your Brand</p>
              <p className="text-xs text-neutral-500">Fully custom design matching your identity</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
            <Crown className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200">Full Control</p>
              <p className="text-xs text-neutral-500">Your data, your platform</p>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Link
          href="/admin/apothecary/codex"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 text-white font-semibold rounded-lg transition-all group text-sm"
        >
          Preview Demo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  )
}

export default ApothecaryCard
