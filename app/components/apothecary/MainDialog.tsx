import React, { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface IMainDialog {
  displayedText: string
  isTyping: boolean
  currentMsg: any
}

const MainDialog: FC<IMainDialog> = ({ displayedText, isTyping, currentMsg }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="absolute left-4 right-4 top-16 sm:left-6 sm:right-6 md:left-96 md:right-6 lg:right-auto lg:top-48 lg:-translate-y-1/2 lg:w-80 max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-6rem)] overflow-hidden"
    >
      {/* Mobile-optimized Main Text Bubble */}
      <motion.div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-indigo-500/50 shadow-2xl min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] flex flex-col justify-center">
        <div className="overflow-y-auto max-h-[200px] sm:max-h-[250px] lg:max-h-none scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent">
          <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed font-medium mb-4 sm:mb-6 pr-2">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 sm:h-5 lg:h-6 bg-indigo-400 ml-1"
              />
            )}
          </p>
        </div>

        {/* Mobile-optimized Subtext */}
        {!isTyping && currentMsg?.subtext && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-slate-700/50 pt-3 sm:pt-4 mt-auto"
          >
            <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">{currentMsg.subtext}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile-optimized Floating Controls */}
      <AnimatePresence>
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center sm:justify-end mt-3 sm:mt-4 lg:mt-6"
          >
            {/* Mobile-optimized Continue Button */}
            <div className="flex items-center space-x-2 sm:space-x-3 border border-indigo-400/20 bg-indigo-900/10 text-indigo-300/70 px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm touch-manipulation">
              <span className="font-normal text-xs sm:text-sm whitespace-nowrap">Select Action</span>
              <ChevronRight className="hidden lg:block h-3 w-3 opacity-40 flex-shrink-0" />
              <ChevronDown className="block lg:hidden h-3 w-3 opacity-40 flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MainDialog
