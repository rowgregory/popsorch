import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SeasonPackageDateSelectorModal = ({ isOpen, onClose, onDateSelect }: any) => {
  const [selectedDate, setSelectedDate] = useState('')

  const dates = [
    {
      day: 'Saturday',
      date: 'July 12, 2025',
      icon: '🌟',
      description: 'Opening Night Gala'
    },
    {
      day: 'Sunday',
      date: 'July 13, 2025',
      icon: '🎭',
      description: 'Matinee Performance'
    },
    {
      day: 'Monday',
      date: 'July 14, 2025',
      icon: '🎵',
      description: 'Grand Finale'
    }
  ]

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const dateCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const handleDateSelect = (day: any) => {
    setSelectedDate(day)
  }

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              className="relative w-full max-w-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div
                className="relative rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      #1a1a1a 0%, 
                      #2d2016 15%, 
                      #4a3728 30%, 
                      #6b4e37 45%, 
                      #8b6914 60%, 
                      #b8860b 75%, 
                      #daa520 90%, 
                      #ffd700 100%
                    )
                  `
                }}
              >
                {/* Elegant Gold Shimmer Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)',
                    backgroundSize: '300% 300%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />

                {/* Subtle Dark Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

                {/* Golden border glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-yellow-300/50" />

                {/* Content */}
                <motion.div
                  className="relative z-10 p-8 md:p-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Close Button */}
                  <motion.button
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-100 hover:bg-black/40 hover:border-yellow-300/50 transition-all duration-300"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Header */}
                  <motion.div variants={fadeInUp} className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 backdrop-blur-sm border border-yellow-400/40 rounded-full mb-6"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="text-yellow-100 font-bold text-sm tracking-wider uppercase">
                        The Pops Experience
                      </span>
                    </motion.div>

                    <h2
                      className="text-4xl md:text-5xl font-changa font-bold text-white mb-4"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      Choose Your Perfect Evening
                    </h2>

                    <p className="text-yellow-100/90 text-lg max-w-md mx-auto leading-relaxed">
                      Select your preferred performance date for an unforgettable musical journey
                    </p>
                  </motion.div>

                  {/* Date Selection Cards */}
                  <motion.div variants={fadeInUp} className="grid gap-4 mb-8">
                    {dates.map((dateOption) => (
                      <motion.div
                        key={dateOption.day}
                        variants={dateCardVariants}
                        className={`relative group cursor-pointer transition-all duration-300 ${
                          selectedDate === dateOption.day
                            ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent'
                            : ''
                        }`}
                        onClick={() => handleDateSelect(dateOption.day)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 ${
                            selectedDate === dateOption.day
                              ? 'bg-yellow-400/20 border-yellow-400/60 shadow-lg shadow-yellow-400/25'
                              : 'bg-black/20 border-yellow-400/30 hover:bg-black/30 hover:border-yellow-400/50'
                          }`}
                        >
                          {/* Selection indicator */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{dateOption.icon}</div>
                              <div>
                                <h3 className="text-xl font-bold text-white font-changa">{dateOption.day}</h3>
                                <p className="text-yellow-100/80 text-sm">{dateOption.date}</p>
                                <p className="text-yellow-200/70 text-xs mt-1">{dateOption.description}</p>
                              </div>
                            </div>

                            <motion.div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                selectedDate === dateOption.day
                                  ? 'border-yellow-400 bg-yellow-400'
                                  : 'border-yellow-400/50'
                              }`}
                              animate={selectedDate === dateOption.day ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              {selectedDate === dateOption.day && (
                                <motion.svg
                                  className="w-3 h-3 text-black"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </motion.svg>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="px-8 py-3 bg-black/30 backdrop-blur-sm border border-yellow-400/40 text-yellow-100 rounded-xl hover:bg-black/40 hover:border-yellow-400/60 transition-all duration-300 font-semibold"
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      className={`px-12 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                        selectedDate
                          ? 'bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 text-white shadow-lg shadow-yellow-400/25 hover:shadow-xl hover:shadow-yellow-400/30'
                          : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handleConfirm}
                      disabled={!selectedDate}
                      whileHover={selectedDate ? { scale: 1.05, y: -2 } : {}}
                      whileTap={selectedDate ? { scale: 0.98 } : {}}
                      style={selectedDate ? { textShadow: '0 2px 4px rgba(0,0,0,0.3)' } : {}}
                    >
                      Continue to Tickets
                      <motion.svg
                        className="inline-block ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={selectedDate ? { x: [0, 3, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SeasonPackageDateSelectorModal
