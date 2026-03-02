import { FC } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import { DrawerProps } from '@/app/types/common.types'
import { motion, AnimatePresence } from 'framer-motion'

const BottomDrawer: FC<DrawerProps> = ({ isOpen, height, bgColor, children, onClose, label }) => {
  useRemoveScroll(isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-69"
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label ?? 'Navigation menu'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className={`${bgColor ?? 'bg-inkblack'} px-4 pb-20 fixed z-70 bottom-0 left-0 right-0 overflow-y-auto ${
              height ?? 'max-h-[85dvh]'
            }`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BottomDrawer
