import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Crown, Music3, Shield } from 'lucide-react'
import Link from 'next/link'
import { itemVariants } from '@/app/lib/constants/advertise-with-us'
import AwesomeIcon from '../common/AwesomeIcon'

interface IFixedLeftNavigationPanel {
  isNavigationCollapsed: boolean
  setIsNavigationCollapsed: (isNavigationCollapsed: boolean) => void
  links: any
  data: any
}

const FixedLeftNavigationPanel: FC<IFixedLeftNavigationPanel> = ({
  isNavigationCollapsed,
  setIsNavigationCollapsed,
  links,
  data
}: any) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isNavigationCollapsed ? '80px' : '280px'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="lg:fixed left-0 top-0 h-full border-r bg-neutral-950 border-neutral-800/50 z-20 hidden lg:flex flex-col"
    >
      {/* Navigation Header */}
      <div className="p-4 border-b border-neutral-800/50">
        <div className="flex items-center justify-between">
          {!isNavigationCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <Link
                href="/"
                className="bg-gradient-to-r from-blaze to-sunburst bg-clip-text text-transparent uppercase text-2xl font-bold cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-400 hover:to-cyan-400 flex items-center"
              >
                The Pops
              </Link>
            </motion.div>
          ) : (
            <Link href="/">
              <Music3 className="text-white w-5 h-5 shipwheel-storm flex flex-shrink-0" />
            </Link>
          )}
          <button
            onClick={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
          >
            {isNavigationCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {links.map((item: any, index: number) => (
            <Link href={item.linkKey} key={index}>
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={index}
                className={`
                  w-full flex items-center justify-center space-x-3 px-3 py-3 rounded-xl transition-all
                  ${
                    item.active
                      ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-400 border border-red-600/30'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AwesomeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
                {!isNavigationCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1"
                  >
                    <div className="font-medium">{item.textKey}</div>
                    {item.description && (
                      <div className={`${item.active ? 'text-red-700' : 'text-neutral-500'} text-xs mt-0.5`}>
                        {item.description}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Navigation Footer */}
      {!isNavigationCollapsed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-neutral-800/50"
        >
          <div className="flex items-center space-x-3 p-3 bg-neutral-800/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-blaze to-sunburst rounded-full flex items-center justify-center text-white font-bold">
              {data?.isSuperUser ? (
                <Crown className="w-4 h-4" />
              ) : data?.isAdmin ? (
                <Shield className="w-4 h-4" />
              ) : (
                data?.name?.charAt(0)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{data?.firstName}</p>
              <p className="text-neutral-400 text-xs truncate">{data?.email}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-neutral-800/50"
        >
          <div className="py-3 flex items-center justify-center bg-neutral-800/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-blaze to-sunburst rounded-full flex items-center justify-center text-white font-bold">
              {data?.isSuperUser ? (
                <Crown className="w-4 h-4" />
              ) : data?.isAdmin ? (
                <Shield className="w-4 h-4" />
              ) : (
                data?.firstName?.charAt(0)
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default FixedLeftNavigationPanel
