import { ChangeEvent, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, ChevronDown, Music, Gift, TheaterIcon, User, Tent, GalleryHorizontal, Wand } from 'lucide-react'
import { useAppDispatch, useCampSelector, useUserSelector } from '@/app/redux/store'
import { setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import { setOpenTeamMemberDrawer } from '@/app/redux/features/teamMemberSlice'
import { setOpenVenueDrawer } from '@/app/redux/features/venueSlice'
import exportCampApplications from '@/app/lib/utils/admin/exportCampApplications'
import { createFormActions } from '@/app/redux/features/formSlice'
import { useCreatePhotoGalleryImageMutation } from '@/app/redux/services/photoGalleryImageApi'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { addPhotoGalleryImageToState, resetPhotoGalleryImage } from '@/app/redux/features/photoGalleryImageSlice'
import Link from 'next/link'
import { setOpenConductorModal } from '@/app/redux/features/dashboardSlice'
import useSoundEffect from '@/app/hooks/useSoundEffect'

const actionItems = () => [
  {
    action: 'create-concert',
    label: 'Schedule Concert',
    icon: Music,
    open: setOpenConcertDrawer,
    isDrawer: true
  },
  {
    action: 'create-sponsor',
    label: 'Add Sponsor',
    icon: Gift,
    open: setOpenSponsorDrawer,
    isDrawer: true
  },
  {
    action: 'venue',
    label: 'Set Up Venue',
    icon: TheaterIcon,
    open: setOpenVenueDrawer,
    isDrawer: true
  },
  {
    action: 'board-member-and-staff',
    label: 'Register Team Member',
    icon: User,
    open: setOpenTeamMemberDrawer,
    isDrawer: true
  },
  {
    action: 'export-camp-applications',
    label: 'Export Camp Applications',
    icon: Tent,
    isExport: true
  },
  {
    action: 'upload-photo-gallery-image',
    label: 'Upload Photo Gallery Image',
    icon: GalleryHorizontal,
    isUpload: true
  },
  {
    action: 'cast-spell',
    label: 'Cast Spell',
    icon: Wand,
    linkKey: '/admin/apothecary/codex',
    isAthothecary: true
  }
]

const handleUploadPhotoGalleryImage = async (
  event: ChangeEvent<HTMLInputElement>,
  setLoading: (loading: boolean) => void,
  handleUploadProgress: (uploadProgress: number) => void,
  createPhotoGalleryImage: any,
  dispatch: any
) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  setLoading(true)

  const validFiles = Array.from(files).filter(
    (file) => file.type.startsWith('image/') && !file.type.startsWith('image/heic')
  )

  try {
    for (const file of validFiles) {
      const imageUrl = await uploadFileToFirebase(file, handleUploadProgress, 'image')

      const response = await createPhotoGalleryImage({ imageUrl, imageFilename: file.name }).unwrap()
      dispatch(addPhotoGalleryImageToState(response.photoGalleryImage))

      dispatch(resetPhotoGalleryImage())
    }
  } catch {
  } finally {
    setLoading(false)
    event.target.value = '' // allow reselecting the same file(s)
  }
}

const ActionButtonWithDropdown = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { campApplications } = useCampSelector()
  const handleExport = exportCampApplications(campApplications)
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleUploadProgress } = createFormActions('photoGallery', dispatch)
  const [createPhotoGalleryImage] = useCreatePhotoGalleryImageMutation()
  const [loading, setLoading] = useState(false)
  const { user } = useUserSelector()
  const { play } = useSoundEffect('/mp3/magical-reveal.mp3', user?.isSoundEffectsOn)

  const handleActionClick = (item: any) => {
    setIsActionsOpen(false)
    if (item.isDrawer) {
      dispatch(item.open())
    } else if (item.isExport) {
      handleExport()
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
        whileTap={{ opacity: 0.9 }}
        onClick={() => setIsActionsOpen(!isActionsOpen)}
        className="px-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:from-sky-500/90 hover:to-indigo-600/90 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm h-[28px]"
      >
        <Plus className="w-4 h-4" />
        <span>Actions</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isActionsOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {isActionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-fit bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl"
          >
            <div className="py-2">
              {actionItems()?.map((item, i) =>
                item.isUpload ? (
                  <div key={i}>
                    <button
                      disabled={loading}
                      onClick={() => inputRef.current && inputRef?.current.click()}
                      className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3 hover:bg-sky-500/10"
                    >
                      {loading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-sky-500 border-t-0 animate-spin" />
                      ) : (
                        <item.icon className="w-4 h-4 text-sky-500" />
                      )}
                      <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                    </button>
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
                ) : item.isAthothecary ? (
                  <Link
                    key={i}
                    href={item.linkKey}
                    onClick={() => {
                      dispatch(setOpenConductorModal())
                      play()
                    }}
                    className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3 hover:bg-indigo-500/10"
                  >
                    <item.icon className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                  </Link>
                ) : (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setIsActionsOpen(false)
                      handleActionClick(item)
                    }}
                    className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3 hover:bg-sky-500/10"
                  >
                    <item.icon className="w-4 h-4 text-sky-500" />
                    <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ActionButtonWithDropdown
