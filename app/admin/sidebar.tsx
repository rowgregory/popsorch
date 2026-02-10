import { motion } from 'framer-motion'
import Link from 'next/link'
import { setCloseAdminSidebar, setOpenConductorModal } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { X } from 'lucide-react'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import useCustomPathname from '../hooks/useCustomPathname'
import useSoundEffect from '../hooks/useSoundEffect'

const AdminSidebar = () => {
  const dispatch = useAppDispatch()
  const { user } = useUserSelector()
  const { play } = useSoundEffect('/mp3/magical-reveal.mp3', user?.isSoundEffectsOn)
  const pathname = useCustomPathname()
  const onClose = () => dispatch(setCloseAdminSidebar())

  const handleApothecaryClick = () => {
    dispatch(setOpenConductorModal())
    play()
  }

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 h-screen overflow-y-auto flex flex-col">
      <div className="border-b border-neutral-800">
        <div className="flex items-center justify-between py-4 px-6">
          <Link href="/" className="text-lg font-bold text-neutral-100">
            The Pops Orchestra
          </Link>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg"
            >
              <X className="w-5 h-5 text-neutral-100" />
            </motion.button>
          )}
        </div>
      </div>

      <nav className="space-y-6 px-6 py-6 flex-1">
        {adminNavigationLinkData(pathname, user?.role).map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3 px-3">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon
                const isActive = item.path && pathname === item.path
                const isNew = item.path === '/admin/questions'

                return (
                  <Link
                    key={item.path}
                    href={item.path === '/admin/the-cauldron' ? '/admin/the-cauldron?page=home' : item.path || ''}
                    onClick={() => {
                      if (item.path === '/admin/apothecary/codex') handleApothecaryClick()
                      onClose()
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-linear-to-r from-blaze to-sunburst text-white'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <div className="flex items-center gap-2">
                      {item.label}
                      {isNew && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-linear-to-r from-blaze to-sunburst shadow-lg shadow-blaze/50"
                        />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
