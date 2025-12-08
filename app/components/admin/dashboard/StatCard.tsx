import { motion } from 'framer-motion'
import TooltipWrapper from './TooltipWrapper'

const StatCard = ({ title, value, color, tooltip }: any) => {
  return (
    <TooltipWrapper tooltip={tooltip}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-3 sm:p-4 md:p-5 md:pl-2 hover:border-neutral-700/70 transition-all duration-300 shadow-xl overflow-hidden group"
      >
        {/* Subtle side accent */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${color} opacity-40 group-hover:opacity-100 transition-opacity`}
        />

        {/* Content */}
        <div className="relative ml-2 sm:ml-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-neutral-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
              {title}
            </span>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${color} opacity-60`} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-2xl sm:text-3xl font-bold"
          >
            {value}
          </motion.div>
        </div>
      </motion.div>
    </TooltipWrapper>
  )
}

export default StatCard
