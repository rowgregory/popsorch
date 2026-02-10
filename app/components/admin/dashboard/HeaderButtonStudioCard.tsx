import { ArrowRight, ChevronDown, Columns2, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import { store } from '@/app/redux/store'
import { setOpenHeaderButtonStudio } from '@/app/redux/features/appSlice'

const HeaderButtonStudioCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Header Button Studio</h3>
        <p className="text-sm text-neutral-400">Design and customize buttons that appear in the site header</p>
      </div>

      {/* Button Type Previews */}
      <div className="space-y-3 mb-6">
        {/* Single Button */}
        <div className="flex items-center gap-4 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <div className="shrink-0 w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center">
            <Square className="w-4 h-4 text-neutral-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-200">Single Button</p>
            <p className="text-xs text-neutral-500">Internal or external link</p>
          </div>
          <div className="shrink-0">
            <div className="px-3 py-1 bg-neutral-700 rounded text-xs text-neutral-300 font-medium">Button</div>
          </div>
        </div>

        {/* Side by Side */}
        <div className="flex items-center gap-4 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <div className="shrink-0 w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center">
            <Columns2 className="w-4 h-4 text-neutral-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-200">Side by Side</p>
            <p className="text-xs text-neutral-500">Two buttons displayed together</p>
          </div>
          <div className="shrink-0 flex gap-1">
            <div className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300 font-medium">Btn</div>
            <div className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300 font-medium">Btn</div>
          </div>
        </div>

        {/* Button with Dropdown */}
        <div className="flex items-center gap-4 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
          <div className="shrink-0 w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center">
            <ChevronDown className="w-4 h-4 text-neutral-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-200">Button with Dropdown</p>
            <p className="text-xs text-neutral-500">Single button with expandable menu</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <div className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300 font-medium">Button</div>
            <div className="flex flex-col gap-0.5 w-full">
              <div className="px-2 py-0.5 bg-neutral-600/70 rounded text-xs text-neutral-400">Item</div>
              <div className="px-2 py-0.5 bg-neutral-600/70 rounded text-xs text-neutral-400">Item</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => store.dispatch(setOpenHeaderButtonStudio())}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 text-white font-semibold rounded-lg transition-all group"
      >
        Open Header Button Studio
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </motion.div>
  )
}

export default HeaderButtonStudioCard
