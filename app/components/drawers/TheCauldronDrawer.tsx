import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Zap, Lock } from 'lucide-react'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { setCloseTheCauldonDrawer } from '@/app/redux/features/dashboardSlice'

export default function TheCauldronDrawer() {
  const { theCauldronDrawer } = useDashboardSelector()
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseTheCauldonDrawer())

  return (
    <AnimatePresence>
      {theCauldronDrawer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-neutral-900 border-t border-neutral-800 rounded-t-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-bold text-white">The Cauldron</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 max-h-[70vh] overflow-y-auto space-y-8">
              {/* Introduction */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Welcome to The Cauldron</h3>
                <p className="text-neutral-300 leading-relaxed">
                  The Cauldron is your centralized hub for managing all frontend page content. Update text and manage
                  your site's copy without touching code.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Key Features</h3>

                <div className="flex gap-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Live Preview</h4>
                    <p className="text-sm text-neutral-400">See your changes in real-time as you edit page content</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <Lock className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Page Management</h4>
                    <p className="text-sm text-neutral-400">
                      Select from any page in your site and update its content seamlessly
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Use */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">How to Get Started</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      1
                    </span>
                    <span className="text-neutral-300">
                      Click the <span className="text-white font-semibold">Ground Control</span> button at the top
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      2
                    </span>
                    <span className="text-neutral-300">
                      Select a page from the <span className="text-white font-semibold">page menu</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      3
                    </span>
                    <span className="text-neutral-300">
                      Edit content in the left panel and see changes on the right
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      4
                    </span>
                    <span className="text-neutral-300">
                      Click <span className="text-white font-semibold">Save</span> to publish your changes
                    </span>
                  </li>
                </ol>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-600/90 hover:to-indigo-700/90 text-white font-semibold rounded-lg transition-all"
              >
                Got It!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
