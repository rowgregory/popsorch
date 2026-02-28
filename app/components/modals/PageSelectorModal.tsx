'use client'

import { pageContentEditorFolders } from '@/app/lib/constants/admin'
import { setClosePageSelectorModal, setSelectedCauldronFolder } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

// The regex /([A-Z])/g matches every uppercase letter in the string
// The g flag means it finds all of them, not just the first.
// The parentheses around [A-Z] create a capture group,
// which lets you reference the matched letter as $1 in the replacement string.
// So for every uppercase letter it finds,
// it replaces it with a space followed by that same letter — ' $1'.
// This effectively inserts a space before every capital.
const splitByCapsToSpaces = (text: string): string => {
  return text.replace(/([A-Z])/g, ' $1').trim()
}

const PageSelectorModal = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { pageSelectorModal } = useDashboardSelector()
  const params = useSearchParams()
  const selectedFolder = params.get('page')

  const handlePageSelect = (pageSlug: string) => {
    // Update Redux state
    dispatch(setSelectedCauldronFolder(pageSlug))
    dispatch(setClosePageSelectorModal())

    // Update URL with page param
    router.push(`/admin/page-content-editor?page=${pageSlug}`)
  }

  return (
    <AnimatePresence>
      {pageSelectorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center"
          onClick={() => dispatch(setClosePageSelectorModal())}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-neutral-900 border border-neutral-800 rounded-t-2xl sm:rounded-xl shadow-2xl p-6 sm:p-8 w-full sm:max-w-3xl sm:w-11/12 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl font-bold text-neutral-100 mb-5">Select a Page</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pageContentEditorFolders.map((folder, index) => (
                <motion.button
                  disabled={
                    folder.value !== 'home' &&
                    folder.value !== 'camp-application' &&
                    folder.value !== 'footer' &&
                    folder.value !== 'about' &&
                    folder.value !== 'advertise-with-us' &&
                    folder.value !== 'chair-sponsorships' &&
                    folder.value !== 'connect-with-us' &&
                    folder.value !== 'contact'
                  }
                  key={folder.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  onClick={() => handlePageSelect(folder.value)}
                  className={`p-3 sm:p-4 rounded-lg font-medium text-sm transition-all capitalize ${
                    selectedFolder === folder.value
                      ? 'bg-linear-to-r from-blaze to-sunburst text-white shadow-lg shadow-blaze/50 cursor-pointer'
                      : folder.value !== 'home' &&
                          folder.value !== 'camp-application' &&
                          folder.value !== 'footer' &&
                          folder.value !== 'about' &&
                          folder.value !== 'advertise-with-us' &&
                          folder.value !== 'chair-sponsorships' &&
                          folder.value !== 'connect-with-us' &&
                          folder.value !== 'contact'
                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed'
                        : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600 hover:text-white cursor-pointer'
                  }`}
                >
                  {splitByCapsToSpaces(folder.textKey)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageSelectorModal
