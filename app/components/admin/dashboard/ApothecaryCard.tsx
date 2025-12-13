import { Crown, Sparkles, TrendingUp, Zap } from 'lucide-react'

import CastSpellButton from './CastSpellButton'
import ConductorWithEffect from './ConductorWithEffect'

const ApothecaryCard = () => {
  return (
    <div className="relative bg-gradient-to-br from-neutral-900 to-black rounded-xl border border-neutral-800 shadow-xl overflow-visible hover:border-neutral-700/70 transition-all duration-300">
      {/* Conductor Image - Centered at Top, Popping Out */}
      <ConductorWithEffect />

      {/* Content Container */}
      <div className="relative pt-60">
        {/* Content */}
        <div className="relative p-4 z-10">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="px-2 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[9px] text-white font-bold uppercase tracking-widest">Premium</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-1 leading-tight text-center">
            THE APOTHECARY
          </h3>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-4 text-center">
            Custom Ticketing Platform
          </p>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500/20 rounded-md flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white">Zero Fees</p>
                <p className="text-[9px] text-neutral-500">100% revenue</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <Zap className="w-3 h-3 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white">Your Brand</p>
                <p className="text-[9px] text-neutral-500">Custom design</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                <Crown className="w-3 h-3 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white">Full Control</p>
                <p className="text-[9px] text-neutral-500">Your data</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <CastSpellButton />
        </div>
      </div>
    </div>
  )
}

export default ApothecaryCard
