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
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-4 right-4 left-4 lg:left-auto z-100 lg:max-w-sm bg-neutral-900 border border-neutral-800 border-l-4 ${getAccent()} rounded-xl shadow-2xl p-4`}
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-bold">{message}</h3>
              {description && <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">{description}</p>}
            </div>
            <button
              onClick={() => dispatch(hideToast())}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
