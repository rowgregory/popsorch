import { setOpeneHeaderButtonStudio } from '@/app/redux/features/appSlice'
import { useAppDispatch } from '@/app/redux/store'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const HeaderButtonStudioCard = () => {
  const dispatch = useAppDispatch()

  return (
    <motion.button
      onClick={() => dispatch(setOpeneHeaderButtonStudio())}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="col-span-12 xl:col-span-9 relative bg-gradient-to-br from-neutral-900 to-black rounded-2xl border border-neutral-800 shadow-xl overflow-hidden group hover:border-neutral-700/70 transition-all duration-300 w-full p-6 text-left hover:bg-neutral-800/30"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Header Button Studio</h3>
          <p className="text-neutral-400 text-xs sm:text-sm">Design and customize interface elements</p>
        </div>
        {/* Arrow Indicator */}
        <div className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 group-hover:text-white" />
        </div>
      </div>
    </motion.button>
  )
}

export default HeaderButtonStudioCard
