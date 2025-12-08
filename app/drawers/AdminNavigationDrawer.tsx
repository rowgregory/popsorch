import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeNavigationDrawer, setOpenConductorModal } from '../redux/features/dashboardSlice'
import useCustomPathname from '../hooks/useCustomPathname'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import Link from 'next/link'
import { useLogoutMutation } from '../redux/services/authApi'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '../utils/logHelper'
import Spinner from '../components/common/Spinner'
import useSoundEffect from '../hooks/useSoundEffect'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, X } from 'lucide-react'

const AdminNavigationDrawer = () => {
  const { navigationDrawer } = useAppSelector((state: RootState) => state.dashboard)
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const items = adminNavigationLinkData(path, '')
  const [logout, { isLoading, error }] = useLogoutMutation()
  const { push } = useRouter()
  const { play } = useSoundEffect('/mp3/magical-reveal.mp3', true)

  const handleLogout = async (e: any) => {
    e.preventDefault()

    try {
      await logout({}).unwrap()
      push('/auth/login')
    } catch {}
  }

  const handlePrimaVistaClick = () => {
    dispatch(setOpenConductorModal())
    play()
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {navigationDrawer && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full bg-gradient-to-br from-duskgray via-duskgray to-neutral-900 z-40 fixed inset-0 backdrop-blur-sm flex flex-col"
          >
            {/* Fixed Close Button */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              className="absolute top-4 right-4 760:hidden z-50"
            >
              <X
                onClick={() => dispatch(closeNavigationDrawer())}
                className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-orange-400 transition-colors duration-200"
              />
            </motion.div>

            {/* Scrollable Navigation Items Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 mt-12 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent">
              <motion.div className="flex flex-col space-y-2">
                {[
                  { textKey: 'Home', linkKey: '/', active: path === '/', color: 'text-orange-400', icon: Home },
                  ...items
                ]?.map((link, i) => {
                  const IconComponent = link.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Link
                        href={link.linkKey}
                        onClick={
                          link.isPrimaVista
                            ? () => handlePrimaVistaClick()
                            : link.textKey === 'Logout'
                            ? handleLogout
                            : () => dispatch(closeNavigationDrawer())
                        }
                        className="py-3 flex items-center space-x-4 group relative overflow-hidden rounded-xl hover:bg-gradient-to-r hover:from-neutral-800/50 hover:to-neutral-700/30 transition-all duration-300"
                      >
                        {/* Background glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          layoutId={`background-${i}`}
                        />

                        {isLoading && link.textKey === 'Logout' ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
                            <Spinner fill="fill-blaze" track="text-duskgray" wAndH="w-10 h-10" />
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 duration-300 flex items-center justify-center rounded-xl relative z-10 ${
                              link.active
                                ? 'bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 shadow-lg shadow-orange-500/25'
                                : 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/30 border border-neutral-600/30 group-hover:from-neutral-700/50 group-hover:to-neutral-600/30'
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 transition-all duration-300 ${
                                link.active ? link.color : 'text-zinc-400 group-hover:text-orange-400'
                              }`}
                            />

                            {/* Icon glow effect */}
                            {link.active && (
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  scale: [1, 1.05, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut'
                                }}
                              />
                            )}
                          </motion.div>
                        )}

                        <motion.div
                          className="relative z-10 flex flex-col"
                          initial={{ opacity: 0.7 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <span
                            className={`text-sm font-medium font-changa uppercase tracking-wide transition-colors duration-300 ${
                              link.active ? link.color : 'text-zinc-300 group-hover:text-white'
                            }`}
                          >
                            {link.textKey}
                          </span>

                          {/* Active indicator */}
                          {link.active && (
                            <motion.div
                              className="w-full h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full mt-1"
                              layoutId="activeIndicator"
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.div>

                        {/* Hover line effect */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scaleY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        />
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Fixed Error Message at Bottom */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex-shrink-0 p-4 border-t border-neutral-700/50"
                >
                  <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <span className="text-blaze text-sm font-changa text-center block">{getErrorMessage(error)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminNavigationDrawer
