import React, { FC } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import { DrawerProps } from '@/app/types/common.types'

import { motion, AnimatePresence } from 'framer-motion'

const BottomDrawer: FC<DrawerProps> = ({ isOpen, height, bgColor, children }) => {
  useRemoveScroll(isOpen)

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: 'easeInOut'
            }}
            className={`${bgColor ?? 'bg-[#1a1a1a]'} px-4 pb-20 fixed z-[70] bottom-0 left-0 w-full overflow-y-auto ${
              height ?? 'h-dvh'
            } ${height && 'rounded-tl-3xl rounded-tr-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.2)]'}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BottomDrawer
