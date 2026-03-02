import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { hideToast } from '@/app/redux/features/toastSlice'

const Toast: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isVisible, type, message, description, duration = 7000 } = useAppSelector((state: RootState) => state.toast)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast())
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, type, dispatch, duration])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-blaze" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-sunburst" />
      case 'info':
        return <Info className="w-5 h-5 text-neutral-400" />
    }
  }

  const getAccent = () => {
    switch (type) {
      case 'success':
        return 'border-l-emerald-500'
      case 'error':
        return 'border-l-[#da0032]'
      case 'warning':
        return 'border-l-[#ff9000]'
      case 'info':
        return 'border-l-neutral-500'
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="toast"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-4 right-4 left-4 lg:left-auto z-100 lg:max-w-sm bg-black border border-white/10 border-l-2 ${getAccent()} shadow-2xl p-4`}
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0" aria-hidden="true">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-changa text-sm uppercase tracking-wide">{message}</p>
              {description && <p className="text-white/50 font-lato text-xs mt-0.5 leading-relaxed">{description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dispatch(hideToast())}
              aria-label="Dismiss notification"
              className="shrink-0 w-7 h-7 flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
