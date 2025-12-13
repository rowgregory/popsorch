import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { useDeleteCampApplicationMutation } from '../redux/services/campApi'

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
  const [deleteCampApplications] = useDeleteCampApplicationMutation()
  // Handle bulk delete
  const handleBulkDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteCampApplications({ campApplicationIds: Array.from(selectedApplications) })

      // Clear selection after successful delete
      setSelectedApplications(new Set())
      setShowDeleteConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AnimatePresence>
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => !isDeleting && setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Applications</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete {selectedApplications.size} camp application
              {selectedApplications.size !== 1 ? 's' : ''}?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 font-medium transition-colors"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-md transition-colors"
                whileHover={!isDeleting ? { scale: 1.02 } : {}}
                whileTap={!isDeleting ? { scale: 0.98 } : {}}
              >
                {isDeleting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminDeleteCampApplicationsModal
