import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { deleteCampApplication } from '@/app/actions/deleteCampApplication'
import { useRouter } from 'next/navigation'

interface IAdminDeleteCampApplicationsModal {
  showDeleteConfirm: boolean
  isDeleting: boolean
  setShowDeleteConfirm: (showDeleteConfirm: boolean) => void
  selectedApplications: any
  setIsDeleting: (isDeleting: boolean) => void
  setSelectedApplications: (selectedApplications: any) => any
}

const AdminDeleteCampApplicationsModal: FC<IAdminDeleteCampApplicationsModal> = ({
  showDeleteConfirm,
  isDeleting,
  setShowDeleteConfirm,
  selectedApplications,
  setIsDeleting,
  setSelectedApplications
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (selectedApplications.size === 0) return
    setIsDeleting(true)
    await Promise.allSettled(Array.from(selectedApplications).map((id: string) => deleteCampApplication(id)))
    router.refresh()
    setSelectedApplications(new Set())
    setShowDeleteConfirm(false)
    setIsDeleting(false)
  }

  return (
    <AnimatePresence>
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-md bg-black/80 flex items-center justify-center z-50 p-6"
          onClick={() => !isDeleting && setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #da0032, #ff9000)' }} />

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blaze/10 border border-blaze/20 rounded-full flex items-center justify-center">
                  <Trash2 className="text-blaze w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Delete Applications</h3>
                  <p className="text-xs text-neutral-500">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-neutral-400 mb-6">
                Are you sure you want to delete <strong className="text-white">{selectedApplications.size}</strong> camp
                application
                {selectedApplications.size !== 1 ? 's' : ''}?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-semibold text-neutral-400 hover:text-white disabled:opacity-40 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-lg bg-blaze hover:bg-[#c0002b] disabled:opacity-50 transition-colors"
                  whileHover={!isDeleting ? { scale: 1.02 } : {}}
                  whileTap={!isDeleting ? { scale: 0.98 } : {}}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminDeleteCampApplicationsModal
