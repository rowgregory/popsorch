import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseInconspicuousSignInDrawer } from '../redux/features/appSlice'

const InconspicuousSignInDrawer = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { inconspicuousSignInDrawer } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  // Don't render anything if drawer is closed
  if (!inconspicuousSignInDrawer) return null

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => dispatch(setCloseInconspicuousSignInDrawer())}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="fixed top-0 right-0 h-full w-80 bg-[#1a1a1a] z-[105] shadow-2xl flex flex-col border-l border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-end p-6 border-b border-gray-700">
          <button
            onClick={() => dispatch(setCloseInconspicuousSignInDrawer())}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <motion.a
            href={isAuthenticated ? '/admin/dashboard' : '/auth/login'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-neutral-800 hover:text-sunburst rounded-lg transition-all duration-200 font-medium"
            onClick={() => dispatch(setCloseInconspicuousSignInDrawer())}
          >
            Launch App
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}

export default InconspicuousSignInDrawer
