import { motion } from 'framer-motion'
import Link from 'next/link'
import { setCloseAdminSidebar } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { X } from 'lucide-react'
import { adminNavLinks } from '@/public/data/adminNavLinks'
import { usePathname } from 'next/navigation'

const AdminSidebar = () => {
  const dispatch = useAppDispatch()
  const { user } = useUserSelector()
  const pathname = usePathname()
  const onClose = () => dispatch(setCloseAdminSidebar())

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
              className="lg:hidden p-2 hover:bg-neutral-800"
            >
              <X className="w-5 h-5 text-neutral-100" />
            </motion.button>
          )}
        </div>
      </div>

      <nav className="space-y-6 px-6 py-6 flex-1">
        {adminNavLinks(pathname, user?.role).map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3 px-3">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item, i: number) => {
                const IconComponent = item.icon
                const isActive = item.path && pathname.includes(item.path.split('?')[0])
                const isDrawer = item.isDrawer

                const content = (
                  <>
                    <IconComponent className="w-4 h-4" />
                    <div className="flex items-center gap-2">{item.label}</div>
                  </>
                )

                const sharedClassName = `flex items-center gap-3 px-3 py-2 text-sm transition-all w-full cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-r from-blaze to-sunburst text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                }`

                if (isDrawer) {
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        item.onDrawerOpen?.()
                        onClose()
                      }}
                      className={sharedClassName}
                    >
                      {content}
                    </button>
                  )
                }

                return (
                  <Link key={i} href={item.path} onClick={onClose} className={sharedClassName}>
                    {content}
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
