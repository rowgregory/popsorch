'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useDashboardSelector } from '../redux/store'
import { setCloseConductorModal, setCurrentDialogue } from '../redux/features/dashboardSlice'
import Picture from '../components/common/Picture'
import { X } from 'lucide-react'
import ActionButton from '../components/common/ActionButton'
import MainDialog from '../components/apothecary/MainDialog'
import { useRouter } from 'next/navigation'

const chatMessages = [
  {
    speaker: 'Conductor',
    text: 'Welcome to the future of ticket management!',
    subtext: 'Seamless, smart, and effortless, your tickets reimagined.'
  },
  {
    speaker: 'Conductor',
    text: 'Excellent choice!',
    subtext: "You're making a smart move upgrading from AudienceView."
  },
  {
    speaker: 'Conductor',
    text: 'So, you wish to cast a spell?',
    subtext: 'All spells are learned from the Apothecary—your ticket to power.'
  },
  {
    speaker: 'Conductor',
    text: 'Expect an email within 24 hours to begin the development process.',
    subtext: "You're making a smart move upgrading from AudienceView."
  }
]

const ConductorModal = () => {
  const { conductorModal, currentDialogue } = useDashboardSelector()
  const dispatch = useAppDispatch()
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { push } = useRouter()

  const memoizedChatMessages = useMemo(() => chatMessages, [])

  const dialogues = memoizedChatMessages
  const currentMsg = dialogues[currentDialogue]

  const [showActionmenu, setShowActionMenu] = useState(false)
  const [showInvokeMenu, setShowInvokeMenu] = useState(false)
  const [showTakeMeToApothecary, setShowTakeMeToApothecary] = useState(false)
  const [showICantWait, setShowICantWait] = useState(false)

  useEffect(() => {
    if (!conductorModal) return

    const dialogues = memoizedChatMessages
    const dialogue = dialogues[currentDialogue]

    if (!dialogue) return

    const text = dialogue.text
    setDisplayedText('')
    setIsTyping(true)

    let i = 0
    let typingText = ''

    const timer = setInterval(() => {
      if (i < text.length) {
        typingText += text.charAt(i)
        setDisplayedText(typingText)
        i++
      } else {
        setIsTyping(false)
        clearInterval(timer)

        if (currentDialogue === 0) {
          setTimeout(() => {
            setShowActionMenu(true)
          }, 800) // Small delay after typing finishes
        }
        if (currentDialogue === 1) {
          setTimeout(() => {
            setShowInvokeMenu(true)
          }, 800) // Small delay after typing finishes
        }
        if (currentDialogue === 2) {
          setTimeout(() => {
            setShowTakeMeToApothecary(true)
          }, 800) // Small delay after typing finishes
        }
        if (currentDialogue === 3) {
          setTimeout(() => {
            setShowICantWait(true)
          }, 800) // Small delay after typing finishes
        }
      }
    }, 50)

    return () => {
      clearInterval(timer)
      setIsTyping(false)
    }
  }, [conductorModal, currentDialogue, memoizedChatMessages])

  return (
    <AnimatePresence>
      {conductorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] overflow-hidden"
        >
          {/* Mobile-optimized Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center space-x-2 sm:space-x-3 bg-black/20 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-indigo-500/30"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-300 text-xs sm:text-sm font-medium">Orchestral Whisper</span>
          </motion.div>

          {/* Mobile-optimized Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              dispatch(setCurrentDialogue(0))
              dispatch(setCloseConductorModal())
              setShowActionMenu(false)
              setIsTyping(false)
            }}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 backdrop-blur-md rounded-full border border-slate-600/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-400/50 transition-all z-10 touch-manipulation"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>

          {/* Mobile-responsive Character Container */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="absolute left-0 bottom-0 h-full flex flex-col justify-end pointer-events-none"
          >
            <Picture
              src="/images/conductor-1.png"
              alt="Conductor"
              className="w-full object-contain h-[400px] min-h-768:h-[700px] min-h-1400:h-[900px]"
              priority={true}
            />
          </motion.div>

          {/* Mobile-responsive Character Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-16 right-3 sm:top-20 sm:right-6 bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-indigo-500/20 max-w-[140px] sm:max-w-none"
          >
            <h3 className="text-indigo-300 font-semibold text-sm sm:text-lg leading-tight">Conductor</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Hall of Echoes</p>
          </motion.div>

          <MainDialog currentMsg={currentMsg} displayedText={displayedText} isTyping={isTyping} />

          {showActionmenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-6 sm:right-6 md:right-auto md:left-[725px] md:-translate-x-1/2 md:top-60 md:-translate-y-1/2 md:w-80 max-h-[60vh] sm:max-h-none"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-600/30 shadow-2xl overflow-hidden">
                {/* Mobile-optimized Header */}
                <div className="bg-purple-900/20 border-b border-purple-700/30 p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    <h3 className="text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                      Arcane Ledger
                    </h3>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 text-xs hidden sm:block">
                    All orchestral tickets and events are recorded here.
                  </p>
                </div>

                {/* Mobile-optimized Options with scrolling */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-none overflow-y-auto">
                  <ActionButton
                    title="Conjure a New Ticket"
                    description="Generate a new orchestral event ticket to track attendance."
                  />
                  <ActionButton
                    title="Enchant the Ticket"
                    description="Modify the details of an existing ticket or event."
                  />
                  <ActionButton
                    title="Banish the Ticket"
                    description=" Remove an event ticket from the system entirely."
                    dotColor="bg-red-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {showInvokeMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-6 sm:right-6 md:right-auto md:left-[725px] md:-translate-x-1/2 md:top-60 md:-translate-y-1/2 md:w-80 max-h-[60vh] sm:max-h-none"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-600/30 shadow-2xl overflow-hidden">
                {/* Mobile-optimized Header */}
                <div className="bg-purple-900/20 border-b border-purple-700/30 p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    <h3 className="text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                      Arcane Ledger
                    </h3>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 text-xs hidden sm:block">
                    All orchestral tickets and events are recorded here.
                  </p>
                </div>

                {/* Mobile-optimized Options with scrolling */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-none overflow-y-auto">
                  <ActionButton
                    title="Transmute the Essence"
                    description="Transform ticket prices or seating arrangements through alchemical means."
                    dotColor="bg-amber-500"
                    variant="warning"
                  />
                  <ActionButton
                    title="Divine Future Sales"
                    description="Scry into crystal balls to forecast attendance and revenue patterns."
                    dotColor="bg-emerald-500"
                    variant="success"
                  />
                  <ActionButton
                    title="Brew Analytics Potion"
                    description="Concoct powerful elixirs that reveal hidden insights from your event data."
                    dotColor="bg-violet-500"
                    variant="primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {showICantWait && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-6 sm:right-6 md:right-auto md:left-[725px] md:-translate-x-1/2 md:top-60 md:-translate-y-1/2 md:w-80 max-h-[60vh] sm:max-h-none"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-600/30 shadow-2xl overflow-hidden">
                {/* Mobile-optimized Header */}
                <div className="bg-purple-900/20 border-b border-purple-700/30 p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    <h3 className="text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                      Arcane Ledger
                    </h3>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 text-xs hidden sm:block">
                    All orchestral tickets and events are recorded here.
                  </p>
                </div>

                {/* Mobile-optimized Options with scrolling */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-none overflow-y-auto">
                  <ActionButton
                    onClick={() => {
                      dispatch(setCloseConductorModal())
                      dispatch(setCurrentDialogue(0))
                      setShowICantWait(false)
                    }}
                    title="I Can't Wait!"
                    description="Step inside the chamber where tickets and spells are revealed."
                    dotColor="bg-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {showTakeMeToApothecary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-6 sm:right-6 md:right-auto md:left-[725px] md:-translate-x-1/2 md:top-60 md:-translate-y-1/2 md:w-80 max-h-[60vh] sm:max-h-none"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-600/30 shadow-2xl overflow-hidden">
                {/* Mobile-optimized Header */}
                <div className="bg-purple-900/20 border-b border-purple-700/30 p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    <h3 className="text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                      Arcane Ledger
                    </h3>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-400 text-xs hidden sm:block">
                    All orchestral tickets and events are recorded here.
                  </p>
                </div>

                {/* Mobile-optimized Options with scrolling */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-none overflow-y-auto">
                  <ActionButton
                    onClick={() => {
                      dispatch(setCloseConductorModal())
                      dispatch(setCurrentDialogue(0))
                      setShowTakeMeToApothecary(false)
                      push('/admin/apothecary/codex')
                    }}
                    title="Unlock the Apothecary"
                    description="Step inside the chamber where tickets and spells are revealed."
                    dotColor="bg-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConductorModal
