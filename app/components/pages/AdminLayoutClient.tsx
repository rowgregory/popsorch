'use client'

import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import AdminSidebar from '@/app/admin/sidebar'
import ConcertDrawer from '@/app/components/drawers/ConcertDrawer'
import CampApplicationViewDrawer from '@/app/components/drawers/CampApplicationViewDrawer'
import SponsorDrawer from '@/app/components/drawers/SponsorDrawer'
import TeamMemberDrawer from '@/app/components/drawers/TeamMemberDrawer'
import VenueDrawer from '@/app/components/drawers/VenueDrawer'
import { setCloseAdminSidebar, setToggleAdminSidebar } from '@/app/redux/features/dashboardSlice'
import { setUser } from '@/app/redux/features/userSlice'
import { Menu } from 'lucide-react'
import LogoutButton from '../header/LogoutButton'
import PageSelectorModal from '../modals/PageSelectorModal'
import HeaderButtonStudioDrawer from '../drawers/HeaderButtonStudioDrawer'
import { actionItems } from '@/app/lib/constants/action-dropdown-items'
import exportCampApplications from '@/app/lib/utils/admin/exportCampApplications'
import { handleUploadPhotoGalleryImage } from '@/app/utils/handleUploadPhotoGalleryImage'
import { createFormActions } from '@/app/redux/features/formSlice'
import { useCreatePhotoGalleryImageMutation } from '@/app/redux/services/photoGalleryImageApi'

interface IAdminClientLayout {
  children: ReactNode
  data: any
  buttons: any
  campApplications: any
}

const AdminClientLayout: FC<IAdminClientLayout> = ({ children, data, buttons, campApplications }) => {
  const dispatch = useAppDispatch()
  const { adminSidebar } = useDashboardSelector()
  const onClose = () => dispatch(setCloseAdminSidebar())
  const handleExport = exportCampApplications(campApplications?.campApplications)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleUploadProgress } = createFormActions('photoGallery', dispatch)
  const [createPhotoGalleryImage] = useCreatePhotoGalleryImageMutation()

  useEffect(() => {
    dispatch(setUser(data))
  }, [data, dispatch])

  return (
    <>
      {/* Drawers & Modals */}
      <ConcertDrawer />
      <CampApplicationViewDrawer />
      <SponsorDrawer />
      <TeamMemberDrawer />
      <VenueDrawer />
      <HeaderButtonStudioDrawer data={buttons} />
      <PageSelectorModal />

      {/* Desktop Fixed Header */}
      <header className="block lg:fixed top-0 left-64 right-0 bg-neutral-950 border-b border-neutral-800 py-4 px-6 z-30">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2 md:space-x-4 h-full">
            {actionItems.map((item, i) =>
              item.isUpload ? (
                <div key={i} className="relative group">
                  <button
                    disabled={loading}
                    onClick={() => inputRef.current && inputRef?.current.click()}
                    className="relative flex items-center justify-center px-3.5 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all h-7"
                  >
                    {loading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-blaze border-t-0 animate-spin" />
                    ) : (
                      <item.icon className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-700" />
                  </div>
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleUploadPhotoGalleryImage(
                        e,
                        setLoading,
                        handleUploadProgress,
                        createPhotoGalleryImage,
                        dispatch
                      )
                    }
                  />
                </div>
              ) : (
                <div key={item.action} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (item.isDrawer ? dispatch(item.open()) : handleExport())}
                    className="relative flex items-center justify-center px-3.5 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all h-7"
                  >
                    <item.icon className="w-4 h-4 text-neutral-400" />
                  </motion.button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-700" />
                  </div>
                </div>
              )
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-neutral-950 flex">
        {/* Mobile Sidebar Overlay */}
        {adminSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-20">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: adminSidebar ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed lg:hidden inset-y-0 left-0 z-50 w-64"
        >
          <AdminSidebar />
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col lg:ml-64 lg:mt-15">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between bg-neutral-900 border-b border-neutral-800 px-4 py-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setToggleAdminSidebar(adminSidebar))}
              className="p-2 hover:bg-neutral-950 rounded-lg"
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Content */}
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminClientLayout
