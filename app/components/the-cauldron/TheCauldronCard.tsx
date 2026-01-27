'use client'

import { motion } from 'framer-motion'
import { ArrowRight, FlaskRound } from 'lucide-react'
import MotionLink from '../common/MotionLink'
import { setOpenTheCauldronDrawer } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch } from '@/app/redux/store'

export default function TheCauldronCard() {
  const dispatch = useAppDispatch()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-neutral-900 to-black rounded-xl border border-neutral-800 shadow-xl overflow-visible hover:border-neutral-700/70 transition-all duration-300"
    >
      <div className="relative p-4 backdrop-blur-sm space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <FlaskRound className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">New Feature: The Cauldron</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-300 text-sm leading-relaxed">Manage all your frontend content in one place.</p>

        {/* Feature Grid - 2 cols */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 border border-purple-500/20 rounded-lg p-2 hover:bg-purple-500/10 transition-all">
            <p className="text-purple-300 font-medium text-xs">Edit</p>
            <p className="text-neutral-500 text-[10px]">Live preview</p>
          </div>

          <div className="bg-white/5 border border-indigo-500/20 rounded-lg p-2 hover:bg-indigo-500/10 transition-all">
            <p className="text-indigo-300 font-medium text-xs">Deploy</p>
            <p className="text-neutral-500 text-[10px]">Instant sync</p>
          </div>
        </div>

        {/* CTA Button */}
        <MotionLink
          onClick={() => dispatch(setOpenTheCauldronDrawer())}
          href="/admin/the-cauldron?page=home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
        >
          <span>Open</span>
          <ArrowRight className="w-4 h-4" />
        </MotionLink>
      </div>
    </motion.div>
  )
}
