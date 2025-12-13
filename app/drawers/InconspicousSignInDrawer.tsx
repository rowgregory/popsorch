import { AnimatePresence, motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseInconspicuousSignInDrawer } from '../redux/features/appSlice'
import Link from 'next/link'

const InconspicuousSignInDrawer = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { inconspicuousSignInDrawer } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  // Don't render anything if drawer is closed
  if (!inconspicuousSignInDrawer) return null

  return (
    <AnimatePresence>
      {inconspicuousSignInDrawer && (
        <>
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            onClick={() => dispatch(setCloseInconspicuousSignInDrawer())}
          />

          {/* Floating Button */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            className="fixed top-20 right-20 z-[100]"
          >
            <Link
              href={isAuthenticated ? '/admin/dashboard' : '/auth/login'}
              onClick={() => dispatch(setCloseInconspicuousSignInDrawer())}
              className="group relative flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white font-bold rounded-full shadow-2xl hover:shadow-blaze/70 transition-all duration-300 hover:scale-110"
            >
              <Rocket className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              <span className="text-base uppercase tracking-wider">Launch App</span>

              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-sunburst"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blaze/20 to-sunburst/20 blur-xl -z-10" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default InconspicuousSignInDrawer
